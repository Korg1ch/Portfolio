// Mobile/desktop version switching script for hosting compatibility
function checkWindowWidth() {
    try {
        // Simple width detection that works more consistently across hosting environments
        const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        
        // Get current URL and check which page we're on - more reliable for hosting
        const currentUrl = window.location.href.toLowerCase();
        const isMobilePage = currentUrl.indexOf('mindex.html') > -1;
        const isMainPage = !isMobilePage && (currentUrl.indexOf('index.html') > -1 || currentUrl.endsWith('/') || currentUrl.endsWith('/portfolio'));
        
        console.log("Width: " + windowWidth + ", Mobile page: " + isMobilePage + ", Main page: " + isMainPage);
        
        // Simple redirect logic with no session storage dependency
        if (windowWidth < 1600) {
            if (!isMobilePage) {
                console.log("Redirecting to mobile version");
                window.location.replace('Mindex.html');
            }
        } else {
            if (isMobilePage) {
                console.log("Redirecting to desktop version");
                window.location.replace('index.html');
            }
        }
    } catch (error) {
        console.error("Redirection error:", error);
    }
}

// Run once when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkWindowWidth, 300);
});

// Add window resize listener - more reliable than setInterval
window.addEventListener('resize', function() {
    // Using debounce to prevent frequent checks
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(checkWindowWidth, 250);
});