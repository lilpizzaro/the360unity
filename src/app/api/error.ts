import { NextResponse } from 'next/server';

export function handleApiError(error: Error) {
  console.error('API Error:', error);
  
  return NextResponse.json(
    { 
      error: 'Internal Server Error',
      message: 'The server encountered an error processing your request'
    },
    { status: 500 }
  );
}

export default function GlobalErrorHandler(error: Error) {
  return handleApiError(error);
} 