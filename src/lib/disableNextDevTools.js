/**
 * Disables Next.js dev tools overlay in the browser
 */
export function disableNextDevTools() {
  if (typeof window === 'undefined') return;
  
  // Disable Next.js dev tools overlay
  try {
    // Try to access and disable the __NEXT_DEV_OVERLAY_STATE__ if it exists
    if (window.__NEXT_DEV_OVERLAY_STATE__) {
      window.__NEXT_DEV_OVERLAY_STATE__ = {
        ...window.__NEXT_DEV_OVERLAY_STATE__,
        reactDevOverlay: {
          ...window.__NEXT_DEV_OVERLAY_STATE__.reactDevOverlay,
          isEnabled: false,
        },
      };
    }

    // Also try to remove the dev tools element from the DOM if it exists
    const devToolsElement = document.querySelector('[data-nextjs-devtools]');
    if (devToolsElement) {
      devToolsElement.remove();
    }

    // Remove any Next.js related elements with specific class names
    const nextElements = document.querySelectorAll('[data-next-dev-overlay]');
    if (nextElements.length > 0) {
      nextElements.forEach(el => el.remove());
    }

    console.log('Next.js dev tools have been disabled.');
  } catch (error) {
    console.error('Error disabling Next.js dev tools:', error);
  }
} 