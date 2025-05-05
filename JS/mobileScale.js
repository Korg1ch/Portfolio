/**
 * Mobile scaling script
 * Applies a 0.75 scale factor to the page for better mobile viewing experience
 * while maintaining scrollability and proper layout
 */

// Set the scale factor to 0.75 as requested
const SCALE_FACTOR = 0.75;

/**
 * Applies scaling transformation to the page
 * Uses transform to scale content without affecting the underlying structure
 */
function setPageScale() {
  // Apply transform with origin at top-left corner
  document.body.style.transformOrigin = '0 0';
  document.body.style.transform = `scale(${SCALE_FACTOR})`;
  
  // Set proper dimensions to accommodate the scaled content
  document.body.style.width = `${100/SCALE_FACTOR}%`;
  document.body.style.minHeight = `${100/SCALE_FACTOR}%`;
  
  // Enable vertical scrolling but prevent horizontal overflow
  document.body.style.overflowX = 'hidden';
  document.body.style.overflowY = 'auto';
  
  // Remove default margins to prevent unwanted spacing
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  
  // Fix for mobile browsers - ensure proper touch behavior
  document.body.style.touchAction = 'pan-y';
  
  console.log(`Page scaled to ${SCALE_FACTOR} factor`);
  
  // Ensure footer is properly visible after scaling
  fixFooterPosition();
}

/**
 * Helper function to ensure footer is properly positioned
 * after the page has been scaled
 */
function fixFooterPosition() {
  // Find the footer element
  const footerElement = document.querySelector('.footer-the-end');
  if (!footerElement) return;
  
  // Calculate footer position after scaling and adjust if needed
  const footerPosition = footerElement.getBoundingClientRect().bottom;
  const desiredHeight = (footerPosition * SCALE_FACTOR) + 100; // Add some padding
  
  // Set minimum document height to ensure footer is visible
  document.documentElement.style.minHeight = desiredHeight + 'px';
}

// Apply scaling when DOM is loaded
document.addEventListener('DOMContentLoaded', setPageScale);

// Reapply when window is resized (orientation change, etc.)
window.addEventListener('resize', function() {
  // Use a debounce technique to prevent excessive recalculation
  clearTimeout(window.resizeTimer);
  window.resizeTimer = setTimeout(setPageScale, 250);
});

// Prevent pinch-zoom gestures which would interfere with our scaling
document.addEventListener('touchmove', function(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, { passive: false });

// Fix for iOS Safari and some Android browsers
document.addEventListener('gesturestart', function(event) {
  event.preventDefault();
}, { passive: false });
