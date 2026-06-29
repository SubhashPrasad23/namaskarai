import { createClient } from "@/lib/supabase/server";
import AiToolsClient from "@/components/aiTool/components/AiToolsClient";

export default async function AiToolsPage() {

      const supabase = await createClient();
    
      const { data, error } = await supabase
        .from("tool_submissions")
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

  return <AiToolsClient tools={data || []} />;
}
