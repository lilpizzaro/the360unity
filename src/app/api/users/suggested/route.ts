import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

// This is needed to ensure the route is properly compiled
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Properly await auth() to fix the headers error
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", message: "You must be logged in to see suggested users" },
        { status: 401 }
      );
    }

    console.log("Fetching suggested users for:", userId);

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

    // Get all users from Clerk
    const users = await clerkClient.users.getUserList({
      limit: 10,
    });

    console.log("All users:", users.map(u => ({ id: u.id, username: u.username })));

    // Filter out the current user
    const filteredUsers = users.filter(user => user.id !== userId);

    // Get followers data from Supabase
    const { data: followersData, error: followersError } = await supabase
      .from("followers")
      .select("following_id")
      .eq("follower_id", userId);

    if (followersError) {
      console.error("Error fetching followers:", followersError);
      return NextResponse.json(
        { 
          error: "Database Error", 
          message: "Failed to fetch followers data",
          details: followersError
        },
        { status: 500 }
      );
    }

    // Create a set of user IDs that the current user is following
    const followingSet = new Set(followersData?.map(row => row.following_id) || []);

    // Transform users data to include following status
    const suggestedUsers = filteredUsers.map(user => {
      const isFollowing = followingSet.has(user.id);
      
      // Determine the best username to display
      let displayUsername = user.username;
      
      // If username is null or undefined, use a formatted version of their name or ID
      if (!displayUsername) {
        if (user.firstName) {
          // Convert to lowercase and remove spaces
          displayUsername = user.firstName.toLowerCase().replace(/\s+/g, '-');
          
          if (user.lastName) {
            displayUsername += '-' + user.lastName.toLowerCase().replace(/\s+/g, '');
          }
        } else {
          // Use part of the user ID as a fallback
          displayUsername = 'user-' + user.id.substring(5, 13);
        }
      }
      
      return {
        id: user.id,
        username: displayUsername,
        firstName: user.firstName || "User",
        lastName: user.lastName || "",
        imageUrl: user.imageUrl,
        followersCount: 0, // We'll update this below
        isFollowing,
      };
    });

    // Get followers count for each user
    for (const user of suggestedUsers) {
      const { count, error: countError } = await supabase
        .from("followers")
        .select("*", { count: "exact", head: true })
        .eq("following_id", user.id);

      if (countError) {
        console.error(`Error fetching followers count for user ${user.id}:`, countError);
      } else {
        user.followersCount = count || 0;
      }
    }

    console.log("Returning suggested users:", suggestedUsers);
    return NextResponse.json(suggestedUsers);

  } catch (error) {
    console.error("Error in suggested users API:", error);
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