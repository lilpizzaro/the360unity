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

    console.log("Fetching projects for user:", userId);

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

    // Query projects from the database using the actual schema
    const { data: projectsData, error: projectsError } = await supabase
      .from("projects")
      .select(`
        id,
        title,
        description,
        author_id,
        author_name,
        author_image_url,
        technologies,
        repo_url,
        demo_url,
        category,
        category_name,
        status,
        stars,
        forks,
        views,
        created_at,
        featured
      `)
      .eq("author_id", userId)
      .order("created_at", { ascending: false });

    if (projectsError) {
      console.error("Error fetching projects:", projectsError);
      
      // Return empty array instead of error
      return NextResponse.json([]);
    }

    if (!projectsData || projectsData.length === 0) {
      console.log("No projects found for user:", userId);
      return NextResponse.json([]);
    }

    console.log(`Found ${projectsData.length} projects for user:`, userId);

    // Transform the data to match the expected format in the frontend
    const projects = projectsData.map(project => {
      return {
        id: project.id,
        title: project.title,
        description: project.description,
        imageUrl: project.author_image_url || "", // Use a default or placeholder if needed
        tags: project.technologies || [],
        likes: project.stars || 0,
        comments: project.forks || 0, // Using forks as a proxy for comments
        createdAt: project.created_at,
        repoUrl: project.repo_url,
        demoUrl: project.demo_url,
        category: project.category,
        featured: project.featured
      };
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching user projects:", error);
    // Return empty array instead of error for better UX
    return NextResponse.json([]);
  }
} 