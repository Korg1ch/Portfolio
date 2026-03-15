const BREAKPOINTS = {
    mobileMax: 1599,
    desktopMin: 1600
};

const PAGE_CONFIG = {
    desktop: {
        selector: '.page-en',
        width: 1920,
        height: 2999
    },
    mobile: {
        selector: '.mobile',
        width: 720,
        height: 5472
    }
};

function getWindowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function getCurrentPageType() {
    const path = window.location.pathname.toLowerCase();
    return path.includes('mindex.html') ? 'mobile' : 'desktop';
}

function applyScale(pageType, windowWidth) {
    const pageConfig = PAGE_CONFIG[pageType];
    const pageRoot = document.querySelector(pageConfig.selector);

    if (!pageRoot) {
        return;
    }

    const scale = Math.min(1, windowWidth / pageConfig.width);
    const scaledHeight = Math.round(pageConfig.height * scale);

    pageRoot.style.zoom = String(scale);

    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.body.style.minHeight = `${scaledHeight}px`;
}

function redirectIfNeeded(pageType, windowWidth) {
    if (pageType === 'desktop' && windowWidth <= BREAKPOINTS.mobileMax) {
        window.location.replace('Mindex.html');
        return true;
    }

    if (pageType === 'mobile' && windowWidth >= BREAKPOINTS.desktopMin) {
        window.location.replace('index.html');
        return true;
    }

    return false;
}

function handleResponsive() {
    const windowWidth = getWindowWidth();
    const pageType = getCurrentPageType();

    if (redirectIfNeeded(pageType, windowWidth)) {
        return;
    }

    applyScale(pageType, windowWidth);
}

document.addEventListener('DOMContentLoaded', function () {
    handleResponsive();
});

window.addEventListener('resize', function () {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(handleResponsive, 120);
});