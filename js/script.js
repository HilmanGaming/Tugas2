// script.js - Mobile menu toggle and dynamic PC builder price

document.addEventListener('DOMContentLoaded', () => {
    // ---------- MOBILE MENU TOGGLE ----------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            // change icon (optional)
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // close menu when clicking a link (smooth)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // close on click outside (optional)
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !hamburger.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ---------- DYNAMIC PC BUILDER PRICE ----------
    const cpuSelect = document.getElementById('cpuSelect');
    const gpuSelect = document.getElementById('gpuSelect');
    const ramSelect = document.getElementById('ramSelect');
    const totalSpan = document.getElementById('totalPrice');

    // base price for case, motherboard, PSU, storage (fixed)
    const BASE_PRICE = 1600;  // includes case, AIO, SSD, motherboard, etc.

    function updateTotal() {
        // get selected values (as numbers)
        const cpuPrice = parseInt(cpuSelect.value) || 0;
        const gpuPrice = parseInt(gpuSelect.value) || 0;
        const ramPrice = parseInt(ramSelect.value) || 0;

        const total = BASE_PRICE + cpuPrice + gpuPrice + ramPrice;

        // format as USD currency
        totalSpan.textContent = `$${total.toLocaleString()}`;

        // optional: add a subtle animation effect
        totalSpan.style.transform = 'scale(1.1)';
        setTimeout(() => totalSpan.style.transform = 'scale(1)', 100);
    }

    // add event listeners
    if (cpuSelect && gpuSelect && ramSelect && totalSpan) {
        cpuSelect.addEventListener('change', updateTotal);
        gpuSelect.addEventListener('change', updateTotal);
        ramSelect.addEventListener('change', updateTotal);

        // initial calculation
        updateTotal();
    }

    // ---------- (OPTIONAL) subtle hover animation for product cards via JS? already in CSS. 
    // But we can add a small loading effect? no need.

    // ---------- active nav highlight on scroll (simple) ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function highlightNav() {
        let scrollY = window.scrollY;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    // trigger once
    highlightNav();

    // small loading animation simulation? not needed but we can add a subtle fade-in on body
    document.body.style.animation = 'fadeIn 0.5s';
    // add keyframe via JS if needed, but we can define in CSS. I'll include in CSS.
    // (already in CSS as global transition)
});
