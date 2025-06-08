# Supabase Storage Integration for The360Unity

This document explains how to set up and use Supabase Storage for file uploads in The360Unity.

## Setup Instructions

1. **Run the setup script**

   The setup script will create the necessary storage bucket in your Supabase project:

   ```bash
   # For Windows
   node setup-supabase.js

   # For Linux/Mac
   node setup-supabase.js
   ```

   This will:
   - Create a storage bucket named "projects"
   - Configure the bucket with appropriate permissions
   - Add the storage credentials to your .env.local file

2. **Verify Storage Bucket**

   After running the setup script, verify that the "projects" bucket was created in your Supabase dashboard:
   - Go to your Supabase project dashboard
   - Navigate to "Storage" in the sidebar
   - Confirm that a bucket named "projects" exists

3. **Environment Variables**

   Ensure your `.env.local` file contains the following variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_KEY=your_service_role_key
   SUPABASE_STORAGE_ACCESS_KEY_ID=d163df626469d09c3f29afa4406f9d0a
   SUPABASE_STORAGE_SECRET_ACCESS_KEY=6a24cdc6af0c14d1a6fce27e167fb8ba00425285d1db58907a96629bbd6a5493
   ```

## Features

The Supabase Storage integration provides the following features:

1. **Project File Uploads**
   - Users can upload files to their projects
   - Supported file types: images, PDFs, text files, and archives
   - Maximum file size: 50MB

2. **File Management**
   - View uploaded files in the project detail page
   - Delete files from projects
   - Preview images directly in the browser

3. **Storage Structure**
   - Files are organized by user ID and project ID
   - File path structure: `{userId}/{projectId}/{timestamp}-{filename}`

## Usage

### Uploading Files

1. Create a new project or navigate to an existing project
2. Go to the "Files" tab
3. Drag and drop files or click to select files
4. Files will be uploaded and displayed in the list

### Viewing Files

1. Navigate to a project's detail page
2. Click on the "Files" tab
3. All project files will be displayed
4. Click on a file to view or download it

### Deleting Files

1. Navigate to a project's detail page
2. Click on the "Files" tab
3. Click the delete (X) button next to a file
4. Confirm deletion when prompted

## API Endpoints

The following API endpoints are available for file management:

- `POST /api/projects/files` - Upload a file to a project
- `GET /api/projects/files?projectId={id}` - Get all files for a project
- `DELETE /api/projects/files?projectId={id}&fileUrl={url}` - Delete a file from a project

## Components

The following components are available for file management:

- `ProjectFileUpload` - Component for uploading files to a project
- `ProjectFiles` - Component for displaying project files

## Troubleshooting

If you encounter issues with file uploads:

1. Check that your Supabase storage bucket is properly configured
2. Verify that the file size is under 50MB
3. Ensure the file type is supported
4. Check browser console for any error messages
5. Verify that your environment variables are correctly set

For any other issues, please check the Supabase documentation or open an issue in the project repository. 