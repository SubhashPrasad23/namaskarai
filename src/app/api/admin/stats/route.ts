import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const [promptsRes, coursesRes, toolsRes, pendingRes, usersRes] =
    await Promise.all([
      supabase.from("prompt").select("*", { count: "exact", head: true }),

      supabase.from("courses").select("*", { count: "exact", head: true }),

      supabase
        .from("tool_submissions")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("tool_submissions")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending"),

      supabase.from("users").select("*", { count: "exact", head: true }),
    ]);

  return NextResponse.json({
    prompts: promptsRes.count ?? 0,
    courses: coursesRes.count ?? 0,
    tools: toolsRes.count ?? 0,
    pending: pendingRes.count ?? 0,
    users: usersRes.count ?? 0,
  });
}
