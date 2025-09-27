// lib/rewards.ts
export type Reward = {
  id: string;
  brand: string;
  title: string;
  note: string;
  save: string;
  denom: number[];
};

/**
 * Loads Pakistan catalog from JSON (server or client).
 * If your tsconfig doesn't have resolveJsonModule, we avoid direct typing.
 */
export async function loadPkRewards(): Promise<Reward[]> {
  const mod = await import("@/data/rewards.pk.json");
  return (mod.default || mod) as Reward[];
}
