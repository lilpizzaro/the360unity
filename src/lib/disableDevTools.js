/**
 * Disables React DevTools in production environment
 * This prevents users from inspecting and manipulating your React components
 */
export function disableReactDevTools() {
  if (typeof window === 'undefined') return;
  
  // Only run in production
  if (process.env.NODE_ENV === 'production') {
    // Define the __REACT_DEVTOOLS_GLOBAL_HOOK__ with dummy functions
    const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    
    if (typeof devTools === 'object') {
      // Replace all methods with no-op functions
      for (const key in devTools) {
        if (key === 'renderers') {
          // Keep the renderers object but make it empty
          devTools[key] = new Map();
        } else {
          // Replace all other methods with no-op functions
          devTools[key] = typeof devTools[key] === 'function' 
            ? () => {} 
            : null;
        }
      }
    }
    
    console.log('React DevTools have been disabled in production.');
  }
} 