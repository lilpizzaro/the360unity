"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isChangingRoute, setIsChangingRoute] = useState(false);

  // Remove any extension-added attributes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
    
    // Clean up any attributes added by browser extensions
    const htmlElement = document.documentElement;
    const attributesToRemove = [];
    
    // Find all attributes that might be added by browser extensions
    for (let i = 0; i < htmlElement.attributes.length; i++) {
      const attr = htmlElement.attributes[i];
      if (attr.name.includes('-injected') || 
          attr.name.startsWith('data-') && !attr.name.startsWith('data-react-') ||
          attr.name.includes('tooltip') ||
          attr.name.includes('extension')) {
        attributesToRemove.push(attr.name);
      }
    }
    
    // Remove identified attributes
    attributesToRemove.forEach(attr => {
      htmlElement.removeAttribute(attr);
    });

    // Hide loading screen when app is initially loaded
    const loadingEl = document.getElementById('app-loading');
    if (loadingEl) {
      loadingEl.style.opacity = '0';
      setTimeout(() => {
        loadingEl.style.display = 'none';
      }, 500);
    }
  }, []);

  // Handle route changes to show/hide loading screen
  useEffect(() => {
    setIsChangingRoute(true);
    
    // Hide loading after a short delay to allow the new page to render
    const timer = setTimeout(() => {
      setIsChangingRoute(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // Show/hide loading screen on route changes
  useEffect(() => {
    const loadingEl = document.getElementById('app-loading');
    if (!loadingEl) return;
    
    if (isChangingRoute) {
      loadingEl.style.display = 'flex';
      setTimeout(() => {
        loadingEl.style.opacity = '1';
      }, 0);
    } else {
      loadingEl.style.opacity = '0';
      setTimeout(() => {
        loadingEl.style.display = 'none';
      }, 500);
    }
  }, [isChangingRoute]);

  return <div className="antialiased">{children}</div>;
}
