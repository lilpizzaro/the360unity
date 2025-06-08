import { NextRequest, NextResponse } from "next/server";
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

// POST to upload a file to a project
export async function POST(request: NextRequest) {
  const user = await currentUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = user.id;
  
  try {
    const formData = await request.formData();
    const projectId = formData.get('projectId') as string;
    const file = formData.get('file') as File;
    const isCoverImage = formData.get('isCoverImage') === 'true';
    
    if (!projectId || !file) {
      return NextResponse.json({ error: "Missing project ID or file" }, { status: 400 });
    }
    
    // Verify user owns the project
    const { data: project } = await supabase
      .from('projects')
      .select('author_id')
      .eq('id', projectId)
      .single();
      
    if (!project || project.author_id !== userId) {
      return NextResponse.json({ error: "Unauthorized to modify this project" }, { status: 403 });
    }
    
    // Upload file
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/${projectId}/${Date.now()}-${file.name}`;
    
    // Convert File to ArrayBuffer for upload
    const arrayBuffer = await file.arrayBuffer();
    
    const { data, error } = await supabase.storage
      .from('projects')
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        cacheControl: '3600'
      });
      
    if (error) {
      console.error("Error uploading file:", error);
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('projects')
      .getPublicUrl(filePath);
      
    // Update project
    if (isCoverImage) {
      // Update project's image field if this is a cover image
      await supabase
        .from('projects')
        .update({ image: urlData.publicUrl })
        .eq('id', projectId);
        
      return NextResponse.json({ 
        success: true, 
        fileUrl: urlData.publicUrl,
        isCoverImage: true
      });
    } else {
      // Otherwise, update project to include the new file URL in files array
      // First get existing files
      const { data: projectData } = await supabase
        .from('projects')
        .select('files')
        .eq('id', projectId)
        .single();
        
      const existingFiles = projectData?.files || [];
      const updatedFiles = [...existingFiles, urlData.publicUrl];
      
      // Update project with new files array
      await supabase
        .from('projects')
        .update({ files: updatedFiles })
        .eq('id', projectId);
      
      return NextResponse.json({ 
        success: true, 
        fileUrl: urlData.publicUrl,
        files: updatedFiles
      });
    }
  } catch (error) {
    console.error("Error in project files POST route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET files for a project
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  
  if (!projectId) {
    return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
  }
  
  try {
    // Get project to get the author ID
    const { data: project } = await supabase
      .from('projects')
      .select('author_id, files')
      .eq('id', projectId)
      .single();
      
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    
    // If files are already stored in the project record
    if (project.files && project.files.length > 0) {
      return NextResponse.json({ files: project.files });
    }
    
    // Otherwise list files from storage
    const { data, error } = await supabase.storage
      .from('projects')
      .list(`${project.author_id}/${projectId}`);
      
    if (error) {
      console.error("Error listing files:", error);
      return NextResponse.json({ error: "Failed to list files" }, { status: 500 });
    }
    
    // Get public URLs for all files
    const fileUrls = data.map(file => {
      const { data: urlData } = supabase.storage
        .from('projects')
        .getPublicUrl(`${project.author_id}/${projectId}/${file.name}`);
      return urlData.publicUrl;
    });
    
    // Update project with file URLs
    await supabase
      .from('projects')
      .update({ files: fileUrls })
      .eq('id', projectId);
    
    return NextResponse.json({ files: fileUrls });
  } catch (error) {
    console.error("Error in project files GET route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE a file from a project
export async function DELETE(request: NextRequest) {
  const user = await currentUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = user.id;
  
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const fileUrl = searchParams.get("fileUrl");
    
    if (!projectId || !fileUrl) {
      return NextResponse.json({ error: "Missing project ID or file URL" }, { status: 400 });
    }
    
    // Verify user owns the project
    const { data: project } = await supabase
      .from('projects')
      .select('author_id, files')
      .eq('id', projectId)
      .single();
      
    if (!project || project.author_id !== userId) {
      return NextResponse.json({ error: "Unauthorized to modify this project" }, { status: 403 });
    }
    
    // Extract file path from URL
    const url = new URL(fileUrl);
    const pathParts = url.pathname.split('/');
    const filePath = pathParts.slice(pathParts.indexOf('projects') + 1).join('/');
    
    // Delete file from storage
    const { error } = await supabase.storage
      .from('projects')
      .remove([filePath]);
      
    if (error) {
      console.error("Error deleting file:", error);
      return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
    }
    
    // Update project files array
    const updatedFiles = project.files.filter((url: string) => url !== fileUrl);
    
    await supabase
      .from('projects')
      .update({ files: updatedFiles })
      .eq('id', projectId);
    
    return NextResponse.json({ 
      success: true, 
      files: updatedFiles
    });
  } catch (error) {
    console.error("Error in project files DELETE route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 