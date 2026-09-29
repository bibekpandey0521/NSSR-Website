/* ==========================================================================
   NSSR — blog.html page script
   ---------------------------------------------------------------------------
   Extracted verbatim from the page's former inline <script> block.

   Loaded as a CLASSIC deferred script:

       <script src="assets/js/pages/blog.js" defer></script>

   It must not become an ES module. The site is routinely opened straight from
   disk, and browsers block module graphs and bare `import`s over file:// under
   the same-origin policy — a `type="module"` tag here would silently take the
   whole page's behaviour with it.

   Must stay referenced AFTER assets/js/main.js: deferred scripts run in
   document order, and the code below relies on getLatestNSSREvents() and
   NSSR_EVENT_FEED being defined there.
   ========================================================================== */

// 1. BLOG DATA
        const blogs = {
            'quantum-mechanics-2025': {
                title: "Quantum Mechanics: 2025 Retrospective",
                author: "Research Committee",
                role: "NSSR Secretariat",
                date: "Jan 02, 2026",
                category: "Physics",
                image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
                excerpt: "Looking back at the International Year of Quantum Science and Technology breakthroughs.",
                content: `<h3>A Year of Quantum Leap</h3><p>2025 was designated as the International Year of Quantum Science and Technology. It lived up to the title with breakthroughs that pushed the boundaries of the known universe.</p><blockquote>"Quantum effects were shown in systems large enough to hold in your hand."</blockquote>`
            },
            'plasma-physics-2025': {
                title: "Plasma Physics Nutshell",
                author: "Manish Pandey",
                role: "President, NSSR",
                date: "Nov 10, 2025",
                category: "Physics",
                image: "assets/images/plasma.jpg",
                excerpt: "Revolutionary whole-device modeling for fusion energy and star birth simulations.",
                content: `<h3>The 4th State of Matter</h3><p>Research advanced our ability to model, experiment with, and stabilize plasmas under extreme conditions.</p>`
            }
        };

        // 2. UI RENDERER
        function renderBlogUI() {
            const feed = document.getElementById('blog-feed');
            const sidebar = document.getElementById('featured-sidebar');
            feed.innerHTML = '';
            sidebar.innerHTML = '';

            Object.keys(blogs).forEach(key => {
                const post = blogs[key];
                const displayImg = post.image || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80';
                
                feed.innerHTML += `
                    <article class="blog-card py-8 cursor-pointer group" onclick="window.location.hash='${key}'">
                        <div class="flex flex-col md:flex-row gap-8 items-center">
                            <div class="w-full md:w-1/3 aspect-video overflow-hidden rounded-sm bg-slate-100">
                                <img src="${displayImg}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700">
                            </div>
                            <div class="w-full md:w-2/3">
                                <span class="text-[10px] font-oswald font-bold text-blue-600 tracking-widest uppercase mb-2 block">${post.category} // ${post.date}</span>
                                <h2 class="text-2xl font-bold mb-3 group-hover:text-blue-900 transition leading-tight">${post.title}</h2>
                                <p class="text-gray-500 text-sm leading-relaxed line-clamp-2">${post.excerpt}</p>
                            </div>
                        </div>
                    </article>`;

                sidebar.innerHTML += `
                    <div class="cursor-pointer group" onclick="window.location.hash='${key}'">
                        <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">${post.date}</span>
                        <h5 class="font-bold text-sm group-hover:text-blue-600 transition mt-1 leading-snug">${post.title}</h5>
                    </div>`;
            });
        }

        // 3. ROUTER
        function handleRouting() {
            const hash = window.location.hash.replace('#', '');
            const listView = document.getElementById('blog-list-view');
            const heroView = document.getElementById('blog-hero');
            const detailView = document.getElementById('blog-detail-view');

            if (hash && blogs[hash]) {
                const post = blogs[hash];
                listView.classList.add('hidden');
                heroView.classList.add('hidden');
                detailView.classList.remove('hidden');

                const displayImg = post.image || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80';

                document.getElementById('detail-header').innerHTML = `
                    <span class="font-oswald text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">${post.category}</span>
                    <h1 class="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">${post.title}</h1>
                    <div class="flex items-center gap-4 text-xs text-gray-500 uppercase font-oswald tracking-widest">
                        <span class="font-bold text-slate-900">${post.author}</span>
                        <span class="opacity-20">|</span>
                        <span>${post.date}</span>
                    </div>`;

                document.getElementById('detail-content').innerHTML = `
                    <img src="${displayImg}" class="w-full aspect-video object-cover rounded-lg mb-12 shadow-xl">
                    ${post.content}`;

                document.getElementById('detail-footer').innerHTML = `
                    <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">${post.author.charAt(0)}</div>
                    <div>
                        <h4 class="font-bold text-slate-900 text-sm">${post.author}</h4>
                        <p class="text-[10px] text-gray-400 font-oswald uppercase tracking-widest">${post.role}</p>
                    </div>`;

                window.scrollTo(0, 0);
            } else {
                listView.classList.remove('hidden');
                heroView.classList.remove('hidden');
                detailView.classList.add('hidden');
                renderBlogUI();
            }
        }

        // 4. PROGRESS BAR LOGIC
        window.onscroll = function() {
            let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled = (winScroll / height) * 100;
            document.getElementById("progress-bar").style.width = scrolled + "%";
        };

        // 5. INITIALIZE
        window.addEventListener('hashchange', handleRouting);
        window.addEventListener('DOMContentLoaded', () => {
            handleRouting();
            // Note: Components like nav.html are loaded by nav.js automatically
        });
