/**
 * Mobile page scaling script
 * Scales the page to 0.5 size for better visibility on mobile devices
 * while preserving functionality and allowing scrolling
 */

// Set the scale factor for the entire page
const SCALE_FACTOR = 0.7;

/**
 * Applies scaling to the page content without affecting scrolling
 * Uses a simplified approach that applies transform directly to the body
 */
function setPageScale() {
  // Apply scaling transformation to the body element
  document.body.style.transformOrigin = '0 0';
  document.body.style.transform = `scale(${SCALE_FACTOR})`;
  
  // Allow vertical scrolling but prevent horizontal scrolling
  document.body.style.overflow = 'hidden auto';
  document.documentElement.style.overflow = 'hidden';
  
  // Compensate for the scaling by increasing dimensions
  // This ensures the scaled content fills the viewport properly
  document.body.style.height = (100/SCALE_FACTOR) + 'vh';
  document.body.style.width = (100/SCALE_FACTOR) + 'vw';
  
  // Remove margins and padding to prevent unwanted space
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  
  console.log('Mobile scaling applied at factor:', SCALE_FACTOR);
}

// Apply scaling when DOM content is fully loaded
document.addEventListener('DOMContentLoaded', setPageScale);

/**
 * Prevent multi-touch zoom gestures but allow scrolling
 * This ensures the page maintains its set scale
 */
document.addEventListener('touchmove', function(e) {
  // If this is a multi-touch event (pinch to zoom)
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

// Re-apply scaling after any window resize event
window.addEventListener('resize', setPageScale);
