// ============================================
// Taylor Wall — Minimal interactions
// ============================================

// Scroll reveal
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach((el) => {
        revealObserver.observe(el);
    });

    initCharReveal();
});

// ============================================
// NAV — Scroll effect + active tracking
// ============================================
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
);

sections.forEach((section) => sectionObserver.observe(section));

// ============================================
// SCROLL — Nav glass + progress bar + parallax
// ============================================
const progressBar = document.querySelector('.scroll-progress');
const mountainPaths = document.querySelectorAll('.mountain-svg path');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    const scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight);
    if (progressBar) {
        progressBar.style.transform = `scaleX(${Math.min(scrollPercent, 1)})`;
    }

    if (scrollY < window.innerHeight) {
        mountainPaths.forEach((path, i) => {
            const speed = (i + 1) * 0.015;
            path.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
}, { passive: true });

// ============================================
// SMOOTH ANCHOR SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// CHARACTER REVEAL — Hero title
// ============================================
function initCharReveal() {
    const titleLines = document.querySelectorAll('.hero-title .title-line');
    let globalIndex = 0;

    titleLines.forEach((line) => {
        const text = line.textContent;
        const classes = [...line.classList];
        line.innerHTML = '';

        text.split('').forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${0.2 + globalIndex * 0.025}s`;
            span.classList.add('char');
            line.appendChild(span);
            globalIndex++;
        });

        classes.forEach((cls) => line.classList.add(cls));
    });
}
