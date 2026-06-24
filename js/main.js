document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');
  const roomMainImg = document.getElementById('roomMainImg');
  const roomThumbs = document.querySelectorAll('.rooms__thumb');
  const galleryItems = document.querySelectorAll('.gallery__item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const contactForm = document.getElementById('contactForm');

  let currentGalleryIndex = 0;
  const galleryImages = Array.from(galleryItems).map(item =>
    item.querySelector('img').src
  );

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  roomThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.dataset.src;
      roomMainImg.src = src;
      roomThumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  function openLightbox(index) {
    currentGalleryIndex = index;
    lightboxImg.src = galleryImages[index];
    lightboxImg.alt = galleryItems[index].querySelector('img').alt;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showPrevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentGalleryIndex];
    lightboxImg.alt = galleryItems[currentGalleryIndex].querySelector('img').alt;
  }

  function showNextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentGalleryIndex];
    lightboxImg.alt = galleryItems[currentGalleryIndex].querySelector('img').alt;
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', showPrevImage);
  lightboxNext.addEventListener('click', showNextImage);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const text = `Assalomu alaykum! Men ${name}. Tel: ${phone}. ${message}`;
    const whatsappUrl = `https://wa.me/998882086644?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  });
});
