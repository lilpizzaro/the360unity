import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { bio, jobTitle, location, website, github, twitter, skills } = data;

    // Convert skills from string to array if needed
    const skillsArray = typeof skills === "string" 
      ? skills.split(",").map(skill => skill.trim()).filter(skill => skill !== "")
      : skills;

    try {
      // Import clerkClient dynamically to avoid the export error
      const { clerkClient } = await import("@clerk/nextjs/server");
      
      // Update user metadata using clerk client
      const clerk = await clerkClient();
      const user = await clerk.users.updateUser(userId, {
        publicMetadata: {
          bio,
          jobTitle,
          location,
          website,
          github,
          twitter,
          skills: skillsArray
        }
      });

      return NextResponse.json({ success: true, user });
    } catch (clerkError) {
      console.error("Clerk API error:", clerkError);
      return NextResponse.json({ 
        error: "Clerk API error", 
        message: clerkError.message || "Unknown Clerk error",
        details: JSON.stringify(clerkError)
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ 
      error: "Failed to update profile",
      message: error.message || "Unknown error",
      stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
    }, { status: 500 });
  }
} 