import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";

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

// GET a single project by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // In server components/API routes, params doesn't need to be unwrapped with React.use
    // But it should be awaited as it's a promise in the new Next.js
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
    }
    
    // Get project from Supabase
    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error("Error fetching project:", error);
      return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
    }
    
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    
    // Increment view count
    await supabase
      .from('projects')
      .update({ views: project.views + 1 })
      .eq('id', id);
    
    return NextResponse.json(project);
  } catch (error) {
    console.error("Error in project GET route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH to update a project
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // In server components/API routes, params doesn't need to be unwrapped with React.use
    // But it should be awaited as it's a promise in the new Next.js
    const id = params.id;
    const data = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
    }
    
    // Get current project to check ownership
    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select('author_id')
      .eq('id', id)
      .single();
    
    if (fetchError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    
    // Get current user ID from auth
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Check if user is the author
    if (project.author_id !== user.id) {
      return NextResponse.json({ error: "Unauthorized to modify this project" }, { status: 403 });
    }
    
    // Update project
    const { data: updatedProject, error } = await supabase
      .from('projects')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating project:", error);
      return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
    
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error in project PATCH route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE a project
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // In server components/API routes, params doesn't need to be unwrapped with React.use
    // But it should be awaited as it's a promise in the new Next.js
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
    }
    
    // Get current project to check ownership
    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select('author_id')
      .eq('id', id)
      .single();
    
    if (fetchError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    
    // Get current user ID from auth
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Check if user is the author
    if (project.author_id !== user.id) {
      return NextResponse.json({ error: "Unauthorized to delete this project" }, { status: 403 });
    }
    
    // Delete project
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Error deleting project:", error);
      return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
    
    // Delete project files from storage
    const { data: files } = await supabase.storage
      .from('projects')
      .list(`${user.id}/${id}`);
      
    if (files && files.length > 0) {
      const filePaths = files.map(file => `${user.id}/${id}/${file.name}`);
      await supabase.storage
        .from('projects')
        .remove(filePaths);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in project DELETE route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 