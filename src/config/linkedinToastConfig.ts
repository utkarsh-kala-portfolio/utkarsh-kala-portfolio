/**
 * Configuration for the LinkedIn Toast Prompt
 */
export const LINKEDIN_TOAST_CONFIG = {
  // Time in seconds to wait on each page before showing the LinkedIn connection prompt
  delaySeconds: 5,

  // If true, clicking the close (X) button dismisses the prompt permanently across all pages (stored in localStorage)
  // If false, dismissal is only temporary for the current page view, and the prompt will load again on other pages
  dismissPermanently: false,
};
