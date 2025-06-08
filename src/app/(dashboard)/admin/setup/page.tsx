"use client";

import { useState } from "react";
import DashboardNav from "@/components/DashboardNav";

export default function SetupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);
  
  const setupCollaboration = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setResponse(null);
    
    try {
      const response = await fetch('/api/setup-collab');
      const data = await response.json();
      
      setResponse(data);
      
      if (data.success) {
        setSuccess(data.message);
      } else {
        setError(data.message || "Unknown error occurred");
      }
    } catch (err) {
      console.error("Error setting up collaboration:", err);
      setError("Error setting up collaboration. Check console for details.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <DashboardNav />
      <div className="min-h-screen pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="t-heading-lg mb-4">Admin Setup</h1>
            <p className="t-lg opacity-80">
              Use this page to set up your Supabase database for real-time collaboration.
            </p>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 mb-8">
            <h2 className="t-heading-md mb-4">Collaboration Setup</h2>
            <p className="mb-6 opacity-80">
              This will create the necessary tables in your Supabase database for real-time code collaboration.
              Click the button below to run the setup.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={setupCollaboration}
                disabled={loading}
                className="btn-primary px-4 py-2"
              >
                {loading ? "Setting Up..." : "Setup Collaboration Tables"}
              </button>
              
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-300">
                  <h3 className="font-medium mb-2">Error</h3>
                  <p>{error}</p>
                </div>
              )}
              
              {success && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-300">
                  <h3 className="font-medium mb-2">Success</h3>
                  <p>{success}</p>
                  <p className="mt-2">
                    Try the demo room:{" "}
                    <code className="bg-white/10 px-2 py-1 rounded">
                      room-demo123
                    </code>
                  </p>
                </div>
              )}
              
              {response && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Response Details</h3>
                  <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto text-xs">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <h2 className="t-heading-md mb-4">Troubleshooting</h2>
            <p className="mb-4 opacity-80">
              If you're having issues with the setup, try the following:
            </p>
            
            <ul className="list-disc list-inside space-y-2 opacity-80">
              <li>Check that your Supabase URL and API key are correct in your .env.local file</li>
              <li>Make sure your Supabase service role key has permission to create tables</li>
              <li>Try running the SQL commands directly in the Supabase SQL Editor</li>
              <li>Check the browser console for detailed error messages</li>
              <li>Restart your development server after setup</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
} 