document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');
  const roomMainImg = document.getElementById('roomMainImg');
  const roomMainBtn = document.getElementById('roomMainBtn');
  const roomThumbs = document.querySelectorAll('.rooms__thumb');
  const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
  const lightbox = document.getElementById('lightbox');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  const slides = () =>
    Array.from(document.querySelectorAll('[data-lightbox]')).map((el) => ({
      src: el.dataset.lightbox,
      caption: el.dataset.caption || el.querySelector('img')?.alt || ''
    }));

  let currentIndex = 0;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  roomThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const src = thumb.dataset.src;
      const caption = thumb.getAttribute('aria-label') || '';

      roomMainImg.src = src;
      roomMainBtn.dataset.lightbox = src;
      roomMainBtn.dataset.caption = caption;

      roomThumbs.forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  function showSlide(index) {
    const items = slides();
    if (!items.length) return;

    currentIndex = index;
    const slide = items[index];

    lightboxImg.src = slide.src;
    lightboxImg.alt = slide.caption;
    lightboxCaption.textContent = slide.caption;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function openFromTrigger(trigger) {
    const items = slides();
    const src = trigger.dataset.lightbox;
    const index = items.findIndex((item) => item.src === src);
    showSlide(index >= 0 ? index : 0);
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  function showPrev() {
    const items = slides();
    const nextIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(nextIndex);
  }

  function showNext() {
    const items = slides();
    const nextIndex = (currentIndex + 1) % items.length;
    showSlide(nextIndex);
  }

  lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openFromTrigger(trigger);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrev();
  });
  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showNext();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
});
