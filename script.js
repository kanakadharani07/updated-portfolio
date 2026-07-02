document.addEventListener('DOMContentLoaded', () => {

    /* ═══════════ SPOTLIGHT CURSOR ═══════════ */
    const spotlight = document.getElementById('spotlight');
    if (spotlight && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            spotlight.style.left = e.clientX + 'px';
            spotlight.style.top = e.clientY + 'px';
        });
    }

    /* ═══════════ SCROLL PROGRESS BAR ═══════════ */
    const progressFill = document.getElementById('progress-fill');
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressFill) progressFill.style.width = percent + '%';
    };
    window.addEventListener('scroll', updateProgress);

    /* ═══════════ NAVIGATION — SCROLL STATE & ACTIVE ═══════════ */
    const nav = document.getElementById('glass-nav');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Glass Nav background
        if (nav) {
            nav.classList.toggle('scrolled', window.scrollY > 60);
        }

        // Active nav item
        let current = '';
        sections.forEach((sec) => {
            const top = sec.offsetTop - 200;
            if (window.scrollY >= top) {
                current = sec.getAttribute('id');
            }
        });
        navItems.forEach((item) => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === current) {
                item.classList.add('active');
            }
        });
    });

    /* ═══════════ MOBILE MENU ═══════════ */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        navItems.forEach((item) => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    /* ═══════════ SCROLL REVEAL ANIMATION ═══════════ */
    const revealEls = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));

    /* ═══════════ CIRCULAR PROGRESS ANIMATION ON SCROLL ═══════════ */
    const circleCards = document.querySelectorAll('.orbit-card');

    const circleObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const fill = entry.target.querySelector('.circle-fill');
                    if (fill) {
                        // The stroke-dasharray is already set inline; 
                        // we animate from 0 by removing initial override
                        const target = fill.style.strokeDasharray;
                        fill.style.strokeDasharray = '0 100';
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                fill.style.strokeDasharray = target;
                            });
                        });
                    }
                    circleObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    circleCards.forEach((card) => circleObserver.observe(card));

    /* ═══════════ SHOW MORE / SHOW LESS PROJECTS ═══════════ */
    const projectsExtra = document.getElementById('projects-extra');
    const projectsToggle = document.getElementById('projects-toggle');

    if (projectsExtra && projectsToggle) {
        projectsToggle.addEventListener('click', () => {
            const isExpanded = projectsExtra.classList.toggle('expanded');
            projectsToggle.classList.toggle('expanded', isExpanded);
            projectsToggle.querySelector('span').textContent = isExpanded
                ? 'Show Less'
                : 'Show More Projects';

            if (isExpanded) {
                // Reveal newly shown cards with the same scroll-reveal animation
                projectsExtra.querySelectorAll('.pj-card').forEach((card) => {
                    card.classList.add('scroll-reveal', 'visible');
                });
            } else {
                // Smoothly return to the Projects section heading when collapsing
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    /* ═══════════ CONTACT FORM ═══════════ */
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-send');
            const original = btn.innerHTML;

            btn.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Sent! <i class="bx bx-check-circle"></i>';
                btn.style.background = 'linear-gradient(135deg, #4ECDC4, #45B7AA)';
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

});