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

// GET all forum posts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  
  try {
    let query = supabase
      .from('forum_posts')
      .select('*');
    
    if (category && category !== "all") {
      query = query.eq('category', category);
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching forum posts:", error);
      return NextResponse.json({ error: "Failed to fetch forum posts" }, { status: 500 });
    }
    
    // Transform the data to match the expected format in the frontend
    const transformedData = data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: {
        id: post.author_id,
        name: post.author_name,
        imageUrl: post.author_image_url || null
      },
      category: post.category,
      categoryName: post.category_name,
      replies: 0, // This would need to be calculated from comments
      views: post.views,
      createdAt: post.created_at,
      lastActivity: post.last_activity,
      lastAuthor: post.last_author,
      pinned: post.pinned,
      solved: post.solved,
      tags: post.tags || []
    }));
    
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error in forum GET route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST a new forum post
export async function POST(request: Request) {
  try {
    // Get authentication only from currentUser
    const user = await currentUser();
    
    // Debug authentication
    console.log("Auth state from currentUser:", { user, userId: user?.id });
    
    if (!user || !user.id) {
      console.error("Authentication failed - no valid user found");
      return NextResponse.json({ error: "Unauthorized - no valid user" }, { status: 401 });
    }
    
    const data = await request.json();
    const { title, content, category, tags } = data;
    
    console.log("Received post request with data:", { title, category, userId: user.id });
    
    // Validate required fields
    if (!title || !content || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    // Get a proper display name for the user
    const displayName = getUserDisplayName(user);
    
    // Format data for Supabase
    const postData = {
      title,
      content,
      author_id: user.id,
      author_name: displayName,
      author_image_url: user.imageUrl,
      category,
      category_name: getCategoryName(category),
      views: 0,
      last_activity: new Date().toISOString(),
      last_author: displayName,
      pinned: false,
      solved: false,
      tags: tags || []
    };
    
    // Insert into Supabase
    const { data: newPost, error } = await supabase
      .from('forum_posts')
      .insert(postData)
      .select()
      .single();
    
    if (error) {
      console.error("Error creating forum post:", error);
      return NextResponse.json({ error: "Failed to create forum post" }, { status: 500 });
    }
    
    return NextResponse.json(newPost);
  } catch (error) {
    console.error("Error in forum POST route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Helper function to get category name
function getCategoryName(category: string): string {
  const categories: Record<string, string> = {
    "all": "All Topics",
    "react": "React",
    "nextjs": "Next.js",
    "typescript": "TypeScript",
    "nodejs": "Node.js",
    "devops": "DevOps",
    "career": "Career",
    "general": "General",
    "javascript": "JavaScript",
    "python": "Python",
    "design": "UI/UX Design",
    "help": "Help Wanted"
  };
  
  return categories[category] || "Unknown";
} 