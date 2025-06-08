import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

// This is needed to ensure the route is properly compiled
export const dynamic = 'force-dynamic';

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

// GET all projects
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const technology = searchParams.get("technology");
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit") as string) : undefined;
  
  try {
    // Get current user to check if they've starred projects
    const user = await currentUser();
    const userId = user?.id;
    
    // Get all projects
    let query = supabase
      .from('projects')
      .select('*');
    
    if (category && category !== "all") {
      query = query.eq('category', category);
    }
    
    if (technology && technology !== "All") {
      // This assumes technologies is stored as an array in Supabase
      query = query.contains('technologies', [technology]);
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,author_name.ilike.%${search}%`);
    }
    
    if (limit) {
      query = query.limit(limit);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching projects:", error);
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
    
    // If user is signed in, get their starred projects
    let userStars: Record<string, boolean> = {};
    
    if (userId) {
      const { data: starredData, error: starredError } = await supabase
        .from('project_likes')
        .select('project_id')
        .eq('user_id', userId);
      
      if (!starredError && starredData) {
        userStars = starredData.reduce((acc: Record<string, boolean>, item) => {
          acc[item.project_id] = true;
          return acc;
        }, {});
      }
    }
    
    // Transform the data to match the expected format in the frontend
    const transformedData = data.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      image: project.image_url,
      author: {
        id: project.author_id,
        name: project.author_name,
        avatar: project.author_image_url || null // Ensure this is never undefined
      },
      technologies: project.technologies || [],
      githubUrl: project.repo_url,
      liveUrl: project.demo_url,
      category: project.category,
      categoryName: project.category_name,
      status: project.status,
      stars: project.stars || 0,
      isStarred: userId ? !!userStars[project.id] : false,
      forks: project.forks || 0,
      views: project.views || 0,
      createdAt: project.created_at,
      featured: project.featured || false
    }));
    
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error in projects GET route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST a new project
export async function POST(request: Request) {
  const user = await currentUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const data = await request.json();
    const { title, description, repoUrl, demoUrl, technologies, category, status } = data;
    
    // Validate required fields
    if (!title || !description || !technologies || !category || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    // Get a proper display name for the user
    const displayName = getUserDisplayName(user);
    
    // Format data for Supabase
    const projectData = {
      title,
      description,
      author_id: user.id,
      author_name: displayName,
      author_image_url: user.imageUrl,
      technologies: Array.isArray(technologies) ? technologies : technologies.split(",").map((tech: string) => tech.trim()),
      repo_url: repoUrl,
      demo_url: demoUrl,
      category,
      category_name: getCategoryName(category),
      status,
      stars: 0,
      forks: 0,
      views: 0,
      featured: false
    };
    
    // Insert into Supabase
    const { data: newProject, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single();
    
    if (error) {
      console.error("Error creating project:", error);
      return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
    
    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Error in projects POST route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Helper function to get category name
function getCategoryName(category: string): string {
  const categories: Record<string, string> = {
    "web": "Web Development",
    "mobile": "Mobile App",
    "desktop": "Desktop Application",
    "ai": "AI/Machine Learning",
    "game": "Game Development",
    "blockchain": "Blockchain",
    "other": "Other"
  };
  
  return categories[category] || "Unknown";
} 