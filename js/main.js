// Typing Animation for Hero Subtitle
class TypingAnimation {
  constructor() {
    this.textElement = document.querySelector('.typed-text');
    this.cursorElement = document.querySelector('.cursor');
    this.texts = [
      'Software Engineer',
      'Computer Science Student',
      'Full-Stack Developer',
      'Problem Solver'
    ];
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
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = `rotate(${originalRotation})`;
      });
      
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = (mouseY / (rect.height / 2)) * -15;
        const rotateY = (mouseX / (rect.width / 2)) * 15;
        
        element.style.transform = `
          rotate(0deg)
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateZ(20px)
          scale3d(1.05, 1.05, 1.05)
        `;
      });
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