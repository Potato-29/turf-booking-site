import { supabase } from "@/utils/supabase/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({
    text: "Hello world",
  });
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          "user-role": payload.role,
        },
      },
    });
    if (data) {
      return NextResponse.json({
        response: data,
        error: false,
        message: "User signed up successfully",
      });
    }
    if (error) {
      return NextResponse.json({
        error: true,
        response: error,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to signup" }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const payload = await request.json();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    cookies().set("access_token", data.session.access_token);
    cookies().set("user-role", data.user.user_metadata["user-role"]);

    return NextResponse.json(
      {
        response: data,
        error: false,
        message: "User logged in successfully",
      }
      //   {
      //     headers: {
      //       "Set-Cookie": data?.session?.access_token,
      //     },
      //   }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to login" }, { status: 400 });
  }
}
