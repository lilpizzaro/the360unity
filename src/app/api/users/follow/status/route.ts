import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  try {
    // Get current user from Clerk
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", message: "You must be logged in to check follow status" },
        { status: 401 }
      );
    }

    // Get the followingId from query params
    const url = new URL(request.url);
    const followingId = url.searchParams.get("followingId");
    
    if (!followingId) {
      return NextResponse.json(
        { error: "Bad Request", message: "Missing followingId parameter" },
        { status: 400 }
      );
    }

    console.log(`Checking if user ${userId} is following user ${followingId}`);

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Configuration Error", message: "Supabase environment variables not set" },
        { status: 500 }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if the current user is following the target user
    const { data, error, count } = await supabase
      .from("followers")
      .select("*", { count: "exact" })
      .eq("follower_id", userId)
      .eq("following_id", followingId)
      .limit(1);

    if (error) {
      console.error("Error checking follow status:", error);
      return NextResponse.json(
        { 
          error: "Database Error", 
          message: "Failed to check follow status",
          details: error
        },
        { status: 500 }
      );
    }

    // Return the follow status
    const isFollowing = count !== null && count > 0;
    console.log(`Follow status: ${isFollowing ? 'Following' : 'Not following'}`);
    
    return NextResponse.json({ isFollowing });

  } catch (error) {
    console.error("Error in follow status API:", error);
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