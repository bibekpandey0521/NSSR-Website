// nav.js

const initMobileMenu = () => {
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            menu.classList.toggle('active');
        };

        // Handle dropdowns inside the mobile menu
        const dropdownBtns = menu.querySelectorAll('.dropdown-arrow-btn');
        dropdownBtns.forEach(dropBtn => {
            dropBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                // Find nearest dropdown menu
                const dropdownMenu = dropBtn.closest('.nav-dropdown-item').querySelector('.nav-dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.classList.toggle('mobile-open');
                    dropBtn.style.transform = dropdownMenu.classList.contains('mobile-open') ? 'rotate(180deg)' : 'rotate(0)';
                }
            };
        });

        document.addEventListener('click', (e) => {
            // Close menu if clicking outside
            if (menu.classList.contains('active')) {
                if (!menu.contains(e.target) && e.target !== btn) {
                    menu.classList.remove('active');
                    // Reset dropdown states
                    document.querySelectorAll('.nav-dropdown-menu').forEach(d => d.classList.remove('mobile-open'));
                    document.querySelectorAll('.dropdown-arrow-btn').forEach(b => b.style.transform = 'rotate(0)');
                }
            }
        });
    }
};

// --- Scroll to Hide Logic ---
let lastScrollTop = 0;
const initScrollHide = () => {
    const navPlaceholder = document.getElementById('nav-placeholder');

    window.addEventListener('scroll', () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;

        // If scrolling down and past the navbar height, hide it
        if (st > lastScrollTop && st > 100) {
            navPlaceholder.classList.add('nav-hidden');

            // Also close mobile menu if it's open when scrolling
            const menu = document.getElementById('mobile-menu');
            if (menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        }
        // If scrolling up, show it
        else {
            navPlaceholder.classList.remove('nav-hidden');
        }

        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, { passive: true });
};

const loadNSSRComponents = async () => {
    // Load Nav
    const navSpace = document.getElementById('nav-placeholder');
    if (navSpace) {
        try {
            const response = await fetch('nav.html?v=' + Date.now());
            const html = await response.text();
            navSpace.innerHTML = html;

            initMobileMenu();
            initScrollHide(); // Initialize scroll behavior after nav is loaded
        } catch (err) { console.error("Nav error:", err); }
    }

    // Load Footer
    const footerSpace = document.getElementById('footer-placeholder');
    if (footerSpace) {
        try {
            const response = await fetch('footer.html?v=' + Date.now());
            const html = await response.text();
            footerSpace.innerHTML = html;
        } catch (err) { console.error("Footer error:", err); }
    }
};

document.addEventListener('DOMContentLoaded', loadNSSRComponents);