/**
 * Screen size check for mobile/desktop redirection
 * Uses matchMedia for reliable detection based on viewport width.
 * Redirects only if the current page version doesn't match the screen size.
 */

// Define the media query for desktop size
const desktopMediaQuery = window.matchMedia('(min-width: 1601px)');

function checkScreenSizeAndRedirect() {
  const isDesktop = desktopMediaQuery.matches;
  // Extract the filename from the current URL
  const currentFilename = window.location.pathname.split('/').pop() || 'Mindex.html'; // Default to mobile if path is '/'

  console.log(`Screen check: isDesktop=${isDesktop}, currentFile=${currentFilename}`);

  // --- Redirection Logic ---
  // If screen is wide AND we are currently on the mobile page (Mindex.html)
  if (isDesktop && currentFilename === 'Mindex.html') {
    console.log("Screen is wide, on mobile page. Redirecting to desktop (index.html)...");
    window.location.href = './index.html';
  }
  // If screen is narrow AND we are currently on the desktop page (index.html)
  else if (!isDesktop && currentFilename === 'index.html') {
    console.log("Screen is narrow, on desktop page. Redirecting to mobile (Mindex.html)...");
    window.location.href = './Mindex.html';
  } else {
    console.log("Already on the correct page version for this screen size.");
  }
}

// Run the check once when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', checkScreenSizeAndRedirect);

// Add a listener to the media query to re-check when the viewport size crosses the threshold
// This is more efficient than listening to every resize event.
desktopMediaQuery.addEventListener('change', checkScreenSizeAndRedirect);
