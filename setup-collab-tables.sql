-- Setup SQL for Real-time Code Collaboration
-- Copy and paste this entire file into the Supabase SQL Editor

-- Create collaboration rooms table
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

-- Create collaboration room users table
CREATE TABLE IF NOT EXISTS collab_room_users (
  id SERIAL PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES collab_rooms(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(room_id, user_id)
);

-- Create collaboration messages table
CREATE TABLE IF NOT EXISTS collab_messages (
  id SERIAL PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES collab_rooms(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on tables
ALTER TABLE collab_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE collab_room_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE collab_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for collaboration tables

-- Anyone can view active rooms
CREATE POLICY "Anyone can view active rooms" ON collab_rooms
  FOR SELECT USING (is_active = TRUE);

-- Anyone can insert a room
CREATE POLICY "Anyone can insert a room" ON collab_rooms
  FOR INSERT WITH CHECK (true);

-- Anyone can update a room
CREATE POLICY "Anyone can update a room" ON collab_rooms
  FOR UPDATE USING (true);

-- Anyone can insert, select, update, or delete room users
CREATE POLICY "Anyone can manage room users" ON collab_room_users
  FOR ALL USING (true);

-- Anyone can insert or select messages
CREATE POLICY "Anyone can insert or select messages" ON collab_messages
  FOR ALL USING (true);

-- Enable realtime subscriptions for these tables
BEGIN;
  -- Enable the PostgreSQL publication for real-time
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;

-- Add tables to the publication for real-time updates
ALTER PUBLICATION supabase_realtime ADD TABLE collab_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE collab_room_users;
ALTER PUBLICATION supabase_realtime ADD TABLE collab_messages;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_collab_room_users_room_id ON collab_room_users(room_id);
CREATE INDEX IF NOT EXISTS idx_collab_messages_room_id ON collab_messages(room_id);
CREATE INDEX IF NOT EXISTS idx_collab_messages_created_at ON collab_messages(created_at);

-- Enable full row replication for real-time
ALTER TABLE collab_rooms REPLICA IDENTITY FULL;
ALTER TABLE collab_room_users REPLICA IDENTITY FULL;
ALTER TABLE collab_messages REPLICA IDENTITY FULL; 