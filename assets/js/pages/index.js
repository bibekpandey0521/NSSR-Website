/* ==========================================================================
   NSSR — index.html page script
   ---------------------------------------------------------------------------
   Handles recent proceedings grid and mission bullets animation.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const proceedingsGrid = document.getElementById('recent-proceedings-grid');
  if (proceedingsGrid && window.getLatestNSSREvents) {
    proceedingsGrid.innerHTML = window.getLatestNSSREvents().map(event => `
      <article class="event-card-stanford" onclick="location.href='event.html#${event.id}'">
        <a href="event.html#${event.id}" class="event-card-stanford__link">
          <div class="event-card-stanford__media">
            <img src="${event.image}" alt="${event.title}" loading="lazy">
          </div>
          <div class="event-card-stanford__content">
            <div class="event-card-stanford__meta">
              <span class="event-card-stanford__category">${event.label.split(' // ')[0]}</span>
              <span class="event-card-stanford__date">${event.label.split(' // ')[1]}</span>
            </div>
            <h3 class="event-card-stanford__title">${event.title}</h3>
          </div>
        </a>
      </article>`).join('');
  }

  // Mission bullet line-draw: trigger once when scrolled into view
  const missionBullets = document.getElementById('mission-bullets');
  if (missionBullets) {
    const lineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.nssr-draw-line').forEach(line => line.classList.add('is-visible'));
          lineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    lineObserver.observe(missionBullets);
  }
});
