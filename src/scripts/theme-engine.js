// Generative theme engine — inlined into <head> by Base.astro so it runs before
// first paint (no flash). Every visit gets a theme generated from:
//   · geography  — the viewer's timezone/UTC offset picks the accent hue
//                  (west → warm, east → cool), jittered per timezone name
//   · visit count — rotates the hue by the golden angle and unlocks families
//   · local time  — families that support it go light by day, dark by night
// A "visit" is a browser session: navigating between pages keeps the theme,
// coming back later generates a new one. Nothing leaves the browser.
// Overrides for previews/screenshots: ?theme=<family>&hue=<0-360>&mode=light|dark
(function () {
  var FAMILIES = {
    refined: { label: 'Refined', modes: ['dark'], fonts: [] },
    editorial: { label: 'Editorial', modes: ['light', 'dark'], fonts: ['Instrument+Serif:ital@0;1', 'Inter:wght@400;500;600'] },
    swiss: { label: 'Swiss', modes: ['light'], fonts: ['Inter+Tight:wght@400;500;600;700'] },
    terminal: { label: 'Terminal', modes: ['dark'], fonts: [] },
    original: { label: 'Original', modes: ['dark'], fonts: [] },
  };
  // First visits get a fixed, curated sequence; after that it's generative.
  var SEQUENCE = ['refined', 'editorial', 'swiss'];
  var GOLDEN = 137.508;

  function store(kind) {
    try { return window[kind]; } catch (e) { return null; }
  }
  function get(s, k) { try { return s && s.getItem(k); } catch (e) { return null; } }
  function set(s, k, v) { try { s && s.setItem(k, v); } catch (e) {} }
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  function place() {
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    var offset = -new Date().getTimezoneOffset() / 60; // −12 … +14
    var city = (tz.split('/').pop() || 'Somewhere').replace(/_/g, ' ');
    return { tz: tz, offset: offset, city: city };
  }

  function generate(visit, nonce, prev) {
    var p = place();
    var seed = hash(p.tz + '|' + visit + '|' + nonce);
    var names = Object.keys(FAMILIES);
    var family;
    if (!nonce && visit <= SEQUENCE.length) family = SEQUENCE[visit - 1];
    else {
      var pool = names.filter(function (n) { return n !== prev; });
      family = pool[seed % pool.length];
    }
    var hue = ((p.offset + 12) / 26) * 360 + ((hash(p.tz) % 31) - 15) + (visit - 1 + nonce) * GOLDEN;
    var hour = new Date().getHours();
    var modes = FAMILIES[family].modes;
    var mode = modes.length > 1 ? (hour >= 7 && hour < 19 ? 'light' : 'dark') : modes[0];
    return { family: family, hue: Math.round(((hue % 360) + 360) % 360), mode: mode, visit: visit, nonce: nonce, city: p.city };
  }

  function apply(t) {
    var root = document.documentElement;
    root.dataset.theme = t.family;
    root.dataset.mode = t.mode;
    root.style.setProperty('--hue', t.hue);
    var fonts = FAMILIES[t.family].fonts;
    if (fonts.length) {
      var href = 'https://fonts.googleapis.com/css2?family=' + fonts.join('&family=') + '&display=swap';
      if (!document.querySelector('link[href="' + href + '"]')) {
        var l = document.createElement('link');
        l.rel = 'stylesheet'; l.href = href;
        document.head.appendChild(l);
      }
    }
    current = t;
  }

  var ss = store('sessionStorage'), ls = store('localStorage');
  var current = null;
  var q = new URLSearchParams(location.search);
  var forced = q.get('theme');
  var saved = null;
  try { saved = JSON.parse(get(ss, 'jsk:theme') || 'null'); } catch (e) {}

  if (forced && FAMILIES[forced]) {
    var f = generate(1, 0, null);
    f.family = forced;
    if (q.get('hue')) f.hue = +q.get('hue') % 360;
    var m = q.get('mode');
    f.mode = FAMILIES[forced].modes.indexOf(m) >= 0 ? m : FAMILIES[forced].modes[0];
    apply(f);
  } else if (saved && FAMILIES[saved.family]) {
    apply(saved);
  } else {
    var visit = (parseInt(get(ls, 'jsk:visits') || '0', 10) || 0) + 1;
    set(ls, 'jsk:visits', String(visit));
    var t = generate(visit, 0, get(ls, 'jsk:last'));
    set(ls, 'jsk:last', t.family);
    set(ss, 'jsk:theme', JSON.stringify(t));
    apply(t);
  }

  window.siteTheme = {
    families: FAMILIES,
    get current() { return current; },
    shuffle: function () {
      var t = generate(current.visit, current.nonce + 1, current.family);
      set(ss, 'jsk:theme', JSON.stringify(t));
      set(ls, 'jsk:last', t.family);
      apply(t);
      return t;
    },
  };
})();
