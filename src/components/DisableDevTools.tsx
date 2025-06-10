'use client';

import { useEffect } from 'react';
import DisableDevtool from 'disable-devtool';

export default function DisableDevTools() {
  useEffect(() => {
    // Only run in production or when explicitly enabled
    if (window.location.hostname === 'localhost' && 
        !window.location.search.includes('block_devtools=true')) {
      return;
    }
    
    try {
      // Initialize disable-devtool with less aggressive configuration
      DisableDevtool({
        // Basic configuration
        disableMenu: true, // Disable right-click menu
        disableSelect: false, // Allow text selection
        disableCopy: false, // Allow copy
        disableCut: false, // Allow cut
        disablePaste: false, // Allow paste
        clearLog: true, // Clear console logs
        
        // Use selected detectors that are less likely to cause issues
        detectors: [
          DisableDevtool.DetectorType.RegToString,
          DisableDevtool.DetectorType.DefineId,
          DisableDevtool.DetectorType.DateToString,
          DisableDevtool.DetectorType.FuncToString
        ],
        
        // Longer interval for less aggressive detection
        interval: 2000,
        
        // Custom action when devtools is opened
        ondevtoolopen: (type, next) => {
          console.clear();
          alert('Developer tools are not allowed on this site.');
          
          // Redirect instead of clearing page content
          window.location.href = '/';
        }
      });
    } catch (error) {
      // Silent fail in case of errors
      console.error('Error initializing devtool protection', error);
    }
    
    // Block F12 key and other shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') || 
        (e.ctrlKey && e.shiftKey && e.key === 'J') || 
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        return false;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // This component doesn't render anything
} 