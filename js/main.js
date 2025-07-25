// Typing Animation for Hero Subtitle
class TypingAnimation {
  constructor() {
    this.textElement = document.querySelector('.typed-text');
    this.cursorElement = document.querySelector('.cursor');
    // Use gaming phrases if on gaming page
    if (
      window.location.pathname.includes('gaming.html') ||
      window.location.href.includes('gaming.html') ||
      document.body.classList.contains('gaming-theme')
    ) {
      this.texts = [
        'Entry-Fragger',
        'Clutch Minister',
        'AWP Specialist',
        'FACEIT Level 9',
        'Headshot Machine',
        'Eco Round Warrior',
        'Spray Control Master',
        'Bomb Defuser'
      ];
    } else {
      this.texts = [
        'Software Engineer',
        'Computer Science Student',
        'Full-Stack Developer',
        'Problem Solver',
        'Tech Enthusiast',
        "Hiring? Let's Connect!"
      ];
    }
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.typeSpeed = 100;
    this.deleteSpeed = 50;
    this.pauseTime = 2000;
    
    if (this.textElement) {
      this.startTyping();
    }
  }

  startTyping() {
    const currentText = this.texts[this.currentTextIndex];
    
    if (this.isDeleting) {
      // Remove characters
      this.textElement.textContent = currentText.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
      
      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        setTimeout(() => this.startTyping(), 200);
        return;
      }
      
      setTimeout(() => this.startTyping(), this.deleteSpeed);
    } else {
      // Add characters
      this.textElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
      
      if (this.currentCharIndex === currentText.length) {
        this.isDeleting = true;
        setTimeout(() => this.startTyping(), this.pauseTime);
        return;
      }
      
      setTimeout(() => this.startTyping(), this.typeSpeed);
    }
  }
}

// Navigation and Mobile Menu Management
class NavigationManager {
  constructor() {
    this.initNavigation();
  }

  async initNavigation() {
    try {
      const response = await fetch('nav.html');
      const html = await response.text();
      document.getElementById('nav-placeholder').innerHTML = html;

      // If on gaming page, update navbar header name and add Faceit link
      if (
        window.location.pathname.includes('gaming.html') ||
        window.location.href.includes('gaming.html') ||
        document.body.classList.contains('gaming-theme')
      ) {
        // Change header name
        const headerName = document.getElementById('header-name');
        if (headerName) {
          const link = headerName.querySelector('a');
          if (link) {
            link.innerHTML = 'gabel';
          }
        }
        // Always show GAMING link text
        const gamingLink = document.querySelector('.secret-gaming-link');
        if (gamingLink) {
          gamingLink.classList.add('show-gaming-text');
        }
        // Add Faceit link to social icons if not already present
        const socialIcons = document.querySelector('.social-icons');
        if (socialIcons && !socialIcons.querySelector('.faceit-link')) {
          const faceitA = document.createElement('a');
          faceitA.href = 'https://www.faceit.com/en/players/pooey';
          faceitA.target = '_blank';
          faceitA.className = 'faceit-link shimmer-gradient';
          faceitA.innerHTML = `
            <svg fill="url(#faceit-gradient)" width="24" height="24" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="faceit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#FF5500"/>
                  <stop offset="50%" stop-color="#F7931E"/>
                  <stop offset="100%" stop-color="#FFD23F"/>
                </linearGradient>
              </defs>
              <path d="M23.999 2.705a.167.167 0 0 0-.312-.1 1141.27 1141.27 0 0 0-6.053 9.375H.218c-.221 0-.301.282-.11.352 7.227 2.73 17.667 6.836 23.5 9.134.15.06.39-.08.39-.18z"/>
            </svg>
          `;
          // Insert as first child
          socialIcons.insertBefore(faceitA, socialIcons.firstChild);
        }
      }

      // To access gaming page on mobile tap-and-hold header name
      const headerName = document.getElementById('header-name');
      if (headerName && window.innerWidth <= 768) {
        let pressTimer = null;
        const link = headerName.querySelector('a');
        if (link) {
          link.addEventListener('touchstart', function(e) {
            if (pressTimer === null) {
              pressTimer = setTimeout(() => {
                window.location.href = '/gaming.html';
              }, 1200); // 1.2s hold
            }
          });
          link.addEventListener('touchend', function(e) {
            if (pressTimer !== null) {
              clearTimeout(pressTimer);
              pressTimer = null;
            }
          });
          link.addEventListener('touchmove', function(e) {
            if (pressTimer !== null) {
              clearTimeout(pressTimer);
              pressTimer = null;
            }
          });
        }
      }

      this.initHeaderAnimation();
      this.initMobileMenu();
    } catch (error) {
      console.error('Failed to load navigation:', error);
    }
  }

  initHeaderAnimation() {
    const headerName = document.getElementById('header-name');
    const heroSection = document.querySelector('.hero');
    
    // Always show name on projects page and 404 page
    const isProjectsPage = window.location.pathname.includes('projects.html') || 
                          window.location.href.includes('projects.html') ||
                          document.title.includes('Projects');
                          
    const is404Page = window.location.pathname.includes('404.html') || 
                     window.location.href.includes('404.html') ||
                     document.title.includes('404');
    
    if ((isProjectsPage || is404Page) && headerName) {
      headerName.classList.add('visible');
      return;
    }
    
    if (!heroSection || !headerName) return;
    
    const handleScroll = () => {
      const heroTop = heroSection.offsetTop;
      const heroHeight = heroSection.offsetHeight;
      const triggerPoint = heroTop + (heroHeight * 0.5);
      const scrollPosition = window.scrollY;
      
      if (scrollPosition >= triggerPoint) {
        headerName.classList.add('visible');
      } else {
        headerName.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
  }

  initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuToggle || !mobileMenu) return;
    
    // Toggle menu
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
    
    // Close menu on window resize if it gets too large
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
  }
}

// 3D Tilt Effect for Travel Polaroids
class TiltEffectManager {
  constructor() {
    this.initTiltEffect();
  }

  initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach((element, index) => {
      const parentGrid = element.closest('.travel-grid');
      const allGrids = document.querySelectorAll('.travel-grid');
      const gridIndex = Array.from(allGrids).indexOf(parentGrid);
      const childIndex = Array.from(parentGrid.children).indexOf(element);

      // Randomized rotations for each position
      const rotationMatrix = [
        ['-1.2deg', '0.8deg', '-0.3deg'],
        ['1.5deg', '-0.7deg', '1.1deg'],
        ['-0.9deg', '1.3deg', '-1.6deg']
      ];

      const originalRotation = rotationMatrix[gridIndex]?.[childIndex] || '-1.2deg';
      // Set initial rotation on the card
      element.style.transform = `rotate(${originalRotation})`;

      let tiltEnabled = true;
      const resetTilt = () => {
        element.style.transform = `rotate(${originalRotation})`;
      };

      element.addEventListener('mouseleave', resetTilt);
      element.addEventListener('mousemove', (e) => {
        if (!tiltEnabled) return;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateX = (mouseY / (rect.height / 2)) * -15;
        const rotateY = (mouseX / (rect.width / 2)) * 15;

        element.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateZ(20px)
          scale3d(1.05, 1.05, 1.05)
        `;
      });

      // Disable tilt when mouse is over the video
      const video = element.querySelector('video');
      if (video) {
        video.addEventListener('mouseenter', () => {
          tiltEnabled = false;
          resetTilt();
        });
        video.addEventListener('mouseleave', () => {
          tiltEnabled = true;
        });
      }
    });
  }
}

// About Image Height Manager
class AboutImageManager {
  constructor() {
    this.initImageHeight();
  }

  initImageHeight() {
    this.adjustImageHeight();
    window.addEventListener('resize', () => this.adjustImageHeight());
  }

  adjustImageHeight() {
    // Only apply on desktop
    if (window.innerWidth <= 768) return;
    
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image img');
    
    if (!aboutText || !aboutImage) return;
    
    const textHeight = aboutText.offsetHeight;
    const maxImageHeight = Math.min(textHeight, 400);
    
    aboutImage.style.maxHeight = `${maxImageHeight}px`;
  }
}

// Scroll Animation Manager
class ScrollAnimationManager {
  constructor() {
    this.animatedElements = [];
    this.initScrollAnimations();
  }

  initScrollAnimations() {
    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Find all elements with animation classes
    const animationClasses = [
      '.fade-in',
      '.slide-up',
      '.slide-left',
      '.slide-right',
      '.scale-in'
    ];

    animationClasses.forEach(className => {
      const elements = document.querySelectorAll(className);
      elements.forEach(element => {
        this.observer.observe(element);
        this.animatedElements.push(element);
      });
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Remove animation transition after animation completes to restore original hover effects
        // This is required to prevent hover effects from being overridden
        setTimeout(() => {
          if (entry.target.classList.contains('travel-destination')) {
            entry.target.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
          } else if (entry.target.classList.contains('project-card')) {
            entry.target.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
          }
        }, 1200); // Match animation duration
        
        // Stop observing once animated
        this.observer.unobserve(entry.target);
      }
    });
  }

  // Manually trigger animations
  triggerAllAnimations() {
    this.animatedElements.forEach(element => {
      element.classList.add('visible');
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TypingAnimation();
  new NavigationManager();
  new TiltEffectManager();
  new AboutImageManager();
  new ScrollAnimationManager();
});