/**
 * Mobile scaling script
 * Applies a 0.75 scale factor to the BODY element for better mobile viewing.
 * Ensures proper scrolling and layout.
 */

const SCALE_FACTOR = 0.75;

function setPageScale() {
  const bodyEl = document.body;
  const htmlEl = document.documentElement;
  const mobileContainer = document.querySelector('.mobile'); // Main content wrapper

  if (!mobileContainer) {
    console.error("'.mobile' container not found. Scaling cannot be applied correctly.");
    return;
  }

  // --- Reset styles before applying new ones ---
  htmlEl.style.overflow = '';
  htmlEl.style.height = '';
  bodyEl.style.transform = '';
  bodyEl.style.transformOrigin = '';
  bodyEl.style.width = '';
  bodyEl.style.height = '';
  bodyEl.style.overflow = '';
  bodyEl.style.margin = '';
  bodyEl.style.padding = '';
  // Temporarily allow .mobile container to define its own height based on content
  mobileContainer.style.height = 'auto';

  // --- Calculate actual content height ---
  // Use offsetHeight for visible height or scrollHeight if content overflows
  const contentHeight = mobileContainer.scrollHeight;
  console.log(`Calculated content height: ${contentHeight}px`);

  // --- Apply scaling to BODY ---
  bodyEl.style.transformOrigin = '0 0';
  bodyEl.style.transform = `scale(${SCALE_FACTOR})`;

  // --- Set dimensions ---
  // Body width needs to compensate for the scale
  bodyEl.style.width = `${100 / SCALE_FACTOR}vw`;
  // Body height should be the actual content height
  bodyEl.style.height = `${contentHeight}px`;

  // --- Control Overflow ---
  // HTML element should contain the scaled body without scrolling
  htmlEl.style.overflow = 'hidden';
  // Set the height of the HTML element to the scaled height of the body
  // This defines the viewport area for the scaled content
  htmlEl.style.height = `${contentHeight * SCALE_FACTOR}px`;

  // Body itself should not scroll (scrolling is handled by window/html)
  // but we need to allow overflow for the content *within* the body
  bodyEl.style.overflow = 'visible'; // Allow content to overflow the body's bounds

  // Restore the original CSS height for .mobile if needed,
  // or keep it 'auto' if dynamic height is desired.
  // mobileContainer.style.height = ''; // Or keep 'auto'

  // Ensure body margins don't interfere
  bodyEl.style.margin = '0';
  bodyEl.style.padding = '0';

  // Fix for mobile touch scrolling
  bodyEl.style.touchAction = 'pan-y';

  console.log(`Page scaled to ${SCALE_FACTOR}. HTML height: ${htmlEl.style.height}, Body height: ${bodyEl.style.height}`);
}

// --- Event Listeners ---

// Use window.load to ensure all content (images) is loaded for accurate height calculation
window.addEventListener('load', setPageScale);

// Re-apply scaling on resize/orientation change with debounce
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(setPageScale, 150); // Debounce resize events
});
window.addEventListener('orientationchange', () => {
  setTimeout(setPageScale, 150); // Delay slightly for orientation change
});

// Prevent pinch-zoom gestures
document.addEventListener('touchmove', function(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, { passive: false });

document.addEventListener('gesturestart', function(event) {
  event.preventDefault();
}, { passive: false });
