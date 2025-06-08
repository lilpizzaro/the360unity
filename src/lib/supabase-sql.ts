import { supabase } from "./supabase";

/**
 * Creates the project_likes table if it doesn't exist
 */
export async function createProjectLikesTable() {
  try {
    // First try to use the RPC function if available
    const { error: rpcError } = await supabase.rpc('create_project_likes_table').catch(() => ({ error: { message: 'RPC not available' } }));
    
    // If RPC fails, try direct SQL execution
    if (rpcError) {
      console.log("RPC failed, trying direct SQL execution");
      
      const { error: sqlError } = await supabase.rpc('execute_sql', {
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
      }).catch(() => ({ error: { message: 'SQL execution failed' } }));
      
      if (sqlError) {
        console.error("Failed to create project_likes table via SQL:", sqlError);
        throw new Error(`Failed to create project_likes table: ${sqlError.message}`);
      }
    }
    
    console.log("Successfully created project_likes table (or it already exists)");
    return true;
  } catch (error) {
    console.error("Error in createProjectLikesTable:", error);
    throw error;
  }
}

/**
 * Creates all required tables for the application
 */
export async function createAllRequiredTables() {
  try {
    await createProjectLikesTable();
    // Add more table creation functions here as needed
    return true;
  } catch (error) {
    console.error("Error creating required tables:", error);
    return false;
  }
} 