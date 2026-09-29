/* ==========================================================================
   NSSR — index.html page script
   ---------------------------------------------------------------------------
   Extracted verbatim from the page's former inline <script> block.

   Loaded as a CLASSIC deferred script:

       <script src="assets/js/pages/index.js" defer></script>

   It must not become an ES module. The site is routinely opened straight from
   disk, and browsers block module graphs and bare `import`s over file:// under
   the same-origin policy — a `type="module"` tag here would silently take the
   whole page's behaviour with it.

   Must stay referenced AFTER assets/js/main.js: deferred scripts run in
   document order, and the code below relies on getLatestNSSREvents() and
   NSSR_EVENT_FEED being defined there.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
            const proceedingsGrid = document.getElementById('recent-proceedings-grid');
            if (proceedingsGrid) {
                proceedingsGrid.innerHTML = getLatestNSSREvents().map(event => `
                    <div class="group cursor-pointer" onclick="location.href='event.html#${event.id}'">
                        <div class="aspect-[16/10] overflow-hidden mb-6 bg-slate-100">
                            <img src="${event.image}" class="w-full h-full object-cover hover-color-img" alt="${event.title}">
                        </div>
                        <span class="text-[9px] font-bold text-nssrBlue uppercase tracking-widest block mb-2">${event.label}</span>
                        <h4 class="text-lg font-bold group-hover:text-nssrBlue transition">${event.title}</h4>
                    </div>`).join('');
            }

            // Main Hero Slider
            new Swiper(".mainSwiper", {
                loop: true,
                effect: "fade",
                fadeEffect: { crossFade: true },
                speed: 1800,
                autoplay: { delay: 7000, disableOnInteraction: false },
                pagination: { el: ".swiper-pagination", clickable: true },
            });

            // Collaborator Slider
            new Swiper(".partnerSwiper", {
                loop: true, slidesPerView: 3, spaceBetween: 8,
                speed: 5000,
                autoplay: { delay: 0, disableOnInteraction: false },
                breakpoints: { 640: { slidesPerView: 4, spaceBetween: 10 }, 1024: { slidesPerView: 5, spaceBetween: 12 } }
            });

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
