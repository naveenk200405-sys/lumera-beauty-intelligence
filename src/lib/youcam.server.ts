// Server-only YouCam bridge. Secrets are read from process.env inside handlers and never sent to the browser.
import { passport } from "./data";

export function isDemo() {
  return process.env.DEMO_MODE !== "false" || !process.env.YOUCAM_API_KEY;
}

const base = () => process.env.YOUCAM_API_BASE || "https://yce-api-01.perfectcorp.com/s2s/v1.0";

async function yc(path: string, init: RequestInit = {}) {
  const res = await fetch(base() + path, {
    ...init,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.YOUCAM_API_KEY}`, ...(init.headers || {}) },
  });
  if (!res.ok) throw new Error(`YouCam ${res.status}`);
  return res.json();
}

// LUMERA internal format
export interface NormalizedResult {
  source: "demo" | "youcam";
  skinType: string;
  priorities: string[];
  characteristics: { label: string; value: number }[];
  photoQuality: string;
}

export function normalize(raw: any): NormalizedResult {
  const scores = raw?.result?.output ?? raw?.output ?? [];
  const pick = (k: string, d: number) => {
    const f = Array.isArray(scores) ? scores.find((s: any) => s.type === k) : null;
    return f?.ui_score ?? f?.score ?? d;
  };
  const characteristics = [
    { label: "Hydration", value: pick("moisture", 58) },
    { label: "Texture smoothness", value: pick("texture", 66) },
    { label: "Oil balance", value: pick("oiliness", 61) },
    { label: "Radiance", value: pick("radiance", 74) },
    { label: "Evenness", value: pick("age_spot", 79) },
  ];
  const priorities = [...characteristics].sort((a, b) => a.value - b.value).slice(0, 3).map((c) => c.label.replace(" smoothness", ""));
  return { source: "youcam", skinType: raw?.skin_type ?? "Combination", priorities, characteristics, photoQuality: "Checked by YouCam" };
}

export function demoResult(): NormalizedResult {
  return { source: "demo", skinType: passport.skinType, priorities: passport.priorities, characteristics: passport.characteristics, photoQuality: passport.photoQuality };
}

export async function startScan(image: string) {
  if (isDemo()) return { taskId: `demo-${Date.now()}`, demo: true };
  const data = await yc("/task/skin-analysis", { method: "POST", body: JSON.stringify({ src_file_url: image }) });
  return { taskId: data?.result?.task_id ?? data?.task_id, demo: false };
}

export async function scanStatus(taskId: string) {
  if (isDemo() || taskId.startsWith("demo-")) {
    const elapsed = Date.now() - Number(taskId.split("-")[1] || 0);
    const progress = Math.min(100, Math.round((elapsed / 5200) * 100));
    return { status: progress >= 100 ? "success" : "running", progress, demo: true };
  }
  const data = await yc(`/task/skin-analysis?task_id=${encodeURIComponent(taskId)}`);
  const s = data?.result?.status ?? data?.status;
  return { status: s === "success" ? "success" : s === "error" ? "error" : "running", progress: s === "success" ? 100 : 50, demo: false };
}

export async function scanResult(taskId: string) {
  if (isDemo() || taskId.startsWith("demo-")) return demoResult();
  return normalize(await yc(`/task/skin-analysis?task_id=${encodeURIComponent(taskId)}`));
}
