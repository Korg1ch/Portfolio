/**
 * Check if the screen width is too large for mobile view
 * If width is greater than 1600px, redirect to desktop version
 */
function checkScreenSize() {
  // Check if screen width exceeds the mobile threshold
  if (window.innerWidth > 1600) {
    window.location.href = './index.html';
  }
}

// Run check on page load
document.addEventListener('DOMContentLoaded', checkScreenSize);

// Also run check when window is resized
window.addEventListener('resize', checkScreenSize);
