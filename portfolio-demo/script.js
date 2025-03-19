// Mobile navigation toggle
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');
  
  burger.addEventListener('click', () => {
    // Toggle navigation
    nav.classList.toggle('nav-active');
    
    // Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });
    
    // Burger animation
    burger.classList.toggle('toggle');
  });
};

// Smooth scrolling for navigation links
const smoothScroll = () => {
  const navLinks = document.querySelectorAll('header nav a, .hero-content .btn');
  
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      // Only prevent default if it's an anchor link
      if (link.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Offset for fixed header
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const nav = document.querySelector('.nav-links');
          if (nav.classList.contains('nav-active')) {
            document.querySelector('.burger').click();
          }
        }
      }
    });
  });
};

// Adjust primary button links
const setupButtons = () => {
  const viewProjectsBtn = document.querySelector('.primary-btn');
  const contactBtn = document.querySelector('.secondary-btn');
  
  if (viewProjectsBtn) {
    viewProjectsBtn.addEventListener('click', () => {
      document.querySelector('#projects').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    });
  }
  
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    });
  }
};

// Form submission handling
const setupForm = () => {
  const form = document.querySelector('.contact-form form');
  
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Simple form validation
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // In a real application, you would send this data to a server
      console.log('Form submission:', { name, email, message });
      
      // Reset form fields
      form.reset();
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
    });
  }
};

// Scroll animations for elements
const setupScrollAnimations = () => {
  const sections = document.querySelectorAll('section');
  
  const fadeInOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const fadeInOnScroll = new IntersectionObserver(function(entries, fadeInOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('appear');
        fadeInOnScroll.unobserve(entry.target);
      }
    });
  }, fadeInOptions);
  
  sections.forEach(section => {
    section.classList.add('fade-in');
    fadeInOnScroll.observe(section);
  });
};

// Initialize all functions when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  navSlide();
  smoothScroll();
  setupButtons();
  setupForm();
  setupScrollAnimations();
}); 