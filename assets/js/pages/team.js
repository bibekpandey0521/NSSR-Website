/* ==========================================================================
   NSSR — team.html page script
   ---------------------------------------------------------------------------
   Tab navigation for the team page.
   Contract: each .tab-link carries data-tab whose value EXACTLY matches
   the id of a .team-tab-content container. Visibility is owned entirely by
   CSS (.team-tab-content / .team-tab-content.active) — this script only
   toggles the .active class and never writes inline display styles.
   ========================================================================== */

        // The tab shown on first paint. team.html already marks the Advisory
        // Board tab with `.active`; this constant is the JavaScript-side
        // fallback so the page still opens on Advisory Board if that markup
        // class is ever lost.
        var DEFAULT_TAB = 'advisory';

        // Tab Navigation Logic
        function initTabNavigation() {
            const nav = document.getElementById('team-nav');
            if (!nav) return;

            // `querySelectorAll` returns a NodeList, which has forEach but NOT
            // find. Wrapping it keeps `.find(...)` below working instead of
            // throwing and silently skipping the initial-state normalisation.
            const tabLinks = Array.prototype.slice.call(nav.querySelectorAll('.tab-link[data-tab]'));
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
            // Honors the active tab declared in the markup (Advisory Board),
            // falling back to the page default and only then to the first link.
            const initial = tabLinks.find(l => l.classList.contains('active'));
            const initialTab = initial && initial.getAttribute('data-tab');
            const fallbackTab = panels[DEFAULT_TAB]
                ? DEFAULT_TAB
                : tabLinks[0].getAttribute('data-tab');
            activateTab(initialTab && panels[initialTab] ? initialTab : fallbackTab);
        }

        // Initialize tab navigation on load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initTabNavigation);
        } else {
            // DOMContentLoaded already fired
            initTabNavigation();
        }
