/* ========================================
   PHANTOMTVVV - ULTRA MODERN SCRIPTS v2.0
   ======================================== */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    // Load config and initialize
    applyConfig();
    initLoader();
    initCustomCursor();
    initScrollProgress();
    initNavigation();
    initEyeTracking();
    initTypingEffect();
    initParticles();
    initNebula();
    initFAQ();
    initTestimonials();
    initContentFilters();
    initScrollAnimations();
    initFloatingButtons();
    initAnnouncement();
});

/* ==========================================
   Apply Configuration
   ========================================== */
function applyConfig() {
    try {
        // Brand
        const navLogoSpan = document.querySelector('.nav-logo span');
        if (navLogoSpan) navLogoSpan.textContent = CONFIG.brand.name;
        
        const dataTextEl = document.querySelector('[data-text]');
        if (dataTextEl) dataTextEl.setAttribute('data-text', CONFIG.brand.name);
        
        const titleMain = document.querySelector('.title-main');
        if (titleMain) titleMain.textContent = CONFIG.brand.name;
        
        const footerLogo = document.querySelector('.footer-logo');
        if (footerLogo) footerLogo.textContent = CONFIG.brand.name;
        
        // Tagline
        const subtitleWords = document.querySelectorAll('.subtitle-word');
        if (subtitleWords.length >= 2 && CONFIG.brand.tagline) {
            const taglineParts = CONFIG.brand.tagline.split ? CONFIG.brand.tagline.split(' | ') : CONFIG.brand.tagline;
            if (taglineParts[0]) subtitleWords[0].textContent = taglineParts[0];
            if (taglineParts[1]) subtitleWords[1].textContent = taglineParts[1];
        }
        
        const footerTagline = document.querySelector('.footer-tagline');
        if (footerTagline && CONFIG.brand.tagline) {
            footerTagline.textContent = Array.isArray(CONFIG.brand.tagline) ? CONFIG.brand.tagline.join(' | ') : CONFIG.brand.tagline;
        }
    
    // Stats
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer && CONFIG.stats) {
        statsContainer.innerHTML = CONFIG.stats.map(stat => `
            <div class="stat-item animate-on-scroll">
                <div class="stat-value" data-count="${parseInt(stat.value)}">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
    }
    
    // About
    const aboutEl = document.getElementById('about-text');
    if (aboutEl && CONFIG.about?.text) {
        aboutEl.textContent = CONFIG.about.text;
    }
    
    const featuresContainer = document.querySelector('.about-features');
    if (featuresContainer && CONFIG.about?.features) {
        featuresContainer.innerHTML = CONFIG.about.features.map(feature => `
            <div class="feature-item">
                <span class="feature-icon">${feature.icon}</span>
                <div class="feature-text">
                    <h4>${feature.title}</h4>
                    <p>${feature.desc}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Card Brand
    const cardBrand = document.querySelector('.card-brand');
    if (cardBrand) cardBrand.textContent = CONFIG.brand.name;
    
    // Content Cards
    const contentGrid = document.querySelector('.content-grid');
    if (contentGrid && CONFIG.content) {
        contentGrid.innerHTML = CONFIG.content.map(item => `
            <article class="content-card animate-on-scroll" data-category="${item.category || ''}">
                <div class="card-image">
                    <span class="card-tag">${item.tag || item.type || ''}</span>
                    <div class="card-views">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                        ${item.views || ''}
                    </div>
                </div>
                <div class="card-content">
                    <h3>${item.title}</h3>
                    <p>${item.description || item.desc || ''}</p>
                    <div class="card-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                </div>
            </article>
        `).join('');
    }
    
    // Testimonials
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const sliderDots = document.querySelector('.slider-dots');
    if (testimonialsSlider && CONFIG.testimonials) {
        testimonialsSlider.innerHTML = CONFIG.testimonials.map(t => {
            const authorName = t.name || t.author || 'Anonym';
            return `
            <div class="testimonial-card">
                <p class="testimonial-text">${t.text}</p>
                <div class="testimonial-author">
                    <div class="testimonial-avatar">${authorName.charAt(0)}</div>
                    <div class="testimonial-info">
                        <span class="testimonial-name">${authorName}</span>
                        <span class="testimonial-platform">${t.platform}</span>
                    </div>
                </div>
            </div>
        `;
        }).join('');
        
        if (sliderDots) {
            sliderDots.innerHTML = CONFIG.testimonials.map((_, i) => `
                <div class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>
            `).join('');
        }
    }
    
    // FAQ
    const faqContainer = document.querySelector('.faq-container');
    if (faqContainer && CONFIG.faq) {
        faqContainer.innerHTML = CONFIG.faq.map((item, i) => `
            <div class="faq-item ${i === 0 ? 'active' : ''}">
                <button class="faq-question">
                    ${item.question || item.q}
                    <span class="faq-icon"></span>
                </button>
                <div class="faq-answer">
                    <p>${item.answer || item.a}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Social Cards
    const socialGrid = document.querySelector('.social-grid');
    if (socialGrid && CONFIG.socials) {
        socialGrid.innerHTML = '';
        
        if (CONFIG.socials.discord) {
            socialGrid.innerHTML += `
                <a href="${CONFIG.socials.discord}" target="_blank" class="social-card discord">
                    <div class="social-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                    </div>
                    <div class="social-info">
                        <span class="social-name">Discord</span>
                        <span class="social-handle">Join our community</span>
                    </div>
                </a>
            `;
        }
        
        if (CONFIG.socials.youtube) {
            socialGrid.innerHTML += `
                <a href="${CONFIG.socials.youtube}" target="_blank" class="social-card">
                    <div class="social-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </div>
                    <div class="social-info">
                        <span class="social-name">YouTube</span>
                        <span class="social-handle">Watch our content</span>
                    </div>
                </a>
            `;
        }
        
        if (CONFIG.socials.twitter) {
            socialGrid.innerHTML += `
                <a href="${CONFIG.socials.twitter}" target="_blank" class="social-card">
                    <div class="social-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </div>
                    <div class="social-info">
                        <span class="social-name">X / Twitter</span>
                        <span class="social-handle">Follow us</span>
                    </div>
                </a>
            `;
        }
        
        if (CONFIG.socials.instagram) {
            socialGrid.innerHTML += `
                <a href="${CONFIG.socials.instagram}" target="_blank" class="social-card">
                    <div class="social-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </div>
                    <div class="social-info">
                        <span class="social-name">Instagram</span>
                        <span class="social-handle">See our posts</span>
                    </div>
                </a>
            `;
        }
        
        if (CONFIG.socials.tiktok) {
            socialGrid.innerHTML += `
                <a href="${CONFIG.socials.tiktok}" target="_blank" class="social-card">
                    <div class="social-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                    </div>
                    <div class="social-info">
                        <span class="social-name">TikTok</span>
                        <span class="social-handle">Watch our clips</span>
                    </div>
                </a>
            `;
        }
    }
    
    // Contact Email
    const emailLink = document.getElementById('contact-email');
    if (emailLink && CONFIG.contact) {
        emailLink.textContent = CONFIG.contact.email;
        emailLink.href = `mailto:${CONFIG.contact.email}`;
    }
    
    // Floating Discord Button
    const floatingBtn = document.getElementById('floating-discord');
    if (floatingBtn && CONFIG.socials.discord) {
        floatingBtn.href = CONFIG.socials.discord;
    }
    
    // Nav CTA
    const navCta = document.querySelector('.nav-cta');
    if (navCta && CONFIG.socials.discord) {
        navCta.href = CONFIG.socials.discord;
    }
    
    // Year
    document.querySelector('.current-year').textContent = new Date().getFullYear();
    
    // Toggle Features
    if (CONFIG.features) {
        if (!CONFIG.features.particles) {
            document.getElementById('particles').style.display = 'none';
        }
        if (!CONFIG.features.nebula) {
            document.getElementById('nebula').style.display = 'none';
        }
        if (!CONFIG.features.customCursor) {
            document.querySelector('.cursor').style.display = 'none';
            document.querySelector('.cursor-trail').style.display = 'none';
            document.body.style.cursor = 'auto';
        }
        if (!CONFIG.features.glitchEffect) {
            document.querySelectorAll('.glitch').forEach(el => {
                el.classList.remove('glitch');
            });
        }
    }
    
    // Apply Design Settings
    if (CONFIG.design) {
        const root = document.documentElement;
        if (CONFIG.design.primaryColor) {
            root.style.setProperty('--primary', CONFIG.design.primaryColor);
        }
    }
    
    // Announcement
    if (CONFIG.announcement) {
        const announcementText = document.querySelector('.announcement-text');
        if (announcementText) {
            announcementText.textContent = CONFIG.announcement.text;
        }
    }
    } catch (error) {
        console.error('Error applying config:', error);
    }
}

/* ==========================================
   Loading Screen
   ========================================== */
function initLoader() {
    const loader = document.querySelector('.loader');
    const loaderText = document.querySelector('.loader-text span');
    
    if (loaderText) {
        loaderText.textContent = CONFIG.brand.name;
    }
    
    // Simulate loading
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // Initialize counter animations after load
        setTimeout(() => {
            initCounters();
        }, 500);
    }, 2000);
}

/* ==========================================
   Custom Cursor
   ========================================== */
function initCustomCursor() {
    if (!CONFIG.features?.customCursor) return;
    if (window.matchMedia('(hover: none)').matches) return;
    
    const cursor = document.querySelector('.cursor');
    const trail = document.querySelector('.cursor-trail');
    
    if (!cursor || !trail) return;
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .content-card, .social-card, .stat-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

/* ==========================================
   Scroll Progress
   ========================================== */
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/* ==========================================
   Navigation
   ========================================== */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const burger = document.querySelector('.nav-burger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        links.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (link) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });
}

/* ==========================================
   Eye Tracking
   ========================================== */
function initEyeTracking() {
    const pupil = document.querySelector('.eye-pupil');
    const loaderPupil = document.querySelector('.loader-pupil');
    
    document.addEventListener('mousemove', (e) => {
        if (pupil) {
            const eye = pupil.parentElement;
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            
            const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
            const distance = Math.min(15, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 10);
            
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            pupil.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;
        }
    });
}

/* ==========================================
   Typing Effect
   ========================================== */
function initTypingEffect() {
    const element = document.getElementById('typing-text');
    if (!element) return;
    
    const texts = CONFIG.brand.description || ['Welcome to PHANTOMTVVV'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 30 : 80;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

/* ==========================================
   Particles System
   ========================================== */
function initParticles() {
    if (!CONFIG.features?.particles) return;
    
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 30 : 80;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.8 ? '#DC143C' : '#ffffff';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function connectParticles() {
        const maxDist = isMobile ? 80 : 120;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < maxDist) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(220, 20, 60, ${0.1 * (1 - dist / maxDist)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================
   Nebula Effect
   ========================================== */
function initNebula() {
    if (!CONFIG.features?.nebula) return;
    
    const canvas = document.getElementById('nebula');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let time = 0;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    function drawNebula() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Main glow
        const gradient = ctx.createRadialGradient(
            canvas.width / 2 + Math.sin(time * 0.001) * 100,
            canvas.height / 2 + Math.cos(time * 0.0015) * 50,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width * 0.5
        );
        
        gradient.addColorStop(0, 'rgba(220, 20, 60, 0.15)');
        gradient.addColorStop(0.5, 'rgba(139, 0, 0, 0.08)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Secondary glow
        const gradient2 = ctx.createRadialGradient(
            canvas.width * 0.3 + Math.sin(time * 0.0008) * 80,
            canvas.height * 0.6 + Math.cos(time * 0.001) * 60,
            0,
            canvas.width * 0.3,
            canvas.height * 0.6,
            canvas.width * 0.3
        );
        
        gradient2.addColorStop(0, 'rgba(220, 20, 60, 0.1)');
        gradient2.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        time++;
        requestAnimationFrame(drawNebula);
    }
    drawNebula();
}

/* ==========================================
   FAQ Accordion
   ========================================== */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked if was closed
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* ==========================================
   Testimonials Slider
   ========================================== */
function initTestimonials() {
    const slider = document.querySelector('.testimonials-slider');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!slider || dots.length === 0) return;
    
    let currentIndex = 0;
    
    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Scroll sync
    slider.addEventListener('scroll', () => {
        const scrollLeft = slider.scrollLeft;
        const cardWidth = slider.querySelector('.testimonial-card')?.offsetWidth + 32 || 350;
        const newIndex = Math.round(scrollLeft / cardWidth);
        
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < dots.length) {
            currentIndex = newIndex;
            updateDots();
        }
    });
    
    function updateSlider() {
        const card = slider.querySelector('.testimonial-card');
        if (card) {
            const cardWidth = card.offsetWidth + 32;
            slider.scrollTo({ left: currentIndex * cardWidth, behavior: 'smooth' });
        }
        updateDots();
    }
    
    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Auto-play
    setInterval(() => {
        currentIndex = (currentIndex + 1) % dots.length;
        updateSlider();
    }, 5000);
}

/* ==========================================
   Content Filters
   ========================================== */
function initContentFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.content-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter cards
            cards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================
   Scroll Animations
   ========================================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add CSS for visible state
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

/* ==========================================
   Counter Animation
   ========================================== */
function initCounters() {
    const counters = document.querySelectorAll('.stat-value[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const suffix = counter.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const increment = Math.ceil(target / 60);
        const duration = 2000;
        const step = duration / (target / increment);
        
        const updateCounter = () => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString() + suffix;
            } else {
                counter.textContent = Math.floor(current).toLocaleString() + suffix;
                setTimeout(updateCounter, step);
            }
        };
        
        // Start when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

/* ==========================================
   Floating Buttons
   ========================================== */
function initFloatingButtons() {
    const floatingBtn = document.getElementById('floating-discord');
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (floatingBtn) {
            if (scrollY > 300) {
                floatingBtn.classList.add('show');
            } else {
                floatingBtn.classList.remove('show');
            }
        }
        
        if (backToTop) {
            if (scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });
    
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* ==========================================
   Announcement Bar
   ========================================== */
function initAnnouncement() {
    if (!CONFIG.announcement?.enabled) return;
    
    const bar = document.querySelector('.announcement-bar');
    const navbar = document.querySelector('.navbar');
    const closeBtn = document.querySelector('.announcement-close');
    
    if (!bar) return;
    
    // Check if dismissed
    const dismissed = localStorage.getItem('announcement-dismissed');
    if (dismissed === CONFIG.announcement.text) return;
    
    // Show bar
    setTimeout(() => {
        bar.classList.add('show');
        if (navbar) navbar.classList.add('announcement-visible');
    }, 500);
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            bar.classList.remove('show');
            if (navbar) navbar.classList.remove('announcement-visible');
            localStorage.setItem('announcement-dismissed', CONFIG.announcement.text);
        });
    }
}

/* ==========================================
   Newsletter Form
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            if (input && input.value) {
                // You can integrate with your email service here
                alert('Thanks for subscribing! 🎉');
                input.value = '';
            }
        });
    }
});

/* ==========================================
   Smooth Scroll
   ========================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
