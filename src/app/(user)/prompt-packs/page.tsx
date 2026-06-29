import { createClient } from "@/lib/supabase/server";
import PromptPacksClient from "@/components/prompts/components/PromptPacksClient";

export default async function PromptPacksPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("prompt")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);

    return (
      <div className="py-20 text-center text-red-500">
        Failed to load prompts
      </div>
    );
  }

  return (
    <PromptPacksClient
      promptPacks={data || []}
    />
  );
}