import { createClient } from '@supabase/supabase-js';

// Use environment variables from .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_KEY || '';

// Create Supabase client - use service role key for server-side API routes
const isServer = typeof window === 'undefined';
const supabaseKey = isServer ? supabaseServiceRoleKey : supabaseAnonKey;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Storage configuration from environment variables
export const storageConfig = {
  accessKeyId: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_ACCESS_KEY || process.env.SUPABASE_STORAGE_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_SECRET_KEY || process.env.SUPABASE_STORAGE_SECRET_ACCESS_KEY || ''
};

// Storage helper functions
export const uploadProjectFile = async (file: File, projectId: number, userId: string): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/${projectId}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('projects')
      .upload(filePath, file);
      
    if (error) throw error;
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('projects')
      .getPublicUrl(filePath);
      
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const getProjectFiles = async (projectId: number, userId: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase.storage
      .from('projects')
      .list(`${userId}/${projectId}`);
      
    if (error) throw error;
    
    return data.map(file => {
      const { data: urlData } = supabase.storage
        .from('projects')
        .getPublicUrl(`${userId}/${projectId}/${file.name}`);
      return urlData.publicUrl;
    });
  } catch (error) {
    console.error('Error getting project files:', error);
    return [];
  }
};

export type ForumPost = {
  id: number;
  title: string;
  content: string;
  author_id: string;
  author_name: string;
  author_image_url: string;
  category: string;
  category_name: string;
  views: number;
  created_at: string;
  last_activity: string;
  last_author: string;
  pinned: boolean;
  solved: boolean;
  tags: string[];
};

export type ForumComment = {
  id: number;
  post_id: number;
  content: string;
  author_id: string;
  author_name: string;
  author_image_url: string;
  created_at: string;
  is_solution: boolean;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  author_id: string;
  author_name: string;
  author_image_url: string;
  technologies: string[];
  repo_url: string;
  demo_url: string;
  category: string;
  category_name: string;
  status: string;
  stars: number;
  forks: number;
  views: number;
  created_at: string;
  featured: boolean;
  files?: string[]; // URLs to project files
}; 