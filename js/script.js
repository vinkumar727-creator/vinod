// ===================================
// Navigation Functionality
// ===================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ===================================
// Smooth Scrolling
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(`
        .about-card,
        .skill-category,
        .timeline-item,
        .award-card,
        .contact-info,
        .contact-form
    `);

    animatedElements.forEach(el => {
        el.classList.add('scroll-animation');
        observer.observe(el);
    });
}

// Initialize on page load
window.addEventListener('load', initScrollAnimations);

// ===================================
// Contact Form Handling
// ===================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('.btn');
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    try {
        // Prepare email content
        const recipientEmail = 'joinvkc@gmail.com';
        const emailSubject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
        const emailBody = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Subject: ${formData.subject}\n\n` +
            `Message:\n${formData.message}`
        );
        
        // Create mailto link
        const mailtoLink = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        showFormMessage(
            'Your email client has been opened. Please send the email from there. If it didn\'t open automatically, please email directly to joinvkc@gmail.com',
            'success'
        );
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        console.error('Error:', error);
        showFormMessage(
            'There was an error opening your email client. Please email directly to joinvkc@gmail.com',
            'error'
        );
    } finally {
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto hide after 10 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 10000);
}

// ===================================
// Back to Top Button
// ===================================

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Dynamic Typing Effect for Hero Section
// ===================================

function initTypingEffect() {
    const roles = [
        'Senior Software Developer',
        'Full Stack Developer',
        'JavaScript Expert',
        'React Specialist',
        'Node.js Developer',
        'Technical Lead'
    ];
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            heroSubtitle.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            heroSubtitle.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end
            typingDelay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingDelay = 500;
        }
        
        setTimeout(type, typingDelay);
    }
    
    // Start typing effect after page load
    setTimeout(type, 1000);
}

// Initialize typing effect
window.addEventListener('load', initTypingEffect);

// ===================================
// Skill Progress Animation
// ===================================

function animateSkillTags() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const tags = category.querySelectorAll('.skill-tag');
        tags.forEach((tag, index) => {
            tag.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
            tag.style.opacity = '0';
        });
    });
}

// Animate skill tags when they come into view
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillTags();
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// ===================================
// Counter Animation for Stats
// ===================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Animate counters when about section comes into view
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const experienceCard = document.querySelector('.about-card:first-child p');
            if (experienceCard && experienceCard.textContent.includes('Years')) {
                animateCounter(experienceCard, 13);
            }
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// ===================================
// Floating Badges Animation
// ===================================

function animateFloatingBadges() {
    const badges = document.querySelectorAll('.floating-badge');
    badges.forEach((badge, index) => {
        badge.style.animation = `floatBadge 4s ease-in-out ${index * 0.5}s infinite`;
    });
}

window.addEventListener('load', animateFloatingBadges);

// ===================================
// Timeline Animation on Scroll
// ===================================

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
});

// ===================================
// Parallax Effect for Hero Section
// ===================================

function parallaxEffect() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
}

window.addEventListener('scroll', parallaxEffect);

// ===================================
// Mouse Move Effect for Hero Cards
// ===================================

const profileCard = document.querySelector('.profile-card');

if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        profileCard.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.05, 1.05, 1.05)
        `;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
}

// ===================================
// Preloader (Optional)
// ===================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize all animations after page load
    setTimeout(() => {
        document.querySelectorAll('.hero-text, .hero-image').forEach(el => {
            el.style.opacity = '1';
        });
    }, 100);
});

// ===================================
// Performance Optimization
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(setActiveNavLink, 10));
window.addEventListener('scroll', debounce(parallaxEffect, 10));

// ===================================
// Console Message
// ===================================

console.log('%c👋 Hello! Welcome to my portfolio', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cInterested in working together? Contact me at joinvkc@gmail.com', 'color: #06b6d4; font-size: 14px;');

// ===================================
// Handle External Links
// ===================================

document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// ===================================
// Accessibility Enhancements
// ===================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus styles for keyboard navigation
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('a, button, input, textarea');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--primary-color)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});

// ===================================
// Print Optimization
// ===================================

window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections for printing
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// ===================================
// Error Handling
// ===================================

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// ===================================
// Service Worker Registration (for PWA - optional)
// ===================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}
