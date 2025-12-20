import Clarity from '@microsoft/clarity';
/**
 * Microsoft Clarity Project ID
 * 
 * To set up Clarity:
 * 1. Sign up at https://clarity.microsoft.com/
 * 2. Create a project and get your Project ID
 * 3. Set the environment variable VITE_CLARITY_PROJECT_ID in your .env file
 *    Example: VITE_CLARITY_PROJECT_ID=your-project-id-here
 * 
 * Clarity will only initialize after user consent via the cookie consent banner.
 */
const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID || "uofdqb6xjv";

let clarityInitialized = false;

/**
 * Initialize Microsoft Clarity analytics
 * Should only be called after user consent
 */
export function initializeClarity() {
  if (clarityInitialized || !CLARITY_PROJECT_ID) {
    return;
  }

  try {
    Clarity.init(CLARITY_PROJECT_ID);
    clarityInitialized = true;
    
    // If Clarity is already loaded (e.g., via script tag), also set consent
    if (typeof window !== 'undefined' && (window as any).Clarity) {
      (window as any).Clarity.consentV2({ ad_Storage: 'denied', analytics_Storage: 'granted' });
      ;
    }
  } catch (error) {
    console.error("Failed to initialize Clarity:", error);
  }
}

/**
 * Check if Clarity should be initialized based on cookie consent
 */
export function checkAndInitializeClarity() {
  const consentGiven = localStorage.getItem("wendiradcom-cookie-consent");
  if (consentGiven === "accepted") {
    initializeClarity();
  }
}

/**
 * Track a custom event in Clarity
 * Only tracks if Clarity is initialized
 */
export function trackClarityEvent(eventName: string) {
  if (!clarityInitialized) {
    return;
  }

  try {
    Clarity.event(eventName);
    Clarity.upgrade(eventName);
  } catch (error) {
    console.error("Failed to track Clarity event:", error);
  }
}

