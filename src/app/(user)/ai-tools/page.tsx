import { supabase } from "@/lib/supabase/server";
import AiToolsClient from "@/components/ui/AiToolsClient";

export default async function AiToolsPage() {
  const { data } = await supabase
    .from("tools")
    .select("*")
    .order("created_at", { ascending: false });

  return <AiToolsClient tools={data || []} />;
}
