-- SQL script to remove placeholder data from the database

-- Delete placeholder projects
DELETE FROM projects 
WHERE title = 'AI-Powered Task Manager' 
   OR title = 'Real-time Collaboration IDE';

-- Update the featured flag for any projects that were previously featured but are no longer valid
UPDATE projects
SET featured = false
WHERE featured = true 
  AND (author_name = 'Alex Kumar' OR author_name = 'Sarah Chen');

-- Delete forum posts by placeholder users
DELETE FROM forum_posts 
WHERE author_name = 'Alex Kumar' 
   OR author_name = 'Sarah Chen';

-- Delete any demo collaboration rooms
DELETE FROM collab_rooms 
WHERE id = 'room-demo123';

-- Remove any users associated with these rooms
DELETE FROM collab_room_users 
WHERE username = 'Alex Kumar' 
   OR username = 'Sarah Chen';

-- Remove any messages from these users
DELETE FROM collab_messages 
WHERE username = 'Alex Kumar' 
   OR username = 'Sarah Chen';

-- This script can be run in the Supabase SQL Editor to clean up the database 