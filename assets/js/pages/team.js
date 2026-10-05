/* ==========================================================================
   NSSR — team.html page script
   ---------------------------------------------------------------------------
   Tab navigation for the team page.
   Contract: each .team-nav-btn carries data-tab whose value EXACTLY matches
   the id of a .team-tab-content container. Visibility is owned entirely by
   CSS (.team-tab-content / .team-tab-content.active) — this script only
   toggles the .active class and never writes inline display styles.
   ========================================================================== */

        // Tab Navigation Logic
        function initTabNavigation() {
            const nav = document.getElementById('team-nav');
            if (!nav) return;

            const tabLinks = nav.querySelectorAll('.tab-link[data-tab]');
            const tabContents = document.querySelectorAll('.team-tab-content');
            if (!tabLinks.length || !tabContents.length) return;

            // Map of container id -> element, so a tab value must resolve
            // to a real container. Ids are read once at init.
            const panels = {};
            tabContents.forEach(panel => { panels[panel.id] = panel; });

            function activateTab(tabName) {
                const targetPanel = panels[tabName];

                if (!targetPanel) {
                    console.warn(
                        '[team.js] data-tab="' + tabName + '" does not match any .team-tab-content id:',
                        Object.keys(panels).join(', ')
                    );
                    return;
                }

                tabLinks.forEach(link => {
                    const isActive = link.getAttribute('data-tab') === tabName;
                    link.classList.toggle('active', isActive);
                    link.setAttribute('aria-selected', String(isActive));
                });

                tabContents.forEach(panel => {
                    panel.classList.toggle('active', panel === targetPanel);
                });
            }

            tabLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    activateTab(this.getAttribute('data-tab'));
                });
            });

            // Normalise initial state: exactly one panel marked active.
            // Falls back to the first link if the HTML default is missing
            // or points at a container that no longer exists.
            const initial = tabLinks.find(l => l.classList.contains('active'));
            const initialTab = initial && initial.getAttribute('data-tab');
            activateTab(initialTab && panels[initialTab] ? initialTab : tabLinks[0].getAttribute('data-tab'));
        }

        // Initialize tab navigation on load
        document.addEventListener('DOMContentLoaded', initTabNavigation);
