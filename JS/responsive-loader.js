const BREAKPOINTS = {
    mobile: 900
};

function redirectIfNeeded() {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const path = window.location.pathname.toLowerCase();
    const isMobilePage = path.includes('mindex.html');

    if (!isMobilePage && windowWidth <= BREAKPOINTS.mobile) {
        window.location.replace('Mindex.html');
    } else if (isMobilePage && windowWidth > BREAKPOINTS.mobile) {
        window.location.replace('index.html');
    }
}

document.addEventListener('DOMContentLoaded', redirectIfNeeded);

window.addEventListener('resize', function () {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(redirectIfNeeded, 250);
});