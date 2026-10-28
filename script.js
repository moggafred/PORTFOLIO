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

// Load the latest public projects from GitHub.
const projectsGrid = document.getElementById('projectsGrid');
const projectsStatus = document.getElementById('projectsStatus');
const projectDemoUrls = {
    'AQG-STUDY': 'https://aqg-study-frontend-phi.vercel.app/',
    'PORTFOLIO': 'https://mogga-portfolio.vercel.app',
    'DF-SPORTS-ARENA': 'https://natz-sports-arena.vercel.app'
};

const createProjectLink = (url, iconClass, label) => {
    let safeUrl;
    try {
        const parsedUrl = new URL(url);
        if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') return null;
        safeUrl = parsedUrl.href;
    } catch (error) {
        return null;
    }

    const link = document.createElement('a');
    link.className = 'project-link';
    link.href = safeUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const icon = document.createElement('i');
    icon.className = iconClass;
    icon.setAttribute('aria-hidden', 'true');
    link.append(icon, document.createTextNode(` ${label}`));
    return link;
};

const createProjectCard = (repository) => {
    const card = document.createElement('article');
    card.className = 'project-card';

    const header = document.createElement('div');
    header.className = 'project-header';
    const icon = document.createElement('div');
    icon.className = 'project-icon';
    const iconImage = document.createElement('i');
    iconImage.className = 'fas fa-code-branch';
    iconImage.setAttribute('aria-hidden', 'true');
    icon.append(iconImage);

    const info = document.createElement('div');
    info.className = 'project-info';
    const title = document.createElement('h3');
    title.textContent = repository.name;
    info.append(title);
    if (repository.created_at) {
        const year = document.createElement('span');
        year.className = 'project-year';
        year.textContent = String(new Date(repository.created_at).getFullYear());
        info.append(year);
    }
    header.append(icon, info);

    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = repository.description || 'No description provided yet.';

    const tech = document.createElement('div');
    tech.className = 'project-tech';
    if (repository.language) {
        const badge = document.createElement('span');
        badge.className = 'tech-badge';
        badge.textContent = repository.language;
        tech.append(badge);
    }

    const links = document.createElement('div');
    links.className = 'project-links';
    const sourceLink = createProjectLink(repository.html_url, 'fab fa-github', 'View on GitHub');
    if (sourceLink) links.append(sourceLink);
    const demoUrl = Object.prototype.hasOwnProperty.call(projectDemoUrls, repository.name)
        ? projectDemoUrls[repository.name]
        : repository.homepage;
    if (demoUrl) {
        const demoLink = createProjectLink(demoUrl, 'fas fa-external-link-alt', 'Live demo');
        if (demoLink) links.append(demoLink);
    }

    card.append(header, description);
    if (tech.childElementCount) card.append(tech);
    card.append(links);
    return card;
};

const showProjectStatus = (message, profileUrl) => {
    if (!projectsStatus) return;
    projectsStatus.replaceChildren(document.createTextNode(message));

    if (profileUrl) {
        const profileLink = createProjectLink(profileUrl, 'fab fa-github', 'View GitHub profile');
        if (profileLink) {
            projectsStatus.append(document.createTextNode(' '), profileLink);
        }
    }
    projectsStatus.hidden = false;
};

const loadGitHubProjects = async () => {
    if (!projectsGrid || !projectsStatus) return;

    const username = 'moggafred';
    const profileUrl = `https://github.com/${username}`;

    try {
        const response = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`,
            { headers: { Accept: 'application/vnd.github+json' } }
        );
        if (!response.ok) {
            throw new Error(`GitHub returned HTTP ${response.status}.`);
        }

        const repositories = await response.json();
        if (!Array.isArray(repositories)) {
            throw new Error('GitHub returned an unexpected response.');
        }

        const projects = repositories.filter(repository =>
            !repository.fork && !repository.archived && !repository.disabled
        );

        if (!projects.length) {
            showProjectStatus('No public projects found.', profileUrl);
            return;
        }

        projectsGrid.replaceChildren(...projects.map(createProjectCard));
        projectsGrid.querySelectorAll('.project-card').forEach(observeForAnimation);
        projectsStatus.hidden = true;
    } catch (error) {
        console.error('Unable to load GitHub projects:', error);
        showProjectStatus('Projects could not be loaded from GitHub.', profileUrl);
    }
};

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
const observeForAnimation = (element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
};

const animateElements = document.querySelectorAll(
    '.skill-tag, .project-card, .highlight-card, .timeline-content, .info-item'
);

animateElements.forEach(observeForAnimation);
loadGitHubProjects();

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
