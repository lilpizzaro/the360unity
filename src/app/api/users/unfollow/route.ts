import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    // Properly await auth() to fix the headers error
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", message: "You must be logged in to unfollow users" },
        { status: 401 }
      );
    }

    const { followingId } = await request.json();
    
    if (!followingId) {
      return NextResponse.json(
        { error: "Bad Request", message: "Missing followingId parameter" },
        { status: 400 }
      );
    }

    // Initialize Supabase client with the correct environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Configuration Error", message: "Supabase environment variables not set" },
        { status: 500 }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Delete the follow relationship
    const { error } = await supabase
      .from("followers")
      .delete()
      .eq("follower_id", userId)
      .eq("following_id", followingId);

    if (error) {
      console.error("Supabase error when unfollowing:", error);
      return NextResponse.json(
        { 
          error: "Database Error", 
          message: "Failed to unfollow user",
          details: error
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "User unfollowed successfully" 
    });

  } catch (error) {
    console.error("Error in unfollow API:", error);
    return NextResponse.json(
      { 
        error: "Server Error", 
        message: "An unexpected error occurred",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 