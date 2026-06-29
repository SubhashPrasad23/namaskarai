import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("prompt")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const body = await request.json();

  const { title, title_as, category, prompt, prompt_as, tags, slug } = body;

  const { data, error } = await supabase
    .from("prompt")
    .insert({
      title,
      title_as,
      category,
      prompt,
      prompt_as,
      tags,
      slug,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function PUT(request: Request) {
  const supabase = await createClient();

  const body = await request.json();

  const { id, title, title_as, category, prompt, prompt_as, tags, slug } = body;
  console.log(body)

  const { data, error } = await supabase
    .from("prompt")
    .update({
      title,
      title_as,
      category,
      prompt,
      prompt_as,
      tags,
      slug,
    })
    .eq("id", id)
    .select()
    .single();


    console.log(error,"error")
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}



export async function DELETE(request: Request) {
  const supabase = await createClient();

  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const { error } = await supabase.from("prompt").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
  });
}