/* ==========================================================================
   NSSR — event.html page script
   ---------------------------------------------------------------------------
   Extracted verbatim from the page's former inline <script> block.

   Loaded as a CLASSIC deferred script:

       <script src="assets/js/pages/event.js" defer></script>

   It must not become an ES module. The site is routinely opened straight from
   disk, and browsers block module graphs and bare `import`s over file:// under
   the same-origin policy — a `type="module"` tag here would silently take the
   whole page's behaviour with it.

   Must stay referenced AFTER assets/js/main.js: deferred scripts run in
   document order, and the code below relies on getLatestNSSREvents() and
   NSSR_EVENT_FEED being defined there.
   ========================================================================== */

// 1. DATA CATEGORIZED
        // Note: 'outreach' was removed and migrated to Outreach AI.
        const eventsData = {
            'aspire': {
                title: "Pathways: Research, Leadership and Global Opportunities",
                id: "NSSR-012",
                date: "30 March 2026",
                categoryType: "Workshops", // Custom Field for Filtering
                category: "Physics",
                image: "assets/images/events/aspire.png",
                excerpt: "Foundational concepts in quantum mechanics,quibits, superposition, entanglement and measurement",
                report: "report/Research_Pathways.pdf",
                status:"Completed",
                Mentor:"Dr. Pukar Malla, Dr. Arjun Acharya, Meena Sonea",
                Venue:"Tri-chandra College, Ghantaghar",
                gallery: ["assets/images/aspire/asp1.jpeg", "assets/images/aspire/asp2.jpeg", "assets/images/aspire/asp4.jpeg", "assets/images/aspire/asp5.jpeg","assets/images/aspire/asp6.jpeg"],
                body: `
        <p class="mb-4">The Nepalese Society of Student Researchers (NSSR), in collaboration with Aspire Institute and Tri-Chandra Multiple Campus, successfully organized the national-level event entitled Pathways: Research, Leadership, & Global Opportunities, Connecting Local Potential to Global Possibilities on March 30, 2026 with approximatedly 65 students.
			The program aimed to inspire undergraduate and graduate students by providing insights into research opportunities in Nepal, leadership development, innovation, and international fellowships.
			Through interactive talks, mentorship sessions, and networking opportunities, participants gained valuable knowledge for their academic and professional development.</p>

        <h4 class="text-xl font-bold mb-2 mt-6">Objectives Achieved:</h4>
        <ul class="list-disc ml-6 mb-6 space-y-2">
            <li>Increased awareness of research opportunities available in Nepal.</li>
            <li>Introduced students to leadership principles and innovation.</li>
            <li>Connected students with experienced mentors and professionals.</li>
        </ul>

        <p>The Pathways program was successfully completed and fulfilled its intended objectives.
			The event created an engaging platform where students explored research pathways, strengthened leadership skills, and learned about international academic opportunities.</p>
    `
            },
            'FWU-26': {
                title: "Scientific Writing & LaTeX Workshop",
                id: "NSSR-04",
                date: "29 Jan - 3 Feb, 2026",
                categoryType: "Workshops",
                category: "Research Methodology",
                status:"Complete",
                Venue: "School of Engineering, Far Western University",
                Mentor:"Manish Pandey, Shaleen Kumar Dhital, Mahesh Prasad Awasthi",
                image: "assets/images/events/6.png",
                excerpt: "5-Day intensive writing and formatting workshop for academic research.",
                report: "report/MAT.pdf",
                gallery: ["assets/images/events/1.jpeg", "assets/images/events/2.jpeg", "assets/images/events/5.jpeg", "assets/images/events/22.jpeg"],
                body: `
        <p class="mb-4">The Scientific Writing with LATEX training program is designed to equip undergraduate and early-stage graduate students with essential skills in academic research, scientific writing, and professional document preparation using LATEX. The program integrates theoretical foundations of research methodology with practical hands-on sessions to ensure participants develop both conceptual clarity and technical competence.</p>

        <h4 class="text-xl font-bold mb-2 mt-6">Objectives:</h4>
        <ul class="list-disc ml-6 mb-6 space-y-2">
            <li>To introduce participants to the fundamentals of scientific research and academic writing.</li>
            <li>To develop skills in identifying research problems, objectives, and research questions.</li>
            <li>To familiarize participants with ethical research practices and publication standards.</li>
            <li>To provide hands-on training in LATEX for preparing research papers, reports, and presentations.</li>
        </ul>
        <h4 class="text-xl font-bold mb-2 mt-6"> Outcomes:</h4>
        <p>By the end of the program, participants demonstrated a clear understanding of the structure and essential components of scientific research papers. They developed the ability to conduct effective literature reviews, while consistently applying ethics in citation. Participants also acquired practical skills in preparing professionally formatted research documents using LaTeX.</p>
             `
            },
            'Matlab-25': {
                title: "MATLAB Workshop for Researchers: Symbolic Math and Simulink",
                id: "NSSR-01",
                date: "6-10 September 2025",
                categoryType: "Workshops",
                category: "Data Analysis",
                status:"Complete",
                Venue: "Online",
                Mentor:"Manish Pandey, Janak Singh Dhami",
                image: "assets/images/Mat/Mat1.png",
                excerpt: "A 5-Day Online MATLAB Workshop on Symbolic Math and Simulink Basics.",
                report: "report/MAT.pdf",
                gallery: ["assets/images/Mat/Mat2.png", "assets/images/Mat/Mat3.png", "assets/images/Mat/Mat4.png", "assets/images/Mat/Mat5.png"],
                body: `
        <p class="mb-4">The Nepalese Society of Student Researchers (NSSR) successfully conducted a 5-Day Online MATLAB Workshop for Researchers: Symbolic Math and Simulink Basics. The workshop aimed to strengthen computational and research skills among students and early-career researchers by providing hands-on training in MATLAB, Symbolic Math Toolbox, and Simulink.</p>

        <h4 class="text-xl font-bold mb-2 mt-6">Outcomes:</h4>
        <ul class="list-disc ml-6 mb-6 space-y-2">
            <li>Introduced participants to MATLAB environment, Symbolic Math Toolbox, and Simulink.</li>
            <li>Developed skills in numerical computation, symbolic mathematics, visualization, and simulations.</li>
            <li>Applied computational techniques to physics, engineering, mathematics, and interdisciplinary research.</li>
            <li>Fostered collaboration and knowledge sharing among young researchers.</li>
        </ul>
             `
            },
            'quantum-25': {
                title: "Crash Course on Quantum Computing",
                id: "NSSR-02",
                date: "28 Nov - 14 Dec 2025",
                categoryType: "Workshops",
                category: "Physics",
                image: "assets/images/events/crash.png",
                excerpt: "Foundational concepts: qubits, superposition, entanglement, and measurement.",
                report: "report/NSRF_Proceedings.pdf",
                status:"Completed",
                Mentor:"Yuechi-Pata Magar, Tara Bhadur Rana, Om Jha, Manish Pandey",
                Venue:"St. Xavier's College, Maitighar",
                gallery: ["assets/images/Qc/image1.JPG", "assets/images/Qc/image6.JPG", "assets/images/Qc/image7.JPG"],
                body: `
        <p class="mb-4">The United Nations (UN) designated the year 2025 as the International Year of Quantum Science and Technology. The centenary celebration aims to raise awareness among students about the profound contributions and future possibilities in quantum mechanics.</p>
        <p class="mb-4">With this goal, this crash course seeks to inspire and ignite young minds by introducing the basics of quantum mechanics and quantum computing.</p>

        <h4 class="text-xl font-bold mb-2 mt-6">Objectives:</h4>
        <ul class="list-disc ml-6 mb-6 space-y-2">
            <li>Introduce foundational quantum mechanics concepts relevant to quantum computing.</li>
            <li>Teach practical quantum programming using Qiskit.</li>
            <li>Provide hands-on experience through lab sessions.</li>
        </ul>
        <p>The workshop concluded with a hands-on session using IBM QISKIT.</p>
    `
            },
            'experimental': {
                title: "Online Talk: Frontier Experimental Physics",
                id: "NSSR-014",
                date: "31 May 2026",
                categoryType: "Online Talks",
                category: "Physics",
                image: "assets/images/events/exp.png",
                excerpt: "How Large Research Facilities Advance Science and Create Global Research Opportunities.",
                report: "report/NSRF_Schedule.pdf",
                status:"Completed",
                Mentor:"Pashupati Dhakal",
                Venue:"Online",
                gallery: ["assets/images/expe/exp1.jpg", "assets/images/expe/exp2.jpg", "assets/images/expe/exp3.jpg", "assets/images/expe/exp4.jpg"],
                body: `
        <p class="mb-4">The Nepalese Society of Student Researchers organized an interactive virtual session titled “Frontier Experimental Physics: How Large Research Facilities Advance Science and Create Global Research Opportunities.” The webinar aimed to bridge the gap between aspiring Nepali student researchers and cutting-edge global physics research.</p>

        <h4 class="text-xl font-bold mb-2 mt-6">Large Experimental Physics Facilities & Scientific Impact</h4>
        <p class="mb-4">The session detailed how facilities like particle colliders, neutrino detectors, gravitational wave observatories, and nuclear fusion reactors operate.</p>

		<h4 class="text-xl font-bold mb-2 mt-6">Opportunities for Students</h4>
        <p>The speaker outlined step-by-step guidance on identifying student fellowships, summer student programs at major labs, master’s/Ph.D. assistantships, and funding avenues available for physics students.</p>
    `
            },
            'geo-25': {
                title: "Water Chemistry and Hydrogeochemical Processes in the Central Himalayas",
                id: "NSSR-03",
                date: "28 Nov 2025",
                categoryType: "Online Talks",
                category: "Geo-Chemistry",
                image: "assets/images/chemistry1.jpeg",
                excerpt: "Himalayan ecology and active data discussion.",
                report: "report/WC.pdf",
                status: "Completed",
                Venue:"Online Microsoft Teams",
                Mentor: "Dr. Ramesh Raj Pant",
                gallery: ["assets/images/chemistry1.jpeg", "assets/images/chemistry2.jpeg", "assets/images/chemistry3.jpeg", "assets/images/chemistry4.jpeg"],
                body: `
        <p class="mb-4">The Nepalese Society of Student Researchers (NSSR) successfully organized an online academic talk titled “Water Chemistry and Hydrogeochemical Processes in the Central Himalayas.” The session focused on key aspects of water chemistry and contemporary research challenges in the Himalayan region.</p>

        <h4 class="text-xl font-bold mb-2 mt-6">Outcomes:</h4>
        <ul class="list-disc ml-6 mb-6 space-y-2">
            <li>Enhanced understanding of water chemistry and hydrogeochemical processes.</li>
            <li>Exposure to research methodologies, analytical techniques, and data interpretation.</li>
            <li>Academic networking among participants from different colleges and universities.</li>
        </ul>
    `
            },
            'computational-25': {
                title: "Getting Started with Research: Biology",
                id: "NSSR-05",
                date: "5 Oct 2025",
                categoryType: "Online Talks",
                category: "Methodology",
                status:"Completed",
                Venue: "Online",
                Mentor:"Pratishna KC",
                image: "assets/images/bio/pc6.jpeg",
                excerpt: "Solving methodology and finding early biology literature.",
                report: "report/MAT.pdf",
                gallery: ["assets/images/bio/pc6.jpeg", "assets/images/bio/pc6.jpeg"],
                body: `
        <p class="mb-4">The Nepalese Society of Student Researchers (NSSR) successfully organized an insightful online session titled “Getting Into Research” with the objective of encouraging and guiding students toward academic research and scientific inquiry. The session was delivered by Ms. Pratishna KC, a student researcher from Caldwell University, USA.</p>
        <p>Ms. KC discussed key aspects of research development, including understanding research methodology, improving academic writing skills, seeking mentorship, and exploring research opportunities at national and international levels.</p>
                     `
            }
        };

        // ---------------------------------------------------------------
        // SHARED RENDER HELPERS
        // ---------------------------------------------------------------

        // Inline 24x24 glyphs, stroke-based and inheriting currentColor so they
        // tint with whatever surface they land on. Font Awesome is pinned to a
        // 2021 beta whose icon set is missing several glyphs this page needs,
        // so anything load-bearing is inlined instead of relied upon.
        const ICON = {
            calendar: '<path d="M7 3v3M17 3v3M3.5 9.5h17M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 19 20.5H5A1.5 1.5 0 0 1 3.5 19V7A1.5 1.5 0 0 1 5 5.5z"/>',
            pin: '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
            tag: '<path d="M3.5 11.2V4.5a1 1 0 0 1 1-1h6.7a1 1 0 0 1 .7.3l8.3 8.3a1 1 0 0 1 0 1.4l-6.7 6.7a1 1 0 0 1-1.4 0L3.8 11.9a1 1 0 0 1-.3-.7z"/><circle cx="7.8" cy="7.8" r="1.3"/>',
            arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>'
        };

        function icon(name, extraClass) {
            return '<svg class="icon-inline ' + (extraClass || '') + '" viewBox="0 0 24 24" fill="none" ' +
                'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ' +
                'aria-hidden="true" focusable="false">' + ICON[name] + '</svg>';
        }

        function escapeHtml(value) {
            return String(value === undefined || value === null ? '' : value)
                .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        }

        // Prefer the ISO date from the shared events feed: it is machine
        // parseable, whereas the display strings are ranges such as
        // "29 Jan - 3 Feb, 2026" and cannot be turned into a reliable day.
        function eventDate(key) {
            const feed = (window.NSSR_EVENT_FEED || []).find(e => e.id === key);
            if (feed && feed.date) {
                const parsed = new Date(feed.date + 'T00:00:00');
                if (!Number.isNaN(parsed.getTime())) return parsed;
            }
            const fallback = new Date(eventsData[key] && eventsData[key].date);
            return Number.isNaN(fallback.getTime()) ? null : fallback;
        }

        // Status vocabulary. The design supports Upcoming / Registration Open /
        // Completed; the source data decides which one is actually rendered.
        function statusMeta(status) {
            const value = String(status || '').toLowerCase();
            if (value.includes('registration') || value.includes('open')) {
                return { label: 'Registration Open', cls: 'status-pill--open' };
            }
            if (value.includes('upcoming') || value.includes('soon')) {
                return { label: 'Upcoming', cls: 'status-pill--soon' };
            }
            if (value.includes('complete') || value.includes('conducted')) {
                return { label: 'Completed', cls: 'status-pill--done' };
            }
            return { label: status || 'Archived', cls: 'status-pill--done' };
        }

        function dateBadgeHtml(key) {
            const date = eventDate(key);
            if (!date) return '';
            const month = date.toLocaleString('en-US', { month: 'short' });
            return '<div class="event-date-badge">' +
                '<span class="event-date-badge__month">' + escapeHtml(month) + '</span>' +
                '<span class="event-date-badge__day">' + date.getDate() + '</span>' +
                '<span class="event-date-badge__year">' + date.getFullYear() + '</span>' +
                '</div>';
        }

        // ---------------------------------------------------------------
        // FEATURED / UPCOMING HIGHLIGHT CARD (COMPACT)
        // ---------------------------------------------------------------
        function renderFeatured(key) {
            const slot = document.getElementById('featured-slot');
            if (!slot) return;

            const data = eventsData[key];
            if (!data) { slot.innerHTML = ''; return; }

            const status = statusMeta(data.status);

            slot.innerHTML = `
                <div class="event-featured--compact-row" style="max-width: 900px; margin: 0 auto 32px; display: flex; border: 1px solid rgba(15, 23, 42, 0.08); border-radius: 12px; overflow: hidden;">
                    <div class="event-featured__media" style="flex: 0 0 240px; height: 180px; background: var(--bg-surface-sunken);">
                        <img src="${escapeHtml(data.image)}" alt="${escapeHtml(data.title)}">
                    </div>
                    <div class="event-featured__body" style="padding: 32px; flex: 1;">
                        <h3 class="text-slate-900 font-black text-2xl mb-2">${escapeHtml(data.title)}</h3>
                        <p class="text-slate-600 text-sm mb-6">${escapeHtml(data.excerpt || '')}</p>
                        <div class="event-featured__meta-compat" style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;">
                            <span class="text-xs font-semibold text-nssrBlue uppercase tracking-widest">${escapeHtml(status.label)}</span>
                            <span class="text-xs font-semibold text-nssrBlue uppercase tracking-widest">${escapeHtml(data.categoryType || '')}</span>
                            <span class="text-xs font-semibold text-nssrBlue uppercase tracking-widest">${escapeHtml(data.date || '')}</span>
                        </div>
                        <div class="event-featured__actions" style="display: flex; gap: 8px; flex-wrap: wrap;">
                            <a href="${escapeHtml(data.report || '#')}" target="_blank" rel="noopener noreferrer" class="btn-primary btn-sm">View Event Details</a>
                            <a href="${escapeHtml(data.report || '#')}" target="_blank" rel="noopener noreferrer" class="btn-secondary btn-sm">Download Proceeding</a>
                        </div>
                    </div>
                </div>`;
        }

        // ---------------------------------------------------------------
        // ARCHIVE GRID RENDERER
        // ---------------------------------------------------------------
        function generateHTMLForGrid(keys) {
            if (keys.length === 0) {
                return '<p class="framework-card__body">No proceedings available in this category yet.</p>';
            }
            return keys.map(key => {
                const data = eventsData[key];
                const status = statusMeta(data.status);
                return `
                <article class="event-card" tabindex="0" role="link"
                         onclick="window.location.hash='${escapeHtml(key)}'"
                         onkeydown="if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); window.location.hash='${escapeHtml(key)}'; }">
                    <div class="event-card__media">
                        <img src="${escapeHtml(data.image)}" alt="${escapeHtml(data.title)}" loading="lazy">
                    </div>
                    <div class="event-card__body">
                        <h3 class="event-card__title">${escapeHtml(data.title)}</h3>
                        <p class="event-card__excerpt">${escapeHtml(data.excerpt || '')}</p>
                        <div class="event-card__meta">
                            <span class="event-meta-item">${icon('calendar')}${escapeHtml(data.date || '')}</span>
                            <span class="event-meta-item">${escapeHtml(data.Venue || 'Online')}</span>
                        </div>
                    </div>
                    <div class="event-card__footer">
                        <span class="status-pill ${status.cls}">${escapeHtml(status.label)}</span>
                        <span class="event-card__cta">View Details</span>
                    </div>
                </article>`;
            }).join('');
        }

        function renderUI() {
            const feedOrder = new Map(NSSR_EVENT_FEED.map((event, index) => [event.id, index]));
            const keys = Object.keys(eventsData).sort((first, second) => (feedOrder.get(first) ?? Number.MAX_SAFE_INTEGER) - (feedOrder.get(second) ?? Number.MAX_SAFE_INTEGER));

            const workshops = keys.filter(k => eventsData[k].categoryType === "Workshops");
            const onlineTalks = keys.filter(k => eventsData[k].categoryType === "Online Talks");

            document.getElementById('workshops-container').innerHTML = generateHTMLForGrid(workshops);
            document.getElementById('online-container').innerHTML = generateHTMLForGrid(onlineTalks);

            // The featured card always shows the most recently added event, so
            // the top of the page stays a single "what's happening" statement.
            if (keys.length) renderFeatured(keys[0]);
        }

        // TABS LOGIC
        const tabBtns = document.querySelectorAll('.events-tab');
        const tabContents = document.querySelectorAll('.tab-content');

        function selectTab(btn) {
            tabBtns.forEach(b => b.setAttribute('aria-selected', String(b === btn)));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.setAttribute('aria-selected', 'true');
            document.getElementById(btn.dataset.target).classList.add('active');
        }

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => selectTab(btn));
        });

        // ROUTER & LIGHTBOX
        function handleRouting() {
            const hash = window.location.hash.replace('#', '');
            const listView = document.getElementById('event-list-view');
            const detailView = document.getElementById('event-detail-view');

            if (hash && eventsData[hash]) {
                const data = eventsData[hash];
                listView.style.display = 'none';
                detailView.style.display = 'block';

                document.getElementById('detail-body').innerHTML = `
                    <span class="font-oswald text-blue-600 font-bold tracking-[0.2em] uppercase text-xs">${data.categoryType} // ${data.category}</span>
                    <h2 class="text-3xl md:text-5xl font-bold mt-4 mb-8 text-slate-900 leading-tight">${data.title}</h2>
                    <div class="prose prose-slate max-w-none text-slate-600 text-sm md:text-base leading-relaxed">${data.body}</div>`;

                document.getElementById('detail-meta').innerHTML = `
                    <div><h5 class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Venue</h5><p class="font-bold text-xs text-slate-800">${data.Venue}</p></div>
                    <div><h5 class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date</h5><p class="font-bold text-xs text-slate-800">${data.date}</p></div>
                    <div><h5 class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Speaker/Mentor</h5><p class="font-bold text-xs text-slate-800">${data.Mentor}</p></div>
                    <div><h5 class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</h5><p class="font-bold text-xs text-green-600 uppercase font-bold">${data.status}</p></div>`;

                document.getElementById('detail-gallery').innerHTML = data.gallery.map(img => `
                    <div class="aspect-square bg-slate-100 overflow-hidden cursor-zoom-in rounded-md shadow-sm border border-slate-200" onclick="openLightbox('${img}')">
                        <img src="${img}" class="w-full h-full object-cover hover:scale-110 transition duration-500">
                    </div>`).join('');

                document.getElementById('report-download-area').innerHTML = `
                    <a href="${data.report}" target="_blank" rel="noopener noreferrer" class="btn-primary btn-sm w-full">Download Proceeding</a>`;

                window.scrollTo(0, 0);
            } else {
                listView.style.display = 'block';
                detailView.style.display = 'none';
                renderUI();
            }
        }

        function openLightbox(src) {
            document.getElementById('lightbox-img').src = src;
            document.getElementById('lightbox').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
        function closeLightbox() {
            document.getElementById('lightbox').classList.add('hidden');
            document.body.style.overflow = 'auto';
        }

        window.addEventListener('hashchange', handleRouting);
        window.addEventListener('load', handleRouting);
