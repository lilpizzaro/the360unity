import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

// Define User type interface based on Clerk user structure
interface ClerkUser {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  emailAddresses?: Array<{ emailAddress: string }>;
  imageUrl?: string;
  [key: string]: any; // Allow for other properties
}

// Helper function to get user's display name
function getUserDisplayName(user: ClerkUser): string {
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  } else if (user.firstName) {
    return user.firstName;
  } else if (user.username) {
    return user.username;
  } else if (user.emailAddresses && user.emailAddresses.length > 0) {
    // Use email prefix as fallback (part before @)
    return user.emailAddresses[0].emailAddress.split('@')[0];
  } else {
    return "User";
  }
}

// GET comments for a forum post
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");
  
  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }
  
  try {
    const { data, error } = await supabase
      .from('forum_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error("Error fetching comments:", error);
      return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
    }
    
    // Transform the data to match the expected format in the frontend
    const transformedData = data.map(comment => ({
      id: comment.id,
      content: comment.content,
      author: {
        id: comment.author_id,
        name: comment.author_name,
        imageUrl: comment.author_image_url || null
      },
      createdAt: comment.created_at,
      isAnswer: comment.is_solution
    }));
    
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error in comments GET route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST a new comment
export async function POST(request: Request) {
  try {
    // Get authenticated user
    const user = await currentUser();
    
    if (!user || !user.id) {
      console.error("Authentication failed - no valid user found");
      return NextResponse.json({ error: "Unauthorized - no valid user" }, { status: 401 });
    }
    
    const data = await request.json();
    const { postId, content } = data;
    
    if (!postId || !content) {
      return NextResponse.json({ error: "Post ID and content are required" }, { status: 400 });
    }
    
    // Get a proper display name for the user
    const displayName = getUserDisplayName(user);
    
    // Format data for Supabase
    const commentData = {
      post_id: postId,
      content,
      author_id: user.id,
      author_name: displayName,
      author_image_url: user.imageUrl,
      created_at: new Date().toISOString(),
      is_solution: false
    };
    
    // Insert into Supabase
    const { data: newComment, error } = await supabase
      .from('forum_comments')
      .insert(commentData)
      .select()
      .single();
    
    if (error) {
      console.error("Error creating comment:", error);
      return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
    }
    
    // Update the last_activity and last_author in the forum_posts table
    await supabase
      .from('forum_posts')
      .update({
        last_activity: new Date().toISOString(),
        last_author: displayName
      })
      .eq('id', postId);
    
    // Transform the data to match the expected format in the frontend
    const transformedComment = {
      id: newComment.id,
      content: newComment.content,
      author: {
        id: newComment.author_id,
        name: newComment.author_name,
        imageUrl: newComment.author_image_url || null
      },
      createdAt: newComment.created_at,
      isAnswer: newComment.is_solution
    };
    
    return NextResponse.json(transformedComment);
  } catch (error) {
    console.error("Error in comments POST route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 