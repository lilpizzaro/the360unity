-- Create followers table
CREATE TABLE IF NOT EXISTS followers (
    id BIGSERIAL PRIMARY KEY,
    follower_id TEXT NOT NULL,
    following_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(follower_id, following_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS followers_follower_id_idx ON followers(follower_id);
CREATE INDEX IF NOT EXISTS followers_following_id_idx ON followers(following_id);

-- Create function to get user's followers count
CREATE OR REPLACE FUNCTION get_followers_count(user_id TEXT)
RETURNS INTEGER AS $$
BEGIN
    RETURN (SELECT COUNT(*) FROM followers WHERE following_id = user_id);
END;
$$ LANGUAGE plpgsql;

-- Create function to get user's following count
CREATE OR REPLACE FUNCTION get_following_count(user_id TEXT)
RETURNS INTEGER AS $$
BEGIN
    RETURN (SELECT COUNT(*) FROM followers WHERE follower_id = user_id);
END;
$$ LANGUAGE plpgsql;

-- Create function to check if a user is following another user
CREATE OR REPLACE FUNCTION is_following(follower_id TEXT, following_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM followers 
        WHERE follower_id = $1 AND following_id = $2
    );
END;
$$ LANGUAGE plpgsql; 