/**
 * EDROPE DIGITAL - INTERACTIVE JAVASCRIPT LOGIC
 * Features:
 * 1. Sticky Header Scroll Effect
 * 2. Mobile Drawer Navigation
 * 3. Standard Dropdown Accordion Service Table
 * 4. Featured Highlights 4-Slide Carousel with Autoplay & Thumbnails
 * 5. Floating WhatsApp Chat Widget & Quick Call
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Sticky Header Scroll Effect
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Drawer Navigation
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Standard Dropdown Accordion Service Table
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parentItem = trigger.closest('.accordion-item');
      const isOpen = parentItem.classList.contains('active');

      // Toggle this item
      if (isOpen) {
        parentItem.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        parentItem.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 4. Featured Highlights Carousel
  const slides = document.querySelectorAll('.carousel-slide');
  const carouselTabs = document.querySelectorAll('.carousel-tab-item');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const carouselContainer = document.getElementById('highlightsCarousel');

  let currentSlide = 0;
  let autoplayInterval = null;

  function showSlide(index) {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    currentSlide = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    carouselTabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === currentSlide);
    });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  if (prevBtn && nextBtn && slides.length > 0) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      startAutoplay();
    });

    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      startAutoplay();
    });

    carouselTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const slideIdx = parseInt(tab.getAttribute('data-slide'), 10);
        showSlide(slideIdx);
        startAutoplay();
      });
    });

    // Pause on hover
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopAutoplay);
      carouselContainer.addEventListener('mouseleave', startAutoplay);
    }

    // Start auto carousel
    startAutoplay();
  }

  // 5. Floating WhatsApp Action Widget
  const whatsappTriggerBtn = document.getElementById('whatsappTriggerBtn');
  const whatsappPopup = document.getElementById('whatsappPopup');
  const closeWhatsappPopup = document.getElementById('closeWhatsappPopup');

  if (whatsappTriggerBtn && whatsappPopup) {
    whatsappTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      whatsappPopup.classList.toggle('show');
    });

    if (closeWhatsappPopup) {
      closeWhatsappPopup.addEventListener('click', (e) => {
        e.stopPropagation();
        whatsappPopup.classList.remove('show');
      });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!whatsappPopup.contains(e.target) && !whatsappTriggerBtn.contains(e.target)) {
        whatsappPopup.classList.remove('show');
      }
    });

    // Automatically show popup once after 6 seconds
    setTimeout(() => {
      if (!whatsappPopup.classList.contains('show')) {
        whatsappPopup.classList.add('show');
      }
    }, 6000);
  }

});
