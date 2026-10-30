import serum from "@/assets/serum.jpg";
import cleanser from "@/assets/p-cleanser.jpg";
import cream from "@/assets/p-cream.jpg";
import spf from "@/assets/p-spf.jpg";
import makeup from "@/assets/p-makeup.jpg";

export type Verdict = "BUY" | "THINK" | "SKIP";
export type Step = "Cleanse" | "Tone" | "Serum" | "Treatment" | "Moisturize" | "SPF" | "Makeup";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  skinTypes: string[];
  goals: string[];
  step: Step;
  tags: string[];
  howTo: string;
  why: string;
}

export const products: Product[] = [
  { id: "p1", name: "Daily Barrier Serum", brand: "Soen Lab", category: "Serum", price: 699, image: serum, skinTypes: ["Combination", "Dry", "Normal"], goals: ["Hydration", "Texture"], step: "Serum", tags: ["ceramides", "panthenol"], howTo: "2–3 drops on damp skin, press gently.", why: "Supports hydration where your scan saw the most need." },
  { id: "p2", name: "Rice Water Gel Cleanser", brand: "Hanbit", category: "Cleanser", price: 449, image: cleanser, skinTypes: ["Combination", "Oily"], goals: ["Oil balance"], step: "Cleanse", tags: ["low pH", "fragrance-free"], howTo: "Massage for 30 seconds, rinse lukewarm.", why: "Gentle enough for twice-daily use without stripping." },
  { id: "p3", name: "Cloud Cream Moisturizer", brand: "Maru & Co", category: "Moisturizer", price: 752, image: cream, skinTypes: ["Combination", "Normal"], goals: ["Hydration"], step: "Moisturize", tags: ["squalane", "light"], howTo: "A pea-sized amount, warm between fingers.", why: "Locks in your serum without feeling heavy on the T-zone." },
  { id: "p4", name: "Sheer Daylight SPF 50", brand: "Ilsang", category: "Sunscreen", price: 600, image: spf, skinTypes: ["All"], goals: ["Protection"], step: "SPF", tags: ["no white cast", "PA++++"], howTo: "Two finger-lengths, last step every morning.", why: "The single most useful step in any morning routine." },
  { id: "p5", name: "Velvet Rose Lip & Cheek", brand: "Dahlia Studio", category: "Makeup", price: 899, image: makeup, skinTypes: ["All"], goals: ["Glow"], step: "Makeup", tags: ["buildable", "multi-use"], howTo: "Tap onto lips and cheeks with fingertips.", why: "One product, two uses — fewer things to buy." },
  { id: "p6", name: "Niacinamide Pore Serum", brand: "Hanbit", category: "Serum", price: 799, image: serum, skinTypes: ["Oily", "Combination"], goals: ["Oil balance", "Texture"], step: "Treatment", tags: ["5% niacinamide"], howTo: "Evening, after cleansing, before cream.", why: "Targets texture on the areas your scan highlighted." },
  { id: "p7", name: "Soft Peel Toner", brand: "Soen Lab", category: "Toner", price: 650, image: spf, skinTypes: ["Normal", "Oily"], goals: ["Texture"], step: "Tone", tags: ["PHA", "gentle"], howTo: "Sweep with a pad, 3 nights a week.", why: "A gentle way to address texture over time." },
  { id: "p8", name: "Midnight Repair Cream", brand: "Maru & Co", category: "Moisturizer", price: 1150, image: cream, skinTypes: ["Dry"], goals: ["Hydration"], step: "Moisturize", tags: ["rich", "peptides"], howTo: "Last step at night.", why: "Rich — better suited to drier skin than yours." },
  { id: "p9", name: "Oat Milk Cleansing Balm", brand: "Ilsang", category: "Cleanser", price: 520, image: cleanser, skinTypes: ["Dry", "Normal"], goals: ["Hydration"], step: "Cleanse", tags: ["balm", "double cleanse"], howTo: "Massage on dry skin, emulsify with water.", why: "Melts SPF and makeup at the end of the day." },
  { id: "p10", name: "Dewy Skin Tint", brand: "Dahlia Studio", category: "Makeup", price: 1099, image: makeup, skinTypes: ["Combination", "Normal"], goals: ["Glow"], step: "Makeup", tags: ["light coverage", "SPF 20"], howTo: "Buff in with fingers after SPF.", why: "Even, light coverage that lets skin show through." },
  { id: "p11", name: "Centella Calm Ampoule", brand: "Soen Lab", category: "Serum", price: 720, image: serum, skinTypes: ["Sensitive", "Combination"], goals: ["Calm"], step: "Serum", tags: ["centella"], howTo: "Pat in after toner.", why: "Calming, though overlaps with your barrier serum." },
];

export const byId = (id: string) => products.find((p) => p.id === id)!;

export const defaultShelf = ["p2", "p3", "p4", "p9"];

export const passport = {
  skinType: "Combination",
  summary: "Balanced cheeks with a slightly oilier T-zone. Comfortable, with room for more hydration.",
  priorities: ["Hydration", "Texture", "Oil balance"],
  characteristics: [
    { label: "Hydration", value: 58 },
    { label: "Texture smoothness", value: 66 },
    { label: "Oil balance", value: 61 },
    { label: "Radiance", value: 74 },
    { label: "Evenness", value: 79 },
  ],
  photoQuality: "Good — natural light, face fully visible",
  lastScan: "Oct 28, 2026",
};

export interface Check {
  product: Product;
  match: number;
  verdict: Verdict;
  reasons: { label: string; ok: boolean; detail: string }[];
  overlap: string | null;
  headline: string;
}

export function checkProduct(p: Product, shelf: string[]): Check {
  const owned = shelf.map(byId);
  const sameStep = owned.find((o) => o.step === p.step && o.id !== p.id);
  const goalFit = p.goals.some((g) => passport.priorities.includes(g));
  const skinFit = p.skinTypes.includes("All") || p.skinTypes.includes(passport.skinType);
  const budgetFit = p.price <= 900;
  let match = 40 + (goalFit ? 22 : 0) + (skinFit ? 15 : 0) + (budgetFit ? 10 : 0) + (sameStep ? -18 : 10);
  if (shelf.includes(p.id)) match = 30;
  match = Math.max(18, Math.min(94, match));
  const verdict: Verdict = shelf.includes(p.id) || (sameStep && match < 70) ? "SKIP" : match >= 80 ? "BUY" : match >= 55 ? "THINK" : "SKIP";
  const headline =
    verdict === "BUY" ? "A strong match for your current routine." : verdict === "THINK" ? "Potentially useful, but not essential right now." : "SKIP IT. You already have something that fits your routine.";
  return {
    product: p,
    match,
    verdict,
    headline,
    overlap: shelf.includes(p.id) ? "Already on your shelf" : sameStep ? `${sameStep.name} already covers this step` : null,
    reasons: [
      { label: "Goal fit", ok: goalFit, detail: goalFit ? `Supports ${p.goals.filter((g) => passport.priorities.includes(g)).join(" & ")}` : "Not one of your current priorities" },
      { label: "Skin profile fit", ok: skinFit, detail: skinFit ? `Suited to ${passport.skinType.toLowerCase()} skin` : `Made for ${p.skinTypes.join(", ").toLowerCase()} skin` },
      { label: "Routine fit", ok: !sameStep, detail: sameStep ? `Duplicates your ${sameStep.step.toLowerCase()} step` : `Fills your ${p.step.toLowerCase()} step` },
      { label: "Budget fit", ok: budgetFit, detail: budgetFit ? "Within your ₹2,500 plan" : "Stretches your monthly plan" },
    ],
  };
}

export const routine = {
  am: { time: "07:30", steps: [
    { id: "am1", step: "Cleanse", pid: "p2" },
    { id: "am2", step: "Serum", pid: "p1" },
    { id: "am3", step: "Moisturize", pid: "p3" },
    { id: "am4", step: "SPF", pid: "p4" },
  ] },
  pm: { time: "22:30", steps: [
    { id: "pm1", step: "Cleanse", pid: "p9" },
    { id: "pm2", step: "Treatment", pid: "p6" },
    { id: "pm3", step: "Moisturize", pid: "p3" },
  ] },
};

export const journey = [
  { day: 1, label: "Day 1", date: "Oct 1", note: "Baseline Skin Passport created.", hydration: 52, texture: 60, oil: 55 },
  { day: 7, label: "Day 7", date: "Oct 7", note: "Routine consistency 6 of 7 days.", hydration: 55, texture: 62, oil: 58 },
  { day: 14, label: "Day 14", date: "Oct 14", note: "Hydration reading trending upward.", hydration: 58, texture: 66, oil: 61 },
  { day: 30, label: "Day 30", date: "Oct 30", note: "Your next check-in is ready.", hydration: 0, texture: 0, oil: 0 },
];

export const occasions = ["Wedding", "Date", "Office", "Vacation", "Everyday"] as const;
export type Occasion = (typeof occasions)[number];

export const looks: Record<Occasion, { mood: string; skin: number; beauty: number; hair: number; outfit: number; items: { k: string; v: string }[] }> = {
  Wedding: { mood: "Luminous, soft-focus glow that lasts through the evening.", skin: 699, beauty: 1998, hair: 0, outfit: 4999, items: [{ k: "Skin", v: "Barrier serum prep" }, { k: "Beauty", v: "Skin tint + rose lip" }, { k: "Hair", v: "Low textured chignon" }, { k: "Outfit", v: "Blush silk set" }] },
  Date: { mood: "Rosy, effortless, a little dewy.", skin: 699, beauty: 899, hair: 0, outfit: 1499, items: [{ k: "Skin", v: "Barrier serum prep" }, { k: "Beauty", v: "Velvet rose lip & cheek" }, { k: "Hair", v: "Loose soft waves" }, { k: "Outfit", v: "Satin slip top" }] },
  Office: { mood: "Polished, matte T-zone, quietly confident.", skin: 0, beauty: 899, hair: 0, outfit: 2199, items: [{ k: "Skin", v: "Your current routine" }, { k: "Beauty", v: "Rose cheek, clear brow" }, { k: "Hair", v: "Sleek low bun" }, { k: "Outfit", v: "Ivory tailored blazer" }] },
  Vacation: { mood: "Bare skin, high protection, sun-kissed cheeks.", skin: 600, beauty: 899, hair: 0, outfit: 1299, items: [{ k: "Skin", v: "SPF 50 reapply" }, { k: "Beauty", v: "Tinted lip & cheek" }, { k: "Hair", v: "Air-dried texture" }, { k: "Outfit", v: "Linen co-ord" }] },
  Everyday: { mood: "Your skin, just a little more rested.", skin: 699, beauty: 0, hair: 0, outfit: 0, items: [{ k: "Skin", v: "Barrier serum" }, { k: "Beauty", v: "Nothing new needed" }, { k: "Hair", v: "As you like it" }, { k: "Outfit", v: "From your wardrobe" }] },
};

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
