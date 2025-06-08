"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
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
  }, []);

  return <div className="antialiased">{children}</div>;
}
