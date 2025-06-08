import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

// This is needed to ensure the route is properly compiled
export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const params = await context.params;
    console.log("Star API route called with params:", params);
    
    // Get authenticated user
    const { userId } = await auth();
    
    if (!userId) {
      console.log("Star API: Unauthorized - no user ID");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;
    
    if (!id) {
      console.log("Star API: Missing project ID");
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    console.log(`Star API: Processing request for project ${id} by user ${userId}`);

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.log("Star API: Missing Supabase environment variables");
      return NextResponse.json(
        { error: "Configuration Error", message: "Supabase environment variables not set" },
        { status: 500 }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if the project_likes table exists
    const { error: checkTableError } = await supabase
      .from('project_likes')
      .select('*')
      .limit(1);
    
    // If the table doesn't exist, create it
    if (checkTableError && checkTableError.code === '42P01') {
      console.log("Creating project_likes table as it doesn't exist");
      
      try {
        // Create the project_likes table using SQL
        const { error: createError } = await supabase.rpc('execute_sql', {
          sql_query: `
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            
            CREATE TABLE IF NOT EXISTS project_likes (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              project_id TEXT NOT NULL,
              user_id TEXT NOT NULL,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
              UNIQUE(project_id, user_id)
            );
          `
        });
        
        if (createError) {
          console.error("Failed to create project_likes table:", createError);
          return NextResponse.json(
            { error: "Failed to create required database table", details: createError },
            { status: 500 }
          );
        }
        
        console.log("Created project_likes table successfully");
      } catch (createError) {
        console.error("Failed to create table:", createError);
        return NextResponse.json(
          { error: "Failed to create required database table", details: createError },
          { status: 500 }
        );
      }
    } else if (checkTableError) {
      console.error("Error checking table existence:", checkTableError);
      return NextResponse.json(
        { error: "Database error", details: checkTableError },
        { status: 500 }
      );
    }

    // Check if the user has already starred the project
    const { data: existingStar, error: checkError } = await supabase
      .from("project_likes")
      .select("*")
      .eq("project_id", id)
      .eq("user_id", userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
      console.error("Error checking star status:", checkError);
      return NextResponse.json(
        { error: "Failed to check star status", details: checkError },
        { status: 500 }
      );
    }

    let action = 'starred';
    
    // If the user has already starred, remove the star (toggle)
    if (existingStar) {
      console.log(`Star API: User ${userId} is unstarring project ${id}`);
      const { error: deleteError } = await supabase
        .from("project_likes")
        .delete()
        .eq("project_id", id)
        .eq("user_id", userId);

      if (deleteError) {
        console.error("Error removing star:", deleteError);
        return NextResponse.json(
          { error: "Failed to remove star", details: deleteError },
          { status: 500 }
        );
      }
      
      action = 'unstarred';
    } else {
      // Otherwise, add a new star
      console.log(`Star API: User ${userId} is starring project ${id}`);
      const { error: insertError } = await supabase
        .from("project_likes")
        .insert({
          project_id: id,
          user_id: userId,
          created_at: new Date().toISOString()
        });

      if (insertError) {
        console.error("Error adding star:", insertError);
        return NextResponse.json(
          { error: "Failed to add star", details: insertError },
          { status: 500 }
        );
      }
    }

    // Update the stars count in the projects table
    const { count: starsCount, error: countError } = await supabase
      .from("project_likes")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id);
      
    if (countError) {
      console.error("Error counting stars:", countError);
    }
    
    // Try to update the project's star count
    const { error: updateError } = await supabase
      .from("projects")
      .update({ stars: starsCount || 0 })
      .eq("id", id);
      
    if (updateError) {
      console.error("Error updating project star count:", updateError);
    }

    console.log(`Star API: Success - project ${id} ${action}, new count: ${starsCount || 0}`);
    return NextResponse.json({ 
      success: true, 
      action,
      starsCount: starsCount || 0
    });
  } catch (error) {
    console.error("Error in star project API:", error);
    return NextResponse.json(
      { 
        error: "Server Error", 
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 