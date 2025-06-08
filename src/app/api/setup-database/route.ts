import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
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

    // Read the database setup SQL file
    const sqlFilePath = path.join(process.cwd(), 'database_setup.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    // Split the SQL into individual statements
    const statements = sql
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

    const results = [];

    // Execute each statement
    for (const statement of statements) {
      try {
        const { error } = await supabase.rpc('execute_sql', {
          query: statement + ';'
        });
        
        if (error) {
          console.error('Error executing SQL statement:', error);
          results.push({
            statement: statement.substring(0, 50) + '...',
            success: false,
            error: error.message
          });
        } else {
          results.push({
            statement: statement.substring(0, 50) + '...',
            success: true
          });
        }
      } catch (err) {
        console.error('Error executing SQL statement:', err);
        results.push({
          statement: statement.substring(0, 50) + '...',
          success: false,
          error: err instanceof Error ? err.message : String(err)
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database setup completed',
      results
    });
    
  } catch (error) {
    console.error('Unexpected error setting up database:', error);
    return NextResponse.json({
      success: false,
      message: 'Unexpected error setting up database',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 