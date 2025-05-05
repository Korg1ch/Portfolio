// Mobile/desktop version switching script
function checkWindowWidth() {
    // Using screen.width instead of window.innerWidth to ignore scaling
    const windowWidth = screen.width;
    const currentPage = window.location.pathname.split('/').pop();
    
    // Adding a check to prevent redirect loops
    const isRedirecting = sessionStorage.getItem('redirecting');
    
    if (isRedirecting) {
        sessionStorage.removeItem('redirecting');
        return;
    }
    
    if (windowWidth < 1600) {
        if (currentPage !== 'Mindex.html') {
            sessionStorage.setItem('redirecting', 'true');
            window.location.href = 'Mindex.html';
        }
    } else {
        if (currentPage === 'Mindex.html') {
            sessionStorage.setItem('redirecting', 'true');
            window.location.href = 'index.html';
        }
    }
}

// Reducing check frequency for better performance
setInterval(checkWindowWidth, 500);

// Delay before first check to ensure page is fully loaded
setTimeout(checkWindowWidth, 300);