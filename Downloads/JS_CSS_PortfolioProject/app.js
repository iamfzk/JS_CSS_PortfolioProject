(function () {
    'use strict';

    // ============================================
    // WORLD-CLASS PORTFOLIO JAVASCRIPT
    // ============================================

    // Initialize all features
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initTheme();
        initSmoothScroll();
        initFormHandling();
        initAnimations();
        initParticles();
        initScrollProgress();
        initCustomCursor();
        initTypingEffect();
        initParallax();
        initMagneticEffects();
        initResumeDownload();
        initPerformanceOptimizations();
        
        console.log('🚀 World-Class Portfolio Loaded Successfully!');
    });

    // ============================================
    // NAVIGATION SYSTEM
    // ============================================
    function initNavigation() {
        const controls = document.querySelectorAll(".control");
        controls.forEach(button => {
            button.addEventListener("click", function () {
                // Remove active from all
                document.querySelector(".active-btn")?.classList.remove("active-btn");
                this.classList.add("active-btn");
                
                // Hide all sections
                document.querySelector(".active")?.classList.remove("active");
                
                // Show target section
                const targetId = button.dataset.id;
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add("active");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    
                    // Add reveal animation
                    targetSection.style.animation = 'appear 0.6s ease-out';
                }
            });
        });
    }

    // ============================================
    // THEME TOGGLE WITH ANIMATION
    // ============================================
    function initTheme() {
        const themeBtn = document.querySelector(".theme-btn");
        if (themeBtn) {
            themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");
                const isLightMode = document.body.classList.contains("light-mode");
                localStorage.setItem("theme", isLightMode ? "light" : "dark");
                
                // Add transition effect
                themeBtn.style.transform = 'rotate(360deg) scale(1.2)';
                setTimeout(() => {
                    themeBtn.style.transform = '';
                }, 300);
            });

            // Load saved theme
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "light") {
                document.body.classList.add("light-mode");
            }
        }
    }

    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href !== '') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const targetSection = target.closest('.container');
                        if (targetSection) {
                            document.querySelector(".active")?.classList.remove("active");
                            targetSection.classList.add("active");
                            
                            const sectionId = targetSection.id;
                            document.querySelector(".active-btn")?.classList.remove("active-btn");
                            document.querySelector(`[data-id="${sectionId}"]`)?.classList.add("active-btn");
                        }
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // ============================================
    // FORM HANDLING WITH EMAILJS INTEGRATION
    // ============================================
    function initFormHandling() {
        const contactForm = document.getElementById("contact-form");
        if (contactForm) {
            contactForm.addEventListener("submit", function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const name = formData.get("name");
                const email = formData.get("email");
                const subject = formData.get("subject");
                const message = formData.get("message");
                
                // Simple validation
                if (!name || !email || !subject || !message) {
                    showNotification('Please fill all fields!', 'error');
                    return;
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showNotification('Please enter a valid email!', 'error');
                    return;
                }
                
                // Disable submit button
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="btn-text">Sending...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';
                
                // Prepare email parameters
                const emailParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    to_email: 'fahadzaafarkhan.freelance@gmail.com', // Your email
                    reply_to: email
                };
                
                // Send email using EmailJS
                if (typeof emailjs !== 'undefined') {
                    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
                        .then(function(response) {
                            console.log('SUCCESS!', response.status, response.text);
                            showNotification(`Thank you ${name}! Your message has been sent successfully. I'll get back to you soon.`, 'success');
                            contactForm.reset();
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalText;
                        }, function(error) {
                            console.log('FAILED...', error);
                            // Fallback: Open mailto link
                            const mailtoLink = `mailto:fahadzaafarkhan.freelance@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
                            window.location.href = mailtoLink;
                            showNotification('Opening email client... Please send the message manually.', 'info');
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalText;
                        });
                } else {
                    // Fallback if EmailJS is not configured
                    const mailtoLink = `mailto:fahadzaafarkhan.freelance@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
                    window.location.href = mailtoLink;
                    showNotification('Opening email client... Please send the message manually.', 'info');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            });
        }
    }

    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // ============================================
    // ADVANCED ANIMATIONS
    // ============================================
    function initAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.classList.add('animated');
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.service-item, .portfolio-item, .skill-category, .about-item, .timeline-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });

        // Progress bar animation
        const progressBars = document.querySelectorAll('.progress span');
        const progressObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.dataset.width || getComputedStyle(bar).width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                        bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, 200);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => {
            const width = getComputedStyle(bar).width;
            bar.dataset.width = width;
            progressObserver.observe(bar);
        });
    }

    // ============================================
    // PARTICLE SYSTEM
    // ============================================
    function initParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);

        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);

            // Remove after animation
            setTimeout(() => particle.remove(), 20000);
        }

        // Create particles periodically
        setInterval(createParticle, 3000);
        
        // Initial particles
        for (let i = 0; i < 5; i++) {
            setTimeout(createParticle, i * 500);
        }
    }

    // ============================================
    // SCROLL PROGRESS INDICATOR
    // ============================================
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // ============================================
    // CUSTOM CURSOR EFFECT
    // ============================================
    function initCustomCursor() {
        if (window.innerWidth > 768) { // Only on desktop
            const cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            document.body.appendChild(cursor);

            let mouseX = 0, mouseY = 0;
            let cursorX = 0, cursorY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursor.style.opacity = '1';
            });

            document.addEventListener('mouseleave', () => {
                cursor.style.opacity = '0';
            });

            // Smooth cursor follow
            function animateCursor() {
                cursorX += (mouseX - cursorX) * 0.1;
                cursorY += (mouseY - cursorY) * 0.1;
                cursor.style.left = cursorX + 'px';
                cursor.style.top = cursorY + 'px';
                requestAnimationFrame(animateCursor);
            }
            animateCursor();

            // Cursor hover effects
            document.querySelectorAll('a, button, .control, .theme-btn').forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('active'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
            });
        }
    }

    // ============================================
    // TYPING EFFECT
    // ============================================
    function initTypingEffect() {
        const nameElement = document.querySelector('.name span');
        if (nameElement && !nameElement.dataset.animated) {
            nameElement.dataset.animated = 'true';
            const text = nameElement.textContent;
            nameElement.textContent = '';
            nameElement.style.opacity = '1';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    nameElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Add cursor blink
                    nameElement.innerHTML += '<span class="typing-cursor">|</span>';
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }

    // ============================================
    // PARALLAX EFFECTS
    // ============================================
    function initParallax() {
        const headerImage = document.querySelector('.header-content .left-header .image img');
        if (headerImage) {
            let ticking = false;
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const scrolled = window.pageYOffset;
                        if (scrolled < window.innerHeight) {
                            headerImage.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0005})`;
                        }
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }
    }

    // ============================================
    // MAGNETIC HOVER EFFECTS
    // ============================================
    function initMagneticEffects() {
        document.querySelectorAll('.controls .control, .theme-btn, .main-btn').forEach(el => {
            el.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });
            
            el.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // ============================================
    // RESUME DOWNLOAD - PDF GENERATION
    // ============================================
    function initResumeDownload() {
        const downloadResumeBtn = document.getElementById("download-resume-btn");
        if (downloadResumeBtn) {
            downloadResumeBtn.addEventListener("click", function(e) {
                e.preventDefault();
                
                // Open resume in new window for printing/downloading
                const resumeWindow = window.open('resume.html', '_blank');
                
                if (resumeWindow) {
                    resumeWindow.onload = function() {
                        setTimeout(() => {
                            resumeWindow.print();
                            showNotification('Resume opened! Use Print to save as PDF.', 'success');
                        }, 500);
                    };
                } else {
                    // Fallback: direct link
                    const link = document.createElement('a');
                    link.href = 'resume.html';
                    link.target = '_blank';
                    link.click();
                    showNotification('Resume opened in new tab! Use Ctrl+P to save as PDF.', 'info');
                }
            });
        }
    }

    // ============================================
    // PERFORMANCE OPTIMIZATIONS
    // ============================================
    function initPerformanceOptimizations() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Debounce scroll events
        let scrollTimeout;
        const originalScrollHandler = window.onscroll;
        window.onscroll = function() {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(() => {
                if (originalScrollHandler) originalScrollHandler();
            });
        };
    }

    // ============================================
    // ADD CSS ANIMATIONS DYNAMICALLY
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .typing-cursor {
            animation: blink 1s infinite;
            color: var(--color-secondary);
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

})();
