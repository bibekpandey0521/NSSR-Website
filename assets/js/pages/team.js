/* ==========================================================================
   NSSR — team.html page script
   ---------------------------------------------------------------------------
   Extracted verbatim from the page's former inline <script> block.

   Loaded as a CLASSIC deferred script:

       <script src="assets/js/pages/team.js" defer></script>

   It must not become an ES module. The site is routinely opened straight from
   disk, and browsers block module graphs and bare `import`s over file:// under
   the same-origin policy — a `type="module"` tag here would silently take the
   whole page's behaviour with it.

   Must stay referenced AFTER assets/js/main.js: deferred scripts run in
   document order, and the code below relies on main.js having injected the
   shared header and footer first.
   ========================================================================== */

// 1. TEAM DATA
        const executiveBoard = [
            {
                name: "Manish Pandey",
                role: "President/Founder",
                dept: "Physics, St. Xavier's College",
                image: "assets/images/pp/manish_pandey.jpg",
                linkedin: "https://www.linkedin.com/in/manish-pandey-24864m/",
                email: "manish24864pandey@gmail.com"
            },
            {
                name: "Sudiksha Bhattarai",
                role: "Vice President/Founder",
                dept: "Microbiology, Tri-Chandra Multiple Campus",
                image: "assets/images/pp/sudiksha.jpg",
                linkedin: "https://www.linkedin.com/in/sudiksha-bhattarai-035191231/",
                email: "bhattaraisudiksha1@gmail.com"
            },
            {
                name: "Om Jha",
                role: "Treasurer",
                dept: "Physics, St. Xavier's College",
                image: "assets/images/pp/om jha.jpg",
                linkedin: "https://www.linkedin.com/in/om-jha-1913b6279/",
                email: "omzha24680@gmail.com"
            },
            {
                name: "Sugyani Bishwokarma",
                role: "Secretary",
                dept: "Physics, Tri-Chandra Multiple Campus",
                image: "assets/images/pp/Sugyani.jpg",
                linkedin: "https://www.linkedin.com/in/sugyani-biswokarma-9566102b7/",
                email: "biswokarmasugyani62@gmail.com"
            },
            {
                name: "Shaleen Kumar Dhital",
                role: "Research Head/Founder",
                dept: "Physics, Tri-Chandra Multiple Campus",
                image: "assets/images/pp/Shaleen.jpg",
                linkedin: "https://www.linkedin.com/in/shaleen-dhital-097636255/",
                email: "dronadhital@gmail.com"
            },
            {
                name: "Dhirendra Prasad Upadhyay",
                role: "Event Head",
                dept: "Physics, Tri-Chandra Multiple Campus",
                image: "assets/images/pp/Dhirendra.jpg",
                linkedin: "https://www.linkedin.com/in/dhirendra-prasad-upadhyay-311a28316/",
                email: "dhirendraup07@gmail.com"
            },
            {
                name: "Dikshya Sharma",
                role: "HR Manager",
                dept: "Physics, Tri-Chandra Multiple Campus",
                image: "assets/images/pp/Dikshya_sharma.jpg",
                linkedin: "https://www.linkedin.com/in/dikshyasharma2004/",
                email: "Kandeldikshya398@gmail.com"
            }
        ];

        let advisors = [
            {
                name: "Asst. Prof. Dr. Basu Dev Ghimire",
                role: "Advisor",
                inst: "Head of Department, Physics, St.Xavier's College",
                image: "assets/images/pp/bdg.png"
            },
            {
                name: "Asst. Prof. Dr. Bishnu Hari Subedi",
                role: "Advisor",
                inst: "Cental Department of Mathematics,Tribhuvan University",
                image: "assets/images/pp/bishnu.webp"
            },
            {
                name: "Asst. Prof. Dr. Drabindra Pandit",
                role: "Advisor",
                inst: "Head of Research, St.Xavier's College",
                image: "assets/images/pp/DP.png"
            },
            {
                name: "Prof. Dr. Raju Bhai Tyata",
                role: "Advisor",
                inst: "R & D unit Head, Khwopa College of Engineering",
                image: "assets/images/profdr.jpeg"
            },
            {
                name: "Asst. Prof. Dr. Arjun Acharya",
                role: "Advisor",
                inst: "Tri-Chandra Multiple Campus, Tribhuvan University",
                image: "assets/images/pp/AA.webp"
            },
            {
                name: "Asst. Prof. Dr. Sanju Shrestha",
                role: "Advisor",
                inst: "Central Department of Physics, Tribhuvan University",
                image: "assets/images/pp/sanju_shrestha.jpg"
            },
            {
                name: "Prof. Dr. Rameshwar Adhikari",
                role: "Advisor",
                inst: "Central Department of Chemistry, Tribhuvan University",
                image: "assets/images/pp/rameshwar.jpeg"
            },
            {
                name: "Prof. Dr. Hari Prasad Lamichhane",
                role: "Advisor",
                inst: "Central Department of Physics, Tribhuvan University",
                image: "assets/images/pp/hari_p_lamichhane.jpeg"
            },
            {
                name: "Dr. Manoj Kumar Yadav",
                role: "Advisor",
                inst: "Rajarshi Janak University, Janakpurdham, Nepal",
                image: "assets/images/pp/Manoj_Kumar_Yadav.webp"
            }

        ];

        let collegeRepresentatives = [
            {
                name: "Dhurbaraj Singh",
                role: "College Representative",
                college: "Graduate School of Engineering, Mid-West University",
                image: "assets/images/college_representative/dhruv.jpeg"
            },
            {
                name: "Bikash Kadayat",
                role: "College Representative",
                college: "Tech AI College, Kathmandu",
                image: "assets/images/college_representative/bikash.jpeg"
            },
            {
                name: "Raunak Regmi",
                role: "College Representative",
                college: "Sunway College Kathmandu",
                image: "assets/images/college_representative/raunak.jpeg"
            },
            {
                name: "Puja Bhatt",
                role: "College Representative",
                college: "Brixton College, Mahendranagar",
                image: "assets/images/college_representative/puja.jpeg"
            }
        ];

        // --- SORTING LOGIC ---
        
        // 1. Sort Advisors: Professor first, then Assistant Professor, then alphabetically
        advisors.sort((a, b) => {
            const rankA = a.name.startsWith("Prof.") ? 1 : (a.name.startsWith("Asst. Prof.") ? 2 : 3);
            const rankB = b.name.startsWith("Prof.") ? 1 : (b.name.startsWith("Asst. Prof.") ? 2 : 3);
            
            if (rankA !== rankB) {
                return rankA - rankB; // Lower number (higher rank) comes first
            }
            // If ranks are the same, sort alphabetically
            return a.name.localeCompare(b.name);
        });

        // 2. Sort College Representatives alphabetically
        collegeRepresentatives.sort((a, b) => a.name.localeCompare(b.name));


        // 2. HORIZONTAL CARD GENERATOR
        function generateHorizontalCard(member) {
            const subtitle = member.dept || member.inst || member.college || '';
            const isExec = member.email || member.linkedin;
            
            const socialLinks = isExec ? `
                <div class="mt-3 flex gap-3">
                    ${member.linkedin ? `<a href="${member.linkedin}" target="_blank" class="social-link text-slate-400 hover:text-blue-700 text-sm"><i class="fa-brands fa-linkedin-in"></i></a>` : ''}
                    ${member.email ? `<a href="mailto:${member.email}" class="social-link text-slate-400 hover:text-blue-700 text-sm"><i class="fa-solid fa-envelope"></i></a>` : ''}
                </div>
            ` : '';

            return `
            <div class="team-card bg-white rounded-lg p-5 flex items-center gap-5 border border-slate-100 border-t-4 border-t-blue-800 shadow-sm">
                <div class="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-full overflow-hidden bg-slate-100 border-2 border-slate-50">
                    <img src="${member.image}" alt="${member.name}" class="w-full h-full object-cover">
                </div>
                <div>
                    <h4 class="font-bold text-base md:text-lg text-slate-900">${member.name}</h4>
                    <p class="text-blue-700 text-xs md:text-sm mt-0.5">${member.role}</p>
                    <p class="text-slate-500 text-xs mt-1.5 leading-snug">${subtitle}</p>
                    ${socialLinks}
                </div>
            </div>`;
        }

        // 3. RENDERER
        function renderTeam() {
            document.getElementById('content-leadership').innerHTML = executiveBoard.map(generateHorizontalCard).join('');
            document.getElementById('content-advisory').innerHTML = advisors.map(generateHorizontalCard).join('');
            
            // Render Representatives into the inner grid, leaving the button below it untouched
            const repsGrid = document.getElementById('reps-grid');
            if (collegeRepresentatives.length > 0) {
                repsGrid.innerHTML = collegeRepresentatives.map(generateHorizontalCard).join('');
            } else {
                repsGrid.innerHTML = `
                    <div class="xl:col-span-2 border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center rounded-lg">
                        <i class="fa-solid fa-building-columns text-2xl text-blue-600 mb-4"></i>
                        <h4 class="font-bold text-lg text-slate-900">Representative directory coming soon</h4>
                        <p class="text-slate-500 text-sm mt-2">College representatives will be listed here as the NSSR network grows.</p>
                    </div>`;
            }
        }

        // 4. TAB NAVIGATION LOGIC
        function showSection(sectionId) {
            // Hide all content sections
            document.querySelectorAll('.team-section').forEach(el => {
                el.classList.add('hidden');
            });
            
            // Reset all sidebar buttons styling
            document.querySelectorAll('#team-nav button').forEach(btn => {
                btn.className = "text-left px-6 py-3 -ml-[1px] border-l-4 border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-r-lg transition-all";
            });

            // Show selected content
            document.getElementById(`content-${sectionId}`).classList.remove('hidden');
            
            // Highlight active button
            const activeBtn = document.getElementById(`btn-${sectionId}`);
            activeBtn.className = "text-left px-6 py-3 -ml-[1px] border-l-4 border-blue-900 bg-blue-50/50 text-blue-900 font-bold rounded-r-lg transition-all";
        }

        // 5. INITIAL LOAD
        window.addEventListener('load', renderTeam);
