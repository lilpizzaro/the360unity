# The360Unity - Developer Community Platform

The360Unity is a community platform designed for developers to share projects, collaborate, learn, and grow together. Whether you're a beginner or experienced developer, you'll find valuable connections and opportunities here.

## Features

- **User Authentication**: Secure login and registration with Clerk
- **Developer Profiles**: Create and customize your developer profile with skills and contact info
- **Project Showcase**: Share your projects and get feedback from the community
- **Community Forum**: Engage in discussions with other developers
- **Real-time Collaboration**: Connect with other developers for pair programming
- **File Storage**: Upload project files, screenshots, and resources using Supabase Storage
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Database & Storage**: Supabase (PostgreSQL + Object Storage)
- **Deployment**: Vercel/Netlify

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/the360unity.git
   cd the360unity
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Create a `.env.local` file in the root directory:
   ```
   # Clerk Authentication Keys
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Next.js
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_KEY=your_supabase_service_role_key
   SUPABASE_STORAGE_ACCESS_KEY_ID=your_storage_access_key_id
   SUPABASE_STORAGE_SECRET_ACCESS_KEY=your_storage_secret_access_key
   ```

4. Set up the database and storage:
   ```bash
   node setup-supabase.js
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Production Deployment

### Building for Production

To build the application for production:

```bash
npm run build
# or
bun run build
```

To start the production server:

```bash
npm run start
# or
bun run start
```

### Deploying to Vercel

1. Create a Vercel account if you don't have one at [vercel.com](https://vercel.com)
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Login to Vercel:
   ```bash
   vercel login
   ```
4. Deploy the project:
   ```bash
   vercel --prod
   ```
5. Set up environment variables in the Vercel dashboard:
   - Go to your project settings
   - Add the environment variables from your `.env.local` file

### Deploying to Netlify

1. Create a Netlify account if you don't have one at [netlify.com](https://netlify.com)
2. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
3. Login to Netlify:
   ```bash
   netlify login
   ```
4. Deploy the project:
   ```bash
   netlify deploy --prod
   ```
5. Set up environment variables in the Netlify dashboard:
   - Go to your project settings > Build & deploy > Environment
   - Add the environment variables from your `.env.local` file

## Project Structure

- `src/app`: Next.js app router pages and layouts
  - `src/app/(dashboard)`: Dashboard and authenticated routes
  - `src/app/api`: API routes for forum and projects
- `src/components`: Reusable React components
  - `src/components/icons`: SVG icon components
- `src/lib`: Utility functions and shared code

## Features Implementation

### User Profiles
Users can create and customize their developer profiles with:
- Profile picture (via Clerk)
- Bio and job title
- Skills and technologies
- Social media links
- Location

### Projects
Users can share their projects with:
- Project title and description
- Technologies used
- Repository link
- Live demo link
- Project status
- Project files and screenshots (via Supabase Storage)

### Forum
The community forum allows users to:
- Create discussion threads
- Reply to existing threads
- Filter discussions by category
- Search for specific topics
- Tag discussions for better organization

### Storage
The project uses Supabase Storage for file management:
- Upload project files (images, PDFs, archives, etc.)
- Organize files by project
- Preview images directly in the browser
- Secure access control based on user ownership

For detailed information about the storage implementation, see [SUPABASE-STORAGE.md](SUPABASE-STORAGE.md).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
