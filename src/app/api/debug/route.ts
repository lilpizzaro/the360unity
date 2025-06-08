import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Check environment variables
    const envVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
      SUPABASE_KEY: process.env.SUPABASE_KEY ? 'Set' : 'Missing',
      NODE_ENV: process.env.NODE_ENV || 'Not set',
    };
    
    // Test Supabase connection
    let supabaseStatus = 'Unknown';
    let error = null;
    
    try {
      // Simple query to test connection
      const { data, error: queryError } = await supabase
        .from('projects')
        .select('id')
        .limit(1);
      
      if (queryError) {
        supabaseStatus = 'Error';
        error = queryError;
      } else {
        supabaseStatus = 'Connected';
      }
    } catch (e) {
      supabaseStatus = 'Exception';
      error = e;
    }
    
    // Return diagnostic info
    return NextResponse.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: envVars,
      supabase: {
        status: supabaseStatus,
        error: error ? String(error) : null,
        hasRealtime: Boolean(supabase.realtime),
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'Error',
      message: String(error),
    }, { status: 500 });
  }
} 