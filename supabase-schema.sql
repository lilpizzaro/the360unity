-- Create forum_posts table
CREATE TABLE IF NOT EXISTS forum_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_image_url TEXT,
  category TEXT NOT NULL,
  category_name TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_author TEXT NOT NULL,
  pinned BOOLEAN DEFAULT FALSE,
  solved BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}'
);

-- Create forum_comments table
CREATE TABLE IF NOT EXISTS forum_comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_solution BOOLEAN DEFAULT FALSE
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_image_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  repo_url TEXT,
  demo_url TEXT,
  category TEXT NOT NULL,
  category_name TEXT NOT NULL,
  status TEXT NOT NULL,
  stars INTEGER DEFAULT 0,
  forks INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  featured BOOLEAN DEFAULT FALSE,
  files TEXT[] DEFAULT '{}'
);

-- Create tables for real-time code collaboration

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

-- Enable Row Level Security (RLS)
ALTER TABLE collab_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE collab_room_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE collab_messages ENABLE ROW LEVEL SECURITY;

-- Create security policies for collaboration tables
-- Anyone can view active rooms
CREATE POLICY "Anyone can view active rooms" ON collab_rooms
  FOR SELECT USING (is_active = TRUE);

-- Only the creator can update their room
CREATE POLICY "Room creators can update their rooms" ON collab_rooms
  FOR UPDATE USING (created_by = auth.uid());

-- Users can see all users in rooms they're in
CREATE POLICY "Users can view users in their rooms" ON collab_room_users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM collab_room_users
      WHERE room_id = collab_room_users.room_id
      AND user_id = auth.uid()
    )
  );

-- Users can see messages in rooms they're in
CREATE POLICY "Users can view messages in their rooms" ON collab_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM collab_room_users
      WHERE room_id = collab_messages.room_id
      AND user_id = auth.uid()
    )
  );

-- Create storage bucket for project files
-- This needs to be run by an admin in the Supabase dashboard or via the API
-- CREATE STORAGE BUCKET IF NOT EXISTS projects
--   WITH public = true;

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(row_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
  current_count INTEGER;
BEGIN
  SELECT views INTO current_count FROM forum_posts WHERE id = row_id;
  RETURN current_count + 1;
END;
$$ LANGUAGE plpgsql; 