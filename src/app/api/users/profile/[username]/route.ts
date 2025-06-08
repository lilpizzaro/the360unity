import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    // Make sure params is properly awaited - in Next.js 14+, params is already resolved
    const { username } = params;
    
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    console.log("Looking up user with username:", username);

    // Try to find the user by exact username first
    let users = await clerkClient.users.getUserList({
      limit: 100, // Get all users since we need to search through them
    });

    console.log("All users:", users.map(u => ({ id: u.id, username: u.username })));

    // First try exact match
    let matchedUsers = users.filter(u => u.username === username);
    
    // If no exact match, try to match by user ID
    if (matchedUsers.length === 0 && username.startsWith("user_")) {
      matchedUsers = users.filter(u => u.id === username);
    }
    
    // If still no match, try to match by partial username (e.g., "user-user_2yB" should match "user_2yB")
    if (matchedUsers.length === 0) {
      matchedUsers = users.filter(u => {
        // Check if the username contains the user ID
        if (u.id && username.includes(u.id)) return true;
        
        // Check if the user ID is part of the URL username
        if (u.username && username.includes(u.username)) return true;
        
        return false;
      });
    }

    if (matchedUsers.length === 0) {
      console.log("No users found for:", username);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const user = matchedUsers[0];
    console.log("Found user:", user.id, user.username);

    // Extract skills from metadata
    const skills = user.unsafeMetadata?.skills as string[] || [];

    // Format user data
    const userData = {
      id: user.id,
      username: user.username || user.id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      imageUrl: user.imageUrl,
      bio: user.unsafeMetadata?.bio as string || "",
      jobTitle: user.unsafeMetadata?.jobTitle as string || "",
      location: user.unsafeMetadata?.location as string || "",
      website: user.unsafeMetadata?.website as string || "",
      github: user.unsafeMetadata?.github as string || "",
      twitter: user.unsafeMetadata?.twitter as string || "",
      skills,
      // We'll fetch these counts from the frontend separately
      followersCount: 0,
      followingCount: 0,
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching user profile:", error);
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