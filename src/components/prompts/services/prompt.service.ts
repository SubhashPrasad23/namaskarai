export async function getPromptPacks() {
  const res = await fetch("/api/prompts");
  if (!res.ok) throw new Error("Failed to fetch prompt packs");
  return res.json();
}