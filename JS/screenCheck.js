/**
 * Screen size check for mobile/desktop redirection
 * Checks the actual device screen width and redirects to desktop version if needed
 */

// Check if the current device's screen is larger than the mobile threshold
function checkScreenSize() {
  // Use the physical screen width to get more accurate results
  const realScreenWidth = window.screen.width;
  
  // Debug information
  console.log("Screen width detected: " + realScreenWidth + "px");
  
  // Redirect to desktop version if screen is too large (over 1600px)
  if (realScreenWidth > 1600) {
    console.log("Large screen detected, redirecting to desktop version");
    window.location.href = './index.html';
  } else {
    console.log("Mobile view is appropriate for this screen size");
  }
}

// Run the check when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', checkScreenSize);

// Also check when device orientation changes
window.addEventListener('orientationchange', function() {
  // Add slight delay to ensure screen dimensions are updated
  setTimeout(checkScreenSize, 100);
});
