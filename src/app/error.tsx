'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black text-white">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold">Something went wrong</h1>
        <p className="text-lg text-gray-400">
          We're sorry, but there was an error loading this page.
        </p>
        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Return to home
          </Link>
        </div>
      </div>
    </div>
  );
} 