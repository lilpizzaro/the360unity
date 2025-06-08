import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-static";

export async function GET() {
  try {
    // Check if table exists first
    const { data: tableExists, error: tableCheckError } = await supabase
      .from('collab_rooms')
      .select('id', { count: 'exact', head: true })
      .limit(1);
    
    // If there was an error checking the table or it doesn't exist, return 0
    if (tableCheckError || tableExists === null) {
      console.log("Collab tables don't exist yet, returning 0 count");
      return NextResponse.json({ 
        count: 0,
        message: "Collaboration stats retrieved successfully" 
      });
    }
    
    // Get count of active collaboration rooms
    const { count, error } = await supabase
      .from('collab_rooms')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error("Error fetching collaboration stats:", error);
      return NextResponse.json({ error: "Failed to fetch collaboration stats" }, { status: 500 });
    }
    
    return NextResponse.json({ 
      count: count || 0,
      message: "Collaboration stats retrieved successfully" 
    });
  } catch (error) {
    console.error("Error in collaboration stats GET route:", error);
    return NextResponse.json({ 
      error: "Internal server error",
      count: 0 
    }, { status: 500 });
  }
} 