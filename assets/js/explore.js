(function () {
  'use strict';

  function getCategoryFromURL() {
    var params = new URLSearchParams(window.location.search);
    return params.get('category') || 'workshops';
  }

  function setActiveCategory(category) {
    var buttons = document.querySelectorAll('.explore-tab-btn');
    var panels = document.querySelectorAll('.explore-tab-panel');

    buttons.forEach(function (btn) {
      var isActive = btn.getAttribute('data-category') === category;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panels.forEach(function (panel) {
      var isActive = panel.id === 'panel-' + category;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });
  }

  function initTabs() {
    var buttons = document.querySelectorAll('.explore-tab-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var category = btn.getAttribute('data-category');
        setActiveCategory(category);
        history.replaceState(null, '', '?category=' + category);
      });
    });
  }

  function init() {
    var category = getCategoryFromURL();
    var validCategories = ['workshops', 'events', 'gallery'];
    if (!validCategories.includes(category)) {
      category = 'workshops';
    }
    setActiveCategory(category);
    initTabs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}());