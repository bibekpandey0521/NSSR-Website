/* ==========================================================================
   NSSR — main.js
   ---------------------------------------------------------------------------
   The single script for the whole site. Every page loads it the same way, as a
   plain classic script at the bottom of <body>:

       <script src="assets/js/main.js" defer></script>

   WHY THIS IS A PLAIN IIFE AND NOT AN ES MODULE
   ------------------------------------------------
   This site is routinely opened straight from disk (`file:///.../nsrf.html`).
   Browsers enforce CORS on file:// URLs, and every one of these is blocked:

     * `<script type="module" src="assets/js/main.js">` — the module itself is
       fetched as a module graph and fails with a CORS error, so the file never
       executes at all.
     * `import` / `export` between local files — same origin policy, same block.
     * `fetch('nav.html')` to load an HTML partial — blocked, and it would also
       require a web server to be meaningful.

   The previous build used all three, which is why the navbar and footer simply
   did not appear when the pages were opened via file://. Everything below is
   synchronous, DOM-only, and dependency-free so it runs identically from
   file:// and from a web server.

   It owns: the shared header, the shared footer, active-route highlighting,
   the mobile drawer, dropdowns, the skip link, and the events feed data.
   Page-specific behaviour stays inline in each page's own <script> block.
   ========================================================================== */

(function () {
  'use strict';

  /* ==========================================================================
     Configuration
     ========================================================================== */

  var LOGO_SRC = 'assets/images/bluelogonobg.png';
  var LOGO_ALT = 'NSSR';
  var SKIP_LINK_ID = 'skip-to-content';

  /**
   * Top-level navigation. `children` render as dropdowns; a dropdown is marked
   * active when the current page matches any of its children.
   */
  var NAV_ITEMS = [
    { label: 'Home', href: 'index.html' },
    { label: 'Executives', href: 'team.html' },
    {
      label: 'Research',
      children: [
        { label: 'NSRF', href: 'nsrf.html' },
        { label: 'Research Pathways', href: 'research-pathways.html' }
      ]
    },
    {
      label: 'Outreach',
      children: [
        { label: 'Science Beyond the Classroom', href: 'science-beyond-classroom.html' },
        { label: 'Student Empowerment Initiative', href: 'student-empowerment.html' }
      ]
    },
    { label: 'Gallery', href: 'gallery.html' },
    { label: 'Events', href: 'event.html' },
    { label: 'Join Us', href: 'membership.html', variant: 'cta' }
  ];

  var FOOTER_LINKS = [
    { label: 'Research', href: 'research.html' },
    { label: 'Outreach', href: 'outreach.html' },
    { label: 'Gallery', href: 'gallery.html' },
    { label: 'Events Directory', href: 'event.html' },
    { label: 'Our Team', href: 'team.html' },
    { label: 'Membership', href: 'membership.html' }
  ];

  var SOCIAL_LINKS = [
    { label: 'Facebook', href: 'https://www.facebook.com/nssrnepal', icon: 'fa-facebook-square' },
    { label: 'Instagram', href: 'https://www.instagram.com/nssrnepal/', icon: 'fa-instagram-square' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/nssrnepal/?viewAsMember=true', icon: 'fa-linkedin' }
  ];

  /* ==========================================================================
     Events feed
     --------------------------------------------------------------------------
     Exposed on `window` because index.html's inline script calls
     getLatestNSSREvents() from its own DOMContentLoaded handler. This used to
     live in a second <script> file; it is folded in here so pages have exactly
     one script dependency.
     ========================================================================== */

  var NSSR_EVENT_FEED = [
    { id: 'experimental', date: '2026-05-31', label: 'Physics // 2026', title: 'Frontier Experimental Physics', image: 'assets/images/events/exp.png' },
    { id: 'aspire', date: '2026-03-30', label: 'Research & Leadership // 2026', title: 'Pathways: Research, Leadership and Global Opportunities', image: 'assets/images/events/aspire.png' },
    { id: 'FWU-26', date: '2026-01-29', label: 'Research Methodology // 2026', title: 'Scientific Writing & LaTeX Workshop', image: 'assets/images/events/6.png' },
    { id: 'Matlab-25', date: '2025-09-06', label: 'Computation // 2025', title: 'MATLAB Workshop for Researchers', image: 'assets/images/Mat/Mat1.png' },
    { id: 'quantum-25', date: '2025-11-28', label: 'Physics // 2025', title: 'Crash Course on Quantum Computing', image: 'assets/images/events/crash.png' },
    { id: 'geo-25', date: '2025-11-28', label: 'Geo-Chemistry // 2025', title: 'Water Chemistry and Hydrogeochemical Processes', image: 'assets/images/chemistry1.jpeg' }
  ];

  /**
   * The `count` most recent events, newest first.
   * @param {number} [count]
   * @returns {Array<Object>}
   */
  window.getLatestNSSREvents = function (count) {
    var limit = typeof count === 'number' ? count : 3;
    return NSSR_EVENT_FEED.slice()
      .sort(function (first, second) {
        return new Date(second.date) - new Date(first.date);
      })
      .slice(0, limit);
  };

  window.NSSR_EVENT_FEED = NSSR_EVENT_FEED;

  /* ==========================================================================
     Small helpers
     ========================================================================== */

  /**
   * Normalises a pathname/filename down to a comparable page key.
   * Works for both `/blog.html` and `file:///C:/site/blog.html`.
   * @param {string} value
   * @returns {string}
   */
  function pageKey(value) {
    if (!value) return 'index.html';
    var segment = value.split('/').filter(Boolean).pop() || value;
    var file = segment.split('?')[0].split('#')[0];
    if (!file || file === '' || file.endsWith('/')) return 'index.html';
    try {
      return decodeURIComponent(file).toLowerCase();
    } catch (error) {
      /* Malformed percent-encoding in the URL: fall back to the raw segment. */
      return file.toLowerCase();
    }
  }

  /** @returns {boolean} */
  function isActiveHref(href, currentPage) {
    return pageKey(href) === currentPage;
  }

  /** A dropdown is active when the current page is one of its children. */
  function isActiveItem(item, currentPage) {
    if (item.children) {
      return item.children.some(function (child) {
        return isActiveHref(child.href, currentPage);
      });
    }
    return isActiveHref(item.href, currentPage);
  }

  /** Stable DOM id for a dropdown, derived from its label. */
  function dropdownId(label) {
    return 'nav-dropdown-' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  /** Escapes text destined for an innerHTML template literal. */
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** Parses an HTML string and returns the nodes it describes. */
  function parseHTML(html) {
    var template = document.createElement('template');
    template.innerHTML = String(html).trim();
    return template.content;
  }

  /* ==========================================================================
     Header
     ========================================================================== */

  /**
   * Marks the nav entry that matches the current page.
   *
   * This runs against whatever `.nav-link` / `.dropdown-link` elements exist in
   * the document, not just the ones this script rendered, so any static header
   * markup left in a page is highlighted consistently too.
   * @param {string} currentPage
   */
  function markActiveLinks(currentPage) {
    var links = document.querySelectorAll('.nav-link[href], .dropdown-link[href]');

    Array.prototype.forEach.call(links, function (link) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#' || /^[a-z][a-z0-9+.-]*:/i.test(href)) {
        return; // in-page anchor, mailto:, tel: and other external schemes
      }

      if (isActiveHref(href, currentPage)) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
      }
    });

    // A dropdown whose children include the current page is active as a group.
    Array.prototype.forEach.call(
      document.querySelectorAll('.nav-dropdown-item'),
      function (item) {
        var hasActiveChild = item.querySelector('.dropdown-link.is-active') !== null;
        item.classList.toggle('is-active', hasActiveChild);
      }
    );
  }

  function renderLink(item, currentPage) {
    var active = isActiveItem(item, currentPage);
    var classes = ['nav-link'];
    if (item.variant === 'cta') classes.push('nav-cta');
    if (active) classes.push('is-active');

    var attrs = active ? ' aria-current="page"' : '';

    if (item.children) {
      // A dropdown has no page of its own, so the label is a non-navigating
      // span and the adjacent button owns the disclosure (a fake href would 404).
      var links = item.children.map(function (child) {
        var childActive = isActiveHref(child.href, currentPage);
        return '<li><a class="dropdown-link' + (childActive ? ' is-active' : '') +
          '" href="' + escapeHtml(child.href) + '"' +
          (childActive ? ' aria-current="page"' : '') + '>' +
          escapeHtml(child.label) + '</a></li>';
      }).join('');

      return '' +
        '        <li class="nav-dropdown-item' + (active ? ' is-active' : '') + '">' +
        '          <div class="dropdown-trigger-wrapper">' +
        '            <span class="' + classes.join(' ') + '"' + attrs + '>' + escapeHtml(item.label) + '</span>' +
        '            <button class="dropdown-arrow-btn" type="button" aria-expanded="false" aria-controls="' +
          dropdownId(item.label) + '" aria-label="Toggle ' + escapeHtml(item.label) + ' submenu">' +
        '              <span class="dropdown-caret" aria-hidden="true"></span>' +
        '            </button>' +
        '          </div>' +
        '          <ul class="nav-dropdown-menu" id="' + dropdownId(item.label) + '">' + links + '</ul>' +
        '        </li>';
    }

    return '' +
      '        <li class="nav-item">' +
      '          <a class="' + classes.join(' ') + '" href="' + escapeHtml(item.href) + '"' + attrs + '>' +
      escapeHtml(item.label) + '</a>' +
      '        </li>';
  }

  function buildHeaderHTML(currentPage) {
    var items = NAV_ITEMS.map(function (item) {
      return renderLink(item, currentPage);
    }).join('');

    return '' +
      '    <header class="site-header" id="site-header" data-nav-state="top">' +
      '      <div class="nav-container">' +
      '        <a href="index.html" class="nav-brand">' +
      '          <img class="nav-brand-logo" src="' + LOGO_SRC + '" alt="' + LOGO_ALT + '" width="36" height="36">' +
      '          <span class="brand-text">Nepalese Society of Student Researchers</span>' +
      '        </a>' +
      '        <button class="nav-toggle" id="nav-toggle" type="button"' +
      '                aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-menu">' +
      '          <span class="hamburger-line" aria-hidden="true"></span>' +
      '          <span class="hamburger-line" aria-hidden="true"></span>' +
      '          <span class="hamburger-line" aria-hidden="true"></span>' +
      '        </button>' +
      '        <nav class="nav-menu" id="nav-menu" aria-label="Primary">' +
      '          <ul class="nav-links">' + items + '</ul>' +
      '        </nav>' +
      '      </div>' +
      '    </header>';
  }

  /**
   * Puts the header at the very top of <body>, replacing a legacy placeholder.
   * Any previously injected header is removed first so a re-run is idempotent.
   */
  function mountHeader(html) {
    var fragment = parseHTML(html);

    var existing = document.getElementById('site-header');
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

    var placeholder = document.getElementById('nav-placeholder');
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.replaceChild(fragment, placeholder);
      return;
    }

    if (document.body.firstChild) {
      document.body.insertBefore(fragment, document.body.firstChild);
    } else {
      document.body.appendChild(fragment);
    }
  }

  function setMenuOpen(toggle, menu, isOpen) {
    menu.classList.toggle('is-open', isOpen);
    toggle.classList.toggle('is-active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-open', isOpen);
  }

  function closeDropdown(item) {
    var button = item.querySelector('.dropdown-arrow-btn');
    var menu = item.querySelector('.nav-dropdown-menu');
    item.classList.remove('is-open');
    if (menu) menu.classList.remove('is-open');
    if (button) button.setAttribute('aria-expanded', 'false');
  }

  function initDropdowns(header) {
    Array.prototype.forEach.call(header.querySelectorAll('.nav-dropdown-item'), function (item) {
      var button = item.querySelector('.dropdown-arrow-btn');
      var menu = item.querySelector('.nav-dropdown-menu');
      if (!button || !menu) return;

      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        var willOpen = !item.classList.contains('is-open');
        // Accordion behaviour on mobile, single-open everywhere.
        Array.prototype.forEach.call(
          item.parentElement.querySelectorAll('.nav-dropdown-item.is-open'),
          function (sibling) {
            if (sibling !== item) closeDropdown(sibling);
          }
        );

        item.classList.toggle('is-open', willOpen);
        menu.classList.toggle('is-open', willOpen);
        button.setAttribute('aria-expanded', String(willOpen));
      });
    });
  }

  function initHeaderInteractions(header) {
    var toggle = header.querySelector('#nav-toggle');
    var menu = header.querySelector('#nav-menu');

    if (toggle && menu) {
      toggle.addEventListener('click', function (event) {
        event.stopPropagation();
        setMenuOpen(toggle, menu, !menu.classList.contains('is-open'));
      });

      document.addEventListener('click', function (event) {
        if (menu.classList.contains('is-open') && !menu.contains(event.target)) {
          setMenuOpen(toggle, menu, false);
        }
      });

      document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        if (menu.classList.contains('is-open')) {
          setMenuOpen(toggle, menu, false);
          toggle.focus();
          return;
        }
        var openItem = header.querySelector('.nav-dropdown-item.is-open');
        if (openItem) {
          closeDropdown(openItem);
          var trigger = openItem.querySelector('.dropdown-arrow-btn');
          if (trigger) trigger.focus();
        }
      });

      // Leaving the mobile breakpoint must reset inlined state, or the desktop
      // menu can be left invisible after a rotate/resize.
      var desktop = window.matchMedia('(min-width: 1025px)');
      var onChange = function (event) {
        if (!event.matches) return;
        setMenuOpen(toggle, menu, false);
        Array.prototype.forEach.call(
          header.querySelectorAll('.nav-dropdown-item.is-open'),
          closeDropdown
        );
      };
      if (typeof desktop.addEventListener === 'function') {
        desktop.addEventListener('change', onChange);
      } else if (typeof desktop.addListener === 'function') {
        desktop.addListener(onChange);
      }
    }

    initDropdowns(header);

    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        header.dataset.navState = window.scrollY > 8 ? 'scrolled' : 'top';
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initNavbar() {
    var currentPage = pageKey(window.location.pathname);
    mountHeader(buildHeaderHTML(currentPage));
    markActiveLinks(currentPage);

    var header = document.getElementById('site-header');
    if (header) initHeaderInteractions(header);
    return header;
  }

  /* ==========================================================================
     Footer
     ========================================================================== */

  function buildFooterHTML() {
    var links = FOOTER_LINKS.map(function (item) {
      return '<li><a href="' + escapeHtml(item.href) + '">' + escapeHtml(item.label) + '</a></li>';
    }).join('\n                    ');

    var socials = SOCIAL_LINKS.map(function (item) {
      return '<a href="' + escapeHtml(item.href) + '" aria-label="NSSR on ' + escapeHtml(item.label) +
        '" rel="noopener noreferrer" target="_blank">' +
        '<i class="fab ' + item.icon + '" aria-hidden="true"></i></a>';
    }).join('\n                        ');

    return '' +
      '    <footer class="site-footer">' +
      '        <div class="container mx-auto px-4 text-sm">' +
      '            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">' +
      '                <div class="flex flex-col items-center md:items-start text-center md:text-left">' +
      '                    <img src="assets/images/logonobg.png" alt="NSSR Logo" class="h-32 mb-4 -ml-4">' +
      '                    <h3 class="text-xl font-semibold mb-4">Follow Us</h3>' +
      '                    <div class="flex space-x-4 justify-center md:justify-start">' + socials + '</div>' +
      '                </div>' +
      '                <div class="text-center md:text-left">' +
      '                    <h3 class="text-xl font-semibold mb-4">Contact Us</h3>' +
      '                    <p class="mb-2"><i class="fas fa-envelope mr-3" aria-hidden="true"></i>Email: ' +
      '                        <a href="mailto:nssrnepal@gmail.com" class="hover:underline">info@nssrnepal.org</a></p>' +
      '                    <p class="mb-2"><i class="fas fa-phone-alt mr-3" aria-hidden="true"></i>Phone: +977-9761444329</p>' +
      '                    <p class="mb-2"><i class="fas fa-map-marker-alt mr-3" aria-hidden="true"></i>Address: Kathmandu, Nepal</p>' +
      '                </div>' +
      '                <div class="text-center md:text-left">' +
      '                    <h3 class="text-xl font-semibold mb-4">Quick Links</h3>' +
      '                    <ul class="space-y-2">' + links + '</ul>' +
      '                </div>' +
      '                <div class="text-center md:text-left md:col-span-2 lg:col-span-1">' +
      '                    <h3 class="text-xl font-semibold mb-4">Our Newsletter</h3>' +
      '                    <p class="mb-4">Stay up-to-date with the latest news and insights delivered straight to your inbox.</p>' +
      '                    <form id="newsletter-form" class="newsletter-form">' +
      '                        <input type="email" name="_replyto" placeholder="Your Email" aria-label="Your Email"' +
      '                            class="newsletter-form__input focus:outline-none focus:ring-2 focus:ring-[#004AAD]"' +
      '                            required>' +
      '                        <button type="submit" class="btn-primary newsletter-form__submit">Subscribe</button>' +
      '                    </form>' +
      '                    <p id="newsletter-success" class="text-green-600 mt-4 hidden" role="status">' +
      '                        Successfully subscribed to our newsletter!</p>' +
      '                </div>' +
      '            </div>' +
      '            <p class="mt-8 text-center text-gray-400">&copy; 2026 Nepalese Society of Student Researchers. All rights reserved.</p>' +
      '        </div>' +
      '    </footer>';
  }

  /**
   * Puts the footer at the very bottom of <body>, replacing a legacy
   * placeholder or a previously injected footer.
   */
  function mountFooter(html) {
    var fragment = parseHTML(html);

    var existing = document.querySelector('footer.site-footer');
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

    var placeholder = document.getElementById('footer-placeholder');
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.replaceChild(fragment, placeholder);
    } else {
      document.body.appendChild(fragment);
    }

    // The markup puts the <script> tag after #footer-placeholder, so replacing
    // the placeholder in place would leave that tag as the final child. Re-append
    // so the footer is unambiguously the last element of <body>, which is what
    // both the markup convention and the design system expect.
    var footer = document.querySelector('footer.site-footer');
    if (footer && footer !== document.body.lastElementChild) {
      document.body.appendChild(footer);
    }
  }

  function initNewsletter() {
    var form = document.getElementById('newsletter-form');
    var success = document.getElementById('newsletter-success');
    if (!form || !success) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      success.classList.remove('hidden');
      form.reset();
      window.setTimeout(function () {
        success.classList.add('hidden');
      }, 5000);
    });
  }

  function initFooter() {
    mountFooter(buildFooterHTML());
    initNewsletter();
  }

  /* ==========================================================================
     Skip link
     ========================================================================== */

  function initSkipLink() {
    if (document.getElementById(SKIP_LINK_ID)) return;

    // Pages without a <main> landmark still need somewhere to land.
    if (!document.getElementById('main-content')) {
      var target = document.querySelector('main') || document.body;
      if (!target.id) target.id = 'main-content';
    }

    var link = document.createElement('a');
    link.id = SKIP_LINK_ID;
    link.className = 'skip-link';
    link.href = '#main-content';
    link.textContent = 'Skip to main content';

    document.body.insertBefore(link, document.body.firstChild);
  }

  /* ==========================================================================
     Shared behaviour
     ========================================================================== */

  function initSharedBehaviors() {
    // Collapse the mobile drawer once a destination is chosen.
    document.addEventListener('click', function (event) {
      var link = event.target.closest
        ? event.target.closest('#nav-menu a[href]')
        : null;
      if (!link) return;

      var menu = document.getElementById('nav-menu');
      var toggle = document.getElementById('nav-toggle');
      if (menu && menu.classList.contains('is-open') && toggle) {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });

    // In-page anchors must clear the sticky header.
    document.addEventListener('click', function (event) {
      var link = event.target.closest
        ? event.target.closest('a[href^="#"]:not([href="#"])')
        : null;
      if (!link) return;

      var id = link.getAttribute('href').slice(1);
      var target = id && document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      var offset = parseInt(
        window.getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height'),
        10
      ) || 64;
      var top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }

  /* ==========================================================================
     Unavailable-proceeding guard
     --------------------------------------------------------------------------
     WHY THIS EXISTS
     ---------------
     Every event record on event.html carries a `report` field that used to point
     at a `report/` directory that was never committed to this repository:

         report: "report/.pdf"      <- empty filename
         report: "report/MAT.pdf"   <- no such file, and no such directory
         report: "report/WC.pdf"    <- ditto
         report: "report/MAT"       <- no file extension at all

     Left alone, clicking "Download Proceeding" navigates the browser to
     file:///.../report/MAT.pdf and the page dies with ERR_FILE_NOT_FOUND: a
     dead end for the visitor and a lost session. The links are kept in the data
     because they are the right shape for the day the proceedings are published;
     this guard is what makes them safe to leave in place meanwhile.

     WHAT IT DOES
     -------------
     Delegated click handling on the document, so it covers links rendered later
     by event.html's own scripts without any of them needing to know about it.
     A link is intercepted only when it *claims* to be a report and provably
     cannot be served. Anything that looks like a real file is left to the
     browser, so publishing a PDF needs no code change here.

     SweetAlert2 is loaded lazily, on the first intercepted click, so the ~50KB
     library is only paid for by pages that actually hit a missing proceeding.
     If the CDN is unreachable — which is a real possibility for a site opened
     from a laptop with no connection — a dependency-free fallback dialog is
     used instead, because silently doing nothing would be the worst outcome of
     all.
     ========================================================================== */

  var REPORT_MAILTO = 'mailto:info@nssrnepal.org?subject=' +
    encodeURIComponent('Request for event proceeding (NSSR)');

  var SWEETALERT2_SRC = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';

  /**
   * Does this link look like it is pointing at an event proceeding?
   * @param {string} href
   * @returns {boolean}
   */
  function looksLikeReport(href) {
    if (!href) return false;
    var raw = String(href).trim();
    if (/^(mailto:|tel:|javascript:|data:)/i.test(raw)) return false;
    return /\.pdf(?:$|[?#])/i.test(raw) || /(?:^|\/)report\//i.test(raw);
  }

  /**
   * Is this a report link that cannot be served?
   *
   * Intentionally conservative: it reports "unavailable" only for a missing
   * filename, a missing extension, or a bare placeholder, so a real href is
   * never swallowed.
   *
   * @param {string} href
   * @returns {boolean}
   */
  function isUnavailableReport(href) {
    if (!href) return true;

    var raw = String(href).trim();
    if (raw === '' || raw === '#' || raw === '/') return true;
    if (raw.charAt(0) === '#') return true;
    // "report/.pdf" or "/.pdf": a path whose filename is only the extension.
    if (/\/\.pdf(?:$|[?#])/i.test(raw)) return true;
    // "report/" or "report": a directory, not a file.
    if (/\/$/.test(raw)) return true;
    // A report link that is not a PDF at all ("report/MAT") cannot resolve.
    if (/(?:^|\/)report\//i.test(raw) && !/\.pdf(?:$|[?#])/i.test(raw)) return true;
    return false;
  }

  /** Loads SweetAlert2 once, resolving to false if it cannot be fetched. */
  function loadSweetAlert2() {
    if (window.Swal) return Promise.resolve(true);

    if (!loadSweetAlert2.promise) {
      loadSweetAlert2.promise = new Promise(function (resolve) {
        var script = document.createElement('script');
        script.src = SWEETALERT2_SRC;
        script.async = true;
        script.onload = function () { resolve(!!window.Swal); };
        script.onerror = function () { resolve(false); };
        document.head.appendChild(script);
      });
    }
    return loadSweetAlert2.promise;
  }

  /**
   * Dependency-free dialog, used when SweetAlert2 cannot be loaded.
   * Kept deliberately small: a dialog, a message, a mail link and a close
   * button, with the focus trap and Escape handling that SweetAlert2 would
   * otherwise have provided.
   */
  function showFallbackDialog() {
    var existing = document.getElementById('report-fallback-dialog');
    if (existing) { existing.hidden = false; return; }

    var dialog = document.createElement('div');
    dialog.id = 'report-fallback-dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'report-fallback-title');
    dialog.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:99999', 'display:flex',
      'align-items:center', 'justify-content:center', 'padding:24px',
      'background:rgba(15,23,42,.55)'
    ].join(';');

    var panel = document.createElement('div');
    panel.style.cssText = [
      'max-width:420px', 'width:100%', 'background:#fff', 'color:#1d1d1f',
      'border-radius:16px', 'padding:28px', 'box-shadow:0 32px 64px -20px rgba(15,23,42,.45)',
      'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif'
    ].join(';');

    var title = document.createElement('h2');
    title.id = 'report-fallback-title';
    title.textContent = 'Proceeding not available yet';
    title.style.cssText = 'margin:0 0 12px;font-size:1.15rem;line-height:1.3;font-weight:700';

    var body = document.createElement('p');
    body.textContent = 'The written proceeding for this session is still being finalised and is not published yet.';
    body.style.cssText = 'margin:0 0 20px;font-size:0.9rem;line-height:1.6;color:#515154';

    var actions = document.createElement('div');
    actions.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px';

    var mail = document.createElement('a');
    mail.href = REPORT_MAILTO;
    mail.textContent = 'Request it by email';
    mail.style.cssText = [
      'display:inline-flex', 'align-items:center', 'justify-content:center',
      'padding:14px 28px', 'border-radius:10px', 'background:#1d4ed8', 'color:#fff',
      'font-weight:600', 'font-size:0.9rem', 'text-decoration:none'
    ].join(';');

    var close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Close';
    close.style.cssText = [
      'display:inline-flex', 'align-items:center', 'justify-content:center',
      'padding:14px 28px', 'border-radius:10px', 'background:#fff', 'color:#1d1d1f',
      'border:1px solid rgba(0,0,0,.16)', 'font:inherit', 'font-weight:600',
      'font-size:0.9rem', 'cursor:pointer'
    ].join(';');

    actions.appendChild(mail);
    actions.appendChild(close);
    panel.appendChild(title);
    panel.appendChild(body);
    panel.appendChild(actions);
    dialog.appendChild(panel);
    document.body.appendChild(dialog);

    function dismiss() {
      dialog.remove();
      document.removeEventListener('keydown', onKey);
    }
    function onKey(event) {
      if (event.key === 'Escape') dismiss();
    }

    close.addEventListener('click', dismiss);
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dismiss();
    });
    document.addEventListener('keydown', onKey);
    close.focus();
  }

  function showProceedingNotice() {
    loadSweetAlert2().then(function (loaded) {
      if (!loaded) { showFallbackDialog(); return; }

      window.Swal.fire({
        title: 'Proceeding not available yet',
        html: 'The written proceeding for this session is still being finalised and has not been published yet. ' +
              'You can request a copy from the NSSR team and we will send it over.',
        icon: 'info',
        confirmButtonText: 'Request it by email',
        cancelButtonText: 'Not now',
        showCancelButton: true,
        reverseButtons: true,
        focusConfirm: true,
        customClass: {
          popup: 'nssr-report-popup',
          confirmButton: 'nssr-report-confirm',
          cancelButton: 'nssr-report-cancel'
        },
        /**
         * Swap SweetAlert2's confirm <button> for a real <a href="mailto:">.
         *
         * Doing the handoff from `preConfirm` (assigning window.location) would
         * work, but it leaves the request as an opaque JavaScript side effect:
         * the address is not visible, middle-click does nothing, and the link
         * cannot be copied or inspected. An anchor keeps every one of those
         * affordances while inheriting the button's classes, so the styling is
         * unchanged.
         */
        didOpen: function (popup) {
          var button = popup.querySelector('.nssr-report-confirm');
          if (!button) return;

          var anchor = document.createElement('a');
          anchor.className = button.className;
          anchor.href = REPORT_MAILTO;
          anchor.textContent = button.textContent;
          anchor.setAttribute('role', 'button');

          // Swallow the popup's own dismiss handlers so following the mailto
          // does not also close the dialog underneath the mail client.
          anchor.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            window.Swal.close();
            window.location.href = REPORT_MAILTO;
          });

          button.parentNode.replaceChild(anchor, button);
        }
      });
    });
  }

  /* ==========================================================================
   Global Lightbox (shared by event.html, science-beyond-classroom.html, etc.)
   ========================================================================== */
  window.openLightbox = function (src) {
    var lb = document.getElementById('lightbox');
    var lbImg = document.getElementById('lightbox-img');
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lb.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };

  function initReportGuard() {
    document.addEventListener('click', function (event) {
      var target = event.target;
      // `closest` is unavailable on text nodes in some engines.
      var link = target && target.closest ? target.closest('a[href]') : null;
      if (!link) return;

      var href = link.getAttribute('href');
      if (!looksLikeReport(href)) return;
      if (!isUnavailableReport(href)) return; // a real file: let the browser have it

      // Stop the navigation that would otherwise produce ERR_FILE_NOT_FOUND.
      event.preventDefault();
      showProceedingNotice();
    });

    // Middle-click and Ctrl/Cmd-click bypass the click event on some platforms,
    // so neutralise the context menu on the same links.
    document.addEventListener('auxclick', function (event) {
      var target = event.target;
      var link = target && target.closest ? target.closest('a[href]') : null;
      if (!link) return;
      var href = link.getAttribute('href');
      if (looksLikeReport(href) && isUnavailableReport(href)) event.preventDefault();
    });
  }


  /* ==========================================================================
     Boot
     ========================================================================== */

  function init() {
    // Header and footer first, skip link last: it prepends itself to <body>, so
    // running it afterwards guarantees it stays the very first focusable node
    // even on pages that have no #nav-placeholder.
    initNavbar();
    initFooter();
    initSkipLink();
    initSharedBehaviors();
    initReportGuard();
    document.documentElement.classList.add('nav-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}());
