import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // We need to create tables one by one using direct SQL
    
    // 1. Create collab_rooms table
    try {
      const { error: roomsError } = await supabase.rpc('execute_sql', {
        query: `
          CREATE TABLE IF NOT EXISTS collab_rooms (
            id TEXT PRIMARY KEY,
            code TEXT NOT NULL DEFAULT '// Write your code here...',
            language TEXT NOT NULL DEFAULT 'javascript',
            created_by TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_by TEXT,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            is_active BOOLEAN DEFAULT TRUE
          );
        `
      });
      
      if (roomsError) {
        console.error('Error creating collab_rooms table:', roomsError);
        
        // Try alternative approach with direct insert
        const { error: createRoomsError } = await supabase
          .from('collab_rooms')
          .insert({
            id: 'setup-test',
            code: '// Test',
            language: 'javascript',
            created_by: 'system',
            updated_by: 'system'
          })
          .select();
          
        if (createRoomsError && createRoomsError.code !== '23505') { // Ignore duplicate key error
          throw createRoomsError;
        }
      }
    } catch (err) {
      console.error('Cannot create collab_rooms table:', err);
    }
    
    // 2. Create collab_room_users table
    try {
      const { error: usersError } = await supabase.rpc('execute_sql', {
        query: `
          CREATE TABLE IF NOT EXISTS collab_room_users (
            id SERIAL PRIMARY KEY,
            room_id TEXT NOT NULL REFERENCES collab_rooms(id) ON DELETE CASCADE,
            user_id TEXT NOT NULL,
            username TEXT NOT NULL,
            joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            UNIQUE(room_id, user_id)
          );
        `
      });
      
      if (usersError) {
        console.error('Error creating collab_room_users table:', usersError);
        
        // Check if the table exists using a select query
        const { error: checkUsersError } = await supabase
          .from('collab_room_users')
          .select('id')
          .limit(1);
          
        if (checkUsersError && checkUsersError.code !== '42P01') { // 42P01 = relation does not exist
          throw checkUsersError;
        }
      }
    } catch (err) {
      console.error('Cannot create collab_room_users table:', err);
    }
    
    // 3. Create collab_messages table
    try {
      const { error: messagesError } = await supabase.rpc('execute_sql', {
        query: `
          CREATE TABLE IF NOT EXISTS collab_messages (
            id SERIAL PRIMARY KEY,
            room_id TEXT NOT NULL REFERENCES collab_rooms(id) ON DELETE CASCADE,
            user_id TEXT NOT NULL,
            username TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });
      
      if (messagesError) {
        console.error('Error creating collab_messages table:', messagesError);
        
        // Check if the table exists using a select query
        const { error: checkMessagesError } = await supabase
          .from('collab_messages')
          .select('id')
          .limit(1);
          
        if (checkMessagesError && checkMessagesError.code !== '42P01') { // 42P01 = relation does not exist
          throw checkMessagesError;
        }
      }
    } catch (err) {
      console.error('Cannot create collab_messages table:', err);
    }
    
    // Create demo room
    try {
      const { error: demoRoomError } = await supabase
        .from('collab_rooms')
        .upsert({
          id: 'room-demo123',
          code: '// Welcome to the collaborative editor!\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("Collaborator"));',
          language: 'javascript',
          created_by: 'system',
          updated_by: 'system',
          is_active: true
        });
        
      if (demoRoomError) {
        console.error('Error creating demo room:', demoRoomError);
      }
    } catch (err) {
      console.error('Cannot create demo room:', err);
    }
    
    // Verify tables exist by doing a simple query
    const { data: roomsData, error: roomsQueryError } = await supabase
      .from('collab_rooms')
      .select('id')
      .limit(1);
      
    if (roomsQueryError) {
      return NextResponse.json({
        success: false,
        message: 'Failed to verify tables were created.',
        error: roomsQueryError
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Tables were created or already exist.',
      demo_room: 'room-demo123',
      note: 'You may need to enable realtime for these tables in the Supabase dashboard.'
    });
    
  } catch (error) {
    console.error('Unexpected error setting up collaboration tables:', error);
    return NextResponse.json({
      success: false,
      message: 'Unexpected error setting up collaboration tables.',
      error
    }, { status: 500 });
  }
} 