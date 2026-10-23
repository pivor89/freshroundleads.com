// FreshRound Leads: nav toggle, header shadow, reveal-on-scroll, year. No tracking, no cookies.
(function () {
  var d = document;
  d.documentElement.classList.add('js');
  var btn = d.querySelector('.nav-toggle'), nav = d.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { btn.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { btn.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); btn.focus(); }
    });
  }
  var header = d.querySelector('.site-header');
  var onScroll = function () { if (header) header.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var els = d.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }
  // Plan buttons: preselect the plan in the sample form (falls back to the default without JS).
  var sel = d.getElementById('f-plan');
  if (sel) {
    var pick = function (key) {
      for (var i = 0; i < sel.options.length; i++) { if (sel.options[i].getAttribute('data-plan') === key) { sel.selectedIndex = i; return true; } }
      return false;
    };
    d.addEventListener('click', function (e) {
      var a = e.target.closest('a[href="#sample"]');
      if (a) pick(a.getAttribute('data-plan') || 'sample');
    });
    var m = /[?&]plan=([a-z]+)/.exec(location.search); if (m) pick(m[1]);
  }
  var y = d.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
