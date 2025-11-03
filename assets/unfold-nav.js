function calculateExpandedHeight() {
    const header = document.querySelector('.header');
    const inlineMenu = document.querySelector('.header__inline-menu.unfold-menu');
    const headerHeight = header.offsetHeight;
    const menuHeight = inlineMenu.scrollHeight;
    return headerHeight + menuHeight;
}

function toggleNav() {
    const headerWrapper = document.getElementById('header');
    const header = document.querySelector('.header');
    const menuIcon = document.querySelector('.menu-icon');
  
    if (headerWrapper.classList.contains('expanded')) {
        // Closing - back to original height
        menuIcon.style.transform = 'rotate(' + 0 + 'deg)'
        headerWrapper.style.height = header.offsetHeight + 'px';
        headerWrapper.classList.remove('expanded');
    } else {
        // Opening - calculate total needed height
        menuIcon.style.transform = 'rotate(' + 180 + 'deg)'
        headerWrapper.classList.add('expanded');
        headerWrapper.style.height = calculateExpandedHeight() + 'px';
    }
}

// Recalculate height on window resize (only if menu is expanded)
window.addEventListener('resize', function() {
    const headerWrapper = document.getElementById('header');
    
    if (headerWrapper.classList.contains('expanded')) {
        headerWrapper.style.height = calculateExpandedHeight() + 'px';
    }
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const headerWrapper = document.getElementById('header');
    const toggle = document.querySelector('.menu-toggle');
    const menuIcon = document.querySelector('.menu-icon')
    
    if (!headerWrapper.contains(event.target) && headerWrapper.classList.contains('expanded')) {
        const header = document.querySelector('.header');
        menuIcon.style.transform = 'rotate(' + 0 + 'deg)';
        headerWrapper.style.height = header.offsetHeight + 'px';
        headerWrapper.classList.remove('expanded');
    }
});

// Close menu on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const headerWrapper = document.getElementById('header');
        const menuIcon = document.querySelector('.menu-icon')
        if (headerWrapper.classList.contains('expanded')) {
            const header = document.querySelector('.header');
            menuIcon.style.transform = 'rotate(' + 0 + 'deg)';
            headerWrapper.style.height = header.offsetHeight + 'px';
            headerWrapper.classList.remove('expanded');
        }
    }
});