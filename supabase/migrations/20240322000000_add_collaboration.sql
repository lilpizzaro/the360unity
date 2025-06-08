-- Create collaborations table
CREATE TABLE IF NOT EXISTS collaborations (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    owner_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create collaboration_members table
CREATE TABLE IF NOT EXISTS collaboration_members (
    id BIGSERIAL PRIMARY KEY,
    collaboration_id BIGINT NOT NULL REFERENCES collaborations(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'member',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(collaboration_id, user_id)
);

-- Create collaboration_invites table
CREATE TABLE IF NOT EXISTS collaboration_invites (
    id BIGSERIAL PRIMARY KEY,
    collaboration_id BIGINT NOT NULL REFERENCES collaborations(id) ON DELETE CASCADE,
    inviter_id TEXT NOT NULL,
    invitee_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW() + INTERVAL '7 days') NOT NULL,
    UNIQUE(collaboration_id, invitee_id)
);

-- Create collaboration_rooms table
CREATE TABLE IF NOT EXISTS collaboration_rooms (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_by TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Create collaboration_participants table
CREATE TABLE IF NOT EXISTS collaboration_participants (
    id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL REFERENCES collaboration_rooms(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(room_id, user_id)
);

-- Create collaboration_messages table
CREATE TABLE IF NOT EXISTS collaboration_messages (
    id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL REFERENCES collaboration_rooms(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create collaboration_code_snippets table
CREATE TABLE IF NOT EXISTS collaboration_code_snippets (
    id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL REFERENCES collaboration_rooms(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    language TEXT,
    code TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS collaborations_owner_id_idx ON collaborations(owner_id);
CREATE INDEX IF NOT EXISTS collaboration_members_user_id_idx ON collaboration_members(user_id);
CREATE INDEX IF NOT EXISTS collaboration_invites_invitee_id_idx ON collaboration_invites(invitee_id);
CREATE INDEX IF NOT EXISTS collaboration_rooms_created_by_idx ON collaboration_rooms(created_by);
CREATE INDEX IF NOT EXISTS collaboration_participants_user_id_idx ON collaboration_participants(user_id);
CREATE INDEX IF NOT EXISTS collaboration_messages_room_id_idx ON collaboration_messages(room_id);
CREATE INDEX IF NOT EXISTS collaboration_code_snippets_room_id_idx ON collaboration_code_snippets(room_id);

-- Create function to get user's collaboration count
CREATE OR REPLACE FUNCTION get_user_collaboration_count(user_id TEXT)
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(DISTINCT room_id) 
        FROM collaboration_participants 
        WHERE user_id = $1
    );
END;
$$ LANGUAGE plpgsql; 