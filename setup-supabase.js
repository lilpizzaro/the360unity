#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { createClient } = require('@supabase/supabase-js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask questions
const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log('🚀 Setting up Supabase for The360Unity');
  console.log('-------------------------------------');
  
  // Get Supabase URL and key
  console.log('\n📋 Please provide your Supabase credentials:');
  const supabaseUrl = await askQuestion('Supabase URL: ');
  const supabaseKey = await askQuestion('Supabase API Key (service_role key): ');
  
  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Test connection
    console.log('\n🔄 Testing connection to Supabase...');
    let testData, testError;
    
    try {
      const response = await supabase.from('_test').select('*').limit(1);
      testData = response.data;
      testError = response.error;
    } catch (err) {
      testError = { message: 'Connection failed: ' + err.message };
    }
    
    if (testError) {
      console.log('❌ Connection failed. Please check your credentials and try again.');
      console.log(`Error: ${testError.message}`);
      console.log('\n🔧 As an alternative, you can manually run the SQL commands from supabase-schema.sql in the Supabase SQL editor.');
      process.exit(1);
    }
    
    console.log('✅ Connection successful!');
    
    // Read SQL file
    console.log('\n📄 Reading schema file...');
    const schemaPath = path.join(__dirname, 'supabase-schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute SQL
    console.log('🔄 Creating database schema...');
    const { error: schemaError } = await supabase.rpc('exec_sql', { sql: schemaSql });
    
    if (schemaError) {
      console.log('❌ Failed to create schema.');
      console.log(`Error: ${schemaError.message}`);
      console.log('\n🔧 You may need to manually run the SQL commands from supabase-schema.sql in the Supabase SQL editor.');
    } else {
      console.log('✅ Database schema created successfully!');
    }
    
    // Create storage bucket
    console.log('\n🔄 Creating storage bucket for project files...');
    
    try {
      const { data: bucketData, error: bucketError } = await supabase.storage.createBucket('projects', {
        public: true,
        fileSizeLimit: 52428800, // 50MB
        allowedMimeTypes: ['image/*', 'application/pdf', 'text/*', 'application/zip']
      });
      
      if (bucketError) {
        console.log('❌ Failed to create storage bucket.');
        console.log(`Error: ${bucketError.message}`);
        console.log('\n🔧 You may need to manually create a storage bucket named "projects" in the Supabase dashboard.');
      } else {
        console.log('✅ Storage bucket created successfully!');
      }
    } catch (bucketError) {
      console.log('❌ Failed to create storage bucket.');
      console.log(`Error: ${bucketError.message}`);
      console.log('\n🔧 You may need to manually create a storage bucket named "projects" in the Supabase dashboard.');
    }
    
    // Create .env file with Supabase credentials
    console.log('\n📝 Creating .env.local file with Supabase credentials...');
    
    const envContent = `NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseKey}
SUPABASE_KEY=${supabaseKey}
SUPABASE_STORAGE_ACCESS_KEY_ID=d163df626469d09c3f29afa4406f9d0a
SUPABASE_STORAGE_SECRET_ACCESS_KEY=6a24cdc6af0c14d1a6fce27e167fb8ba00425285d1db58907a96629bbd6a5493
`;
    
    fs.writeFileSync('.env.local', envContent);
    console.log('✅ .env.local file created successfully!');
    
    // Final instructions
    console.log('\n🎉 Setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Start your development server: npm run dev');
    console.log('2. Open your browser at: http://localhost:3000');
    console.log('\n🔐 Note: Make sure you have configured Clerk authentication as well.');
    console.log('\n📚 For more information, check the README.md file.');
    
  } catch (error) {
    console.error('❌ An unexpected error occurred:', error);
  } finally {
    rl.close();
  }
}

main(); 