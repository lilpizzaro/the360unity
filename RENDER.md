# Deploying to Render

## Setup

1. Create a new Web Service in Render
2. Connect your repository
3. Use the following settings:

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
npm start
```

## Environment Variables

Add these environment variables in the Render dashboard:

- CLERK_SECRET_KEY
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_KEY
- SUPABASE_STORAGE_ACCESS_KEY_ID
- SUPABASE_STORAGE_SECRET_ACCESS_KEY

## Troubleshooting

If you encounter any issues:

1. Check the Render logs
2. Make sure all environment variables are set correctly
3. Try redeploying the application 