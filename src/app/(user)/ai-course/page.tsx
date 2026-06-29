import { createClient } from "@/lib/supabase/server";
import AiCourseClient from "@/components/aiCourses/components/AiCourseClient";

export default async function AiCoursePage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);

    return (
      <div className="py-20 text-center text-red-500">
        Failed to load courses
      </div>
    );
  }

  return <AiCourseClient courses={data || []} />;
}