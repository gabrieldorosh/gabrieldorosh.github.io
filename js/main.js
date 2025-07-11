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
      const triggerPoint = heroTop + (heroHeight * 0.55);
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
      const tiltShine = element.querySelector('.tilt-shine');
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
      
      element.addEventListener('mouseenter', () => {
        if (tiltShine) tiltShine.style.opacity = '1';
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = `rotate(${originalRotation})`;
        if (tiltShine) {
          tiltShine.style.opacity = '0';
          tiltShine.style.background = 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)';
        }
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
        
        if (tiltShine) {
          const shineX = (mouseX / rect.width) * 100 + 50;
          const shineY = (mouseY / rect.height) * 100 + 50;
          
          tiltShine.style.background = `
            radial-gradient(circle at ${shineX}% ${shineY}%, 
              rgba(255,255,255,0.3) 0%, 
              rgba(255,255,255,0.1) 20%, 
              transparent 60%)
          `;
        }
      });
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new NavigationManager();
  new TiltEffectManager();
});