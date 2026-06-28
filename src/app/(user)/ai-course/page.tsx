import { supabase } from "@/lib/supabase/server";
import AiCourseClient from "@/components/ui/AiCourseClient";

export default async function AiCoursePage() {
  const { data } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  return <AiCourseClient courses={data || []} />;
}
