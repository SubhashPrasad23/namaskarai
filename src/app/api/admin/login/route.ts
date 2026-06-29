import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        {
          status: 400,
        },
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 401,
        },
      );
    }

    if (data.user?.email !== process.env.ADMIN_EMAIL) {
      await supabase.auth.signOut();

      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized access",
        },
        {
          status: 403,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Login successful",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
