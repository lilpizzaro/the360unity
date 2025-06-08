-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    repository_url TEXT,
    live_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create project tags table
CREATE TABLE IF NOT EXISTS project_tags (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL
);

-- Create project likes table
CREATE TABLE IF NOT EXISTS project_likes (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, user_id)
);

-- Create project comments table
CREATE TABLE IF NOT EXISTS project_comments (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create forum categories table
CREATE TABLE IF NOT EXISTS forum_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(20),
    position INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create forum threads table
CREATE TABLE IF NOT EXISTS forum_threads (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    user_id TEXT NOT NULL,
    category_id INTEGER REFERENCES forum_categories(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    pinned BOOLEAN DEFAULT FALSE,
    solved BOOLEAN DEFAULT FALSE,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_user_id TEXT
);

-- Create forum thread tags table
CREATE TABLE IF NOT EXISTS forum_thread_tags (
    id SERIAL PRIMARY KEY,
    thread_id INTEGER REFERENCES forum_threads(id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL
);

-- Create forum replies table
CREATE TABLE IF NOT EXISTS forum_replies (
    id SERIAL PRIMARY KEY,
    thread_id INTEGER REFERENCES forum_threads(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    is_solution BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create forum reply likes table
CREATE TABLE IF NOT EXISTS forum_reply_likes (
    id SERIAL PRIMARY KEY,
    reply_id INTEGER REFERENCES forum_replies(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(reply_id, user_id)
);

-- Create followers table
CREATE TABLE IF NOT EXISTS followers (
    id SERIAL PRIMARY KEY,
    follower_id TEXT NOT NULL,
    following_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower_id, following_id)
);

-- Insert initial forum categories if they don't exist
INSERT INTO forum_categories (name, slug, description, icon, color, position)
SELECT 'React', 'react', 'Discussions about React.js', 'react', '#61dafb', 1
WHERE NOT EXISTS (SELECT 1 FROM forum_categories WHERE slug = 'react');

INSERT INTO forum_categories (name, slug, description, icon, color, position)
SELECT 'Next.js', 'nextjs', 'Next.js framework discussions', 'nextjs', '#ffffff', 2
WHERE NOT EXISTS (SELECT 1 FROM forum_categories WHERE slug = 'nextjs');

INSERT INTO forum_categories (name, slug, description, icon, color, position)
SELECT 'TypeScript', 'typescript', 'TypeScript language discussions', 'typescript', '#3178c6', 3
WHERE NOT EXISTS (SELECT 1 FROM forum_categories WHERE slug = 'typescript');

INSERT INTO forum_categories (name, slug, description, icon, color, position)
SELECT 'Node.js', 'nodejs', 'Node.js backend discussions', 'nodejs', '#68a063', 4
WHERE NOT EXISTS (SELECT 1 FROM forum_categories WHERE slug = 'nodejs');

INSERT INTO forum_categories (name, slug, description, icon, color, position)
SELECT 'DevOps', 'devops', 'DevOps, deployment and infrastructure', 'devops', '#ff6b6b', 5
WHERE NOT EXISTS (SELECT 1 FROM forum_categories WHERE slug = 'devops');

INSERT INTO forum_categories (name, slug, description, icon, color, position)
SELECT 'Career', 'career', 'Career advice and job opportunities', 'briefcase', '#a78bfa', 6
WHERE NOT EXISTS (SELECT 1 FROM forum_categories WHERE slug = 'career');

INSERT INTO forum_categories (name, slug, description, icon, color, position)
SELECT 'General', 'general', 'General discussions', 'megaphone', '#94a3b8', 7
WHERE NOT EXISTS (SELECT 1 FROM forum_categories WHERE slug = 'general');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_project_tags_project_id ON project_tags(project_id);
CREATE INDEX IF NOT EXISTS idx_project_likes_project_id ON project_likes(project_id);
CREATE INDEX IF NOT EXISTS idx_project_likes_user_id ON project_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_project_comments_project_id ON project_comments(project_id);
CREATE INDEX IF NOT EXISTS idx_forum_threads_user_id ON forum_threads(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_threads_category_id ON forum_threads(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_thread_tags_thread_id ON forum_thread_tags(thread_id);
CREATE INDEX IF NOT EXISTS idx_forum_replies_thread_id ON forum_replies(thread_id);
CREATE INDEX IF NOT EXISTS idx_forum_replies_user_id ON forum_replies(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_reply_likes_reply_id ON forum_reply_likes(reply_id);
CREATE INDEX IF NOT EXISTS idx_forum_reply_likes_user_id ON forum_reply_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_followers_follower_id ON followers(follower_id);
CREATE INDEX IF NOT EXISTS idx_followers_following_id ON followers(following_id); 