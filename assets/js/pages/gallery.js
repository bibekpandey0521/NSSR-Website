/* ==========================================================================
   NSSR — gallery.html page script
   ---------------------------------------------------------------------------
   Renders the masonry gallery grid and drives its dedicated lightbox
   (#gallery-lightbox, distinct from the shared #lightbox in main.js).

   Loaded as a CLASSIC deferred script, after assets/js/main.js:
       <script src="assets/js/main.js" defer></script>
       <script src="assets/js/pages/gallery.js" defer></script>
   ========================================================================== */

const galleryImages = [
  { src: 'Photos/IMG_20260902_144525.jpg', alt: 'NSSR workshop session' },
  { src: 'Photos/IMG_20260902_144529.jpg', alt: 'Students at NSSR event' },
  { src: 'Photos/IMG_20260902_144533.jpg', alt: 'Workshop in progress' },
  { src: 'Photos/Photooooo/IMG_1884.jpeg', alt: 'Science workshop activity' },
  { src: 'Photos/Photos by Khwopa/IMG_0889.JPG', alt: 'Khwopa College event' },
  { src: 'assets/images/latexfolder/latex-main.jpg', alt: 'Scientific Writing & LaTeX workshop session' },
  { src: 'Photos/IMG_20260902_144747.jpg', alt: 'NSSR team photo' },
  { src: 'Photos/Photooooo/IMG_1855.jpeg', alt: 'Educational program' }
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('masonry-grid');
  if (grid) {
    grid.innerHTML = galleryImages.map(img => `
      <div class="masonry-item">
        <img src="${img.src}" alt="${img.alt}" loading="lazy" onload="this.classList.add('loaded')">
      </div>`).join('');
  }

  // Lightbox: event delegation across any gallery container.
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (!lightbox || !lightboxImg) return;

  document.addEventListener('click', (e) => {
    const galleryItem = e.target.closest('.masonry-item, .gallery-item, .portfolio-wrap, .portfolio-item');
    if (!galleryItem) return;

    e.preventDefault();

    // Prefer an <a href> pointing at the image (full quality); otherwise the
    // first <img> inside the container.
    let imageSource = '';
    if (galleryItem.tagName.toLowerCase() === 'a' && galleryItem.href) {
      imageSource = galleryItem.href;
    } else {
      const img = galleryItem.querySelector('img');
      if (img && img.src) imageSource = img.src;
    }

    if (imageSource && !imageSource.endsWith('#')) {
      lightboxImg.src = imageSource;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close when clicking the dark background or the close button.
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    setTimeout(() => { lightboxImg.src = ''; }, 300);
    document.body.style.overflow = '';
  };

  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) closeLightbox();
  });
});
