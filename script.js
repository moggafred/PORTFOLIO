// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            navMenu?.classList.remove('is-open');
            hamburger?.setAttribute('aria-expanded', 'false');
            hamburger?.setAttribute('aria-label', 'Open navigation menu');
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (navMenu) {
            const isOpen = navMenu.classList.toggle('is-open');
            hamburger.setAttribute('aria-expanded', String(isOpen));
            hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        }
    });
}

// Back to top button functionality
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn?.classList.remove('hidden');
    } else {
        backToTopBtn?.classList.add('hidden');
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Active navigation link highlighting
const updateActiveLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.skill-tag, .project-card, .highlight-card, .timeline-content, .info-item'
);

animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.borderBottomColor = 'rgba(6, 182, 212, 0.2)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.borderBottomColor = 'rgba(148, 163, 184, 0.1)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formStatus = document.getElementById('formStatus');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value.trim() || 'Portfolio enquiry';
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !email || !message) return;

        if (formStatus) {
            formStatus.textContent = 'Opening your email app with the message prepared…';
        }

        if (submitButton) submitButton.disabled = true;
        const body = `Hello Mogga,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
        window.location.href = `mailto:fred.ict2020@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.setTimeout(() => {
            if (submitButton) submitButton.disabled = false;
            if (formStatus) formStatus.textContent = 'Your email app should now be open. Please send the prepared message.';
        }, 600);
    });
}

// The logo acts as a quick route back to the introduction.
const logo = document.querySelector('.logo');
if (logo) {
    logo.setAttribute('role', 'button');
    logo.setAttribute('tabindex', '0');
    const goHome = () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    logo.addEventListener('click', goHome);
    logo.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            goHome();
        }
    });
}

// Skill tag hover effects
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.cursor = 'pointer';
    });
});

// Log portfolio loaded
console.log('%cWelcome to Mogga Fred Sam\'s Portfolio!', 'color: #06b6d4; font-size: 16px; font-weight: bold;');
console.log('%cLet\'s build something amazing together!', 'color: #8b5cf6; font-size: 14px;');
