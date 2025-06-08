import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Make sure params is properly awaited
    const { userId } = params;
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    console.log("Fetching forum activity for user:", userId);

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

    // Query forum posts created by the user using the correct column names
    const { data: postsData, error: postsError } = await supabase
      .from("forum_posts")
      .select(`
        id,
        title,
        category,
        created_at
      `)
      .eq("author_id", userId)
      .order("created_at", { ascending: false });

    if (postsError) {
      console.error("Error fetching forum posts:", postsError);
      // Return empty array instead of error
      return NextResponse.json([]);
    }

    if (!postsData || postsData.length === 0) {
      console.log("No forum activity found for user:", userId);
      return NextResponse.json([]);
    }

    console.log(`Found ${postsData.length} forum posts for user:`, userId);

    // Get comments count for each post - try with post_id first, fall back to forum_post_id if needed
    const postIds = postsData.map(post => post.id);
    let commentsResults = [];
    
    try {
      // First try with post_id
      const commentsPromises = postIds.map(postId => 
        supabase
          .from("forum_comments")
          .select("id", { count: "exact", head: true })
          .eq("post_id", postId)
      );
      
      commentsResults = await Promise.all(commentsPromises);
      
      // Check if we got any results
      const hasResults = commentsResults.some(result => result.count !== null && result.count !== undefined);
      
      // If no results, try with forum_post_id
      if (!hasResults) {
        console.log("Trying with forum_post_id instead of post_id");
        const alternatePromises = postIds.map(postId => 
          supabase
            .from("forum_comments")
            .select("id", { count: "exact", head: true })
            .eq("forum_post_id", postId)
        );
        
        commentsResults = await Promise.all(alternatePromises);
      }
    } catch (error) {
      console.error("Error fetching comment counts:", error);
      // Initialize with zeros if there's an error
      commentsResults = postIds.map(() => ({ count: 0 }));
    }

    // Combine all data
    const forumActivity = postsData.map((post, index) => {
      return {
        id: post.id,
        title: post.title,
        category: post.category || "General",
        createdAt: post.created_at,
        replies: commentsResults[index]?.count || 0
      };
    });

    return NextResponse.json(forumActivity);
  } catch (error) {
    console.error("Error fetching user forum activity:", error);
    // Return empty array instead of error for better UX
    return NextResponse.json([]);
  }
} 