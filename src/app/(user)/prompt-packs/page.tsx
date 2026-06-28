import { supabase } from "@/lib/supabase/server";
import PromptPacksClient from "@/components/prompts/components/PromptPacksClient";

export default async function PromptPacksPage() {
  const { data } = await supabase
    .from("prompt")
    .select("*")
    .order("created_at", { ascending: false });

  return <PromptPacksClient promptPacks={data || []} />;
}
