/* DanceHub - código compartido por todas las páginas (iconos, helpers, menú, almacenamiento) */
(function () {
  "use strict";

  /* ============================== Iconos ============================== */
  var ICON_PATHS = {
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
    sparkles: '<path d="m12 3-1.2 3.5L7 8l3.8 1.5L12 13l1.2-3.5L17 8l-3.8-1.5L12 3Z"/><path d="m5 13-.8 2.2L2 16l2.2.8L5 19l.8-2.2L8 16l-2.2-.8L5 13ZM19 14l-.6 1.5-1.4.5 1.4.5L19 18l.6-1.5L21 16l-1.4-.5L19 14Z"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    shirt: '<path d="M8.5 3A3.5 3.5 0 0 0 12 6.5 3.5 3.5 0 0 0 15.5 3L21 6l-2 5-3-1v11H8V10l-3 1-2-5 5.5-3Z"/>',
    ticket: '<path d="M2 9a3 3 0 0 0 0 6v4h20v-4a3 3 0 0 0 0-6V5H2v4Z"/><path d="M13 5v2M13 10v4M13 17v2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v5M14 11v5"/>',
    arrow: '<path d="m15 18-6-6 6-6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    play: '<path d="m8 5 11 7-11 7Z"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    logout: '<path d="M10 17l5-5-5-5M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>'
  };

  function icon(name, size) {
    size = size || 20;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON_PATHS[name] + '</svg>';
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* ============================== Datos ============================== */
  var initialDancers = [
    { id: 1, name: "Laura Gómez", age: "19", document: "1234567890", phone: "300 123 4567", email: "laura@gmail.com", address: "Calle 24 # 18-30", level: "Intermedio", dance: "Salsa", classes: ["Salsa Intermedio", "Bachata Avanzada"], date: "2026-02-10", status: "Activa", initials: "LG", tone: "lilac" },
    { id: 2, name: "Valentina Pérez", age: "21", document: "1032456789", phone: "315 428 1098", email: "valentina@email.com", address: "Carrera 8 # 45-20", level: "Avanzado", dance: "Bachata", classes: ["Bachata Avanzada", "Danza Contemporánea"], date: "2025-08-14", status: "Activa", initials: "VP", tone: "pink" },
    { id: 3, name: "Camila Rodríguez", age: "18", document: "1008234567", phone: "310 520 8876", email: "camila@email.com", address: "Calle 12 # 10-05", level: "Intermedio", dance: "Ballet", classes: ["Ballet Principiante"], date: "2025-11-02", status: "Activa", initials: "CR", tone: "blue" },
    { id: 4, name: "Sofía Martínez", age: "24", document: "1022546781", phone: "301 678 2240", email: "sofia@email.com", address: "Avenida 6 # 20-11", level: "Principiante", dance: "Contemporáneo", classes: ["Danza Contemporánea"], date: "2026-01-21", status: "Inactiva", initials: "SM", tone: "orange" },
    { id: 5, name: "Isabella Torres", age: "20", document: "1099234512", phone: "320 889 4321", email: "isabella@email.com", address: "Calle 19 # 4-55", level: "Avanzado", dance: "Salsa", classes: ["Salsa Intermedio", "Bachata Avanzada", "Danza Contemporánea"], date: "2025-06-12", status: "Activa", initials: "IT", tone: "green" }
  ];

  var navItems = [
    { page: "home", label: "Inicio", icon: "home" },
    { page: "dancers", label: "Bailarines", icon: "users" },
    { page: "classes", label: "Clases", icon: "calendar" },
    { page: "choreographies", label: "Coreografías", icon: "sparkles" },
    { page: "music", label: "Música", icon: "music" },
    { page: "wardrobe", label: "Vestuario", icon: "shirt" },
    { page: "events", label: "Eventos", icon: "ticket" }
  ];

  /* Cada "página" lógica de la app original ahora es un archivo HTML */
  var PAGE_URLS = {
    home: "index.html",
    dancers: "bailarines.html",
    "new": "nuevo-bailarin.html",
    edit: "editar-bailarin.html",
    detail: "perfil-bailarin.html",
    classes: "clases.html",
    choreographies: "coreografias.html",
    music: "musica.html",
    wardrobe: "vestuario.html",
    events: "eventos.html"
  };

  function urlFor(page, id) {
    var url = PAGE_URLS[page] || PAGE_URLS.home;
    return id != null ? url + "?id=" + encodeURIComponent(id) : url;
  }

  function queryId() {
    var m = /[?&]id=([^&]*)/.exec(window.location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }

  /* ============================== Almacenamiento ============================== */
  /* Al ser páginas separadas, el estado ya no vive en memoria: se guarda en localStorage. */
  var KEY_DANCERS = "dancehub.dancers";
  var KEY_FLASH = "dancehub.flash";

  function readJSON(key) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (err) { return null; }
  }

  function writeJSON(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) { return false; }
  }

  function cloneDancer(d) { return Object.assign({}, d, { classes: d.classes.slice() }); }

  function loadDancers() {
    var saved = readJSON(KEY_DANCERS);
    if (Array.isArray(saved)) return saved;
    return initialDancers.map(cloneDancer);
  }

  function saveDancers(list) { return writeJSON(KEY_DANCERS, list); }

  function loadCollection(type, defaults) {
    var saved = readJSON("dancehub.col." + type);
    if (Array.isArray(saved)) return saved;
    return defaults.map(function (item) { return Object.assign({}, item); });
  }

  function saveCollection(type, items) { return writeJSON("dancehub.col." + type, items); }

  /* Mensaje que se muestra en la página siguiente (p. ej. tras guardar y volver a la lista) */
  function setFlash(message) {
    try { window.sessionStorage.setItem(KEY_FLASH, message); } catch (err) { /* sin almacenamiento */ }
  }

  function takeFlash() {
    try {
      var m = window.sessionStorage.getItem(KEY_FLASH);
      window.sessionStorage.removeItem(KEY_FLASH);
      return m || "";
    } catch (err) { return ""; }
  }

  /* ============================== Componentes (HTML) ============================== */
  function btn(label, opts) {
    opts = opts || {};
    var variant = opts.variant || "primary";
    var type = opts.type || "button";
    var cls = opts.className || "";
    return '<button type="' + type + '" class="btn btn-' + variant + ' ' + cls + '" ' + (opts.attrs || "") + '>' +
      (opts.icon ? icon(opts.icon, 18) : "") + '<span>' + label + '</span></button>';
  }

  function badge(text, muted) {
    return '<span class="badge ' + (muted ? "badge-muted" : "") + '">' + esc(text) + '</span>';
  }

  function personAvatar(d, size, id) {
    size = size || "";
    return '<span ' + (id ? 'id="' + id + '" ' : "") + 'class="avatar ' + size + ' ' + d.tone + '">' +
      (d.photo ? '<img src="' + esc(d.photo) + '" alt="Foto de ' + esc(d.name) + '"/>' : esc(d.initials)) + '</span>';
  }

  function pageHeading(eyebrow, title, subtitle, action) {
    return '<div class="page-heading"><div>' + (eyebrow ? '<p class="eyebrow">' + eyebrow + '</p>' : "") +
      '<h1>' + esc(title) + '</h1><p>' + esc(subtitle) + '</p></div>' + (action || "") + '</div>';
  }

  function initialsOf(name) {
    return name.split(" ").map(function (x) { return x[0]; }).slice(0, 2).join("").toUpperCase();
  }

  /* ============================== Estructura común (menú lateral + barra superior) ============================== */
  var toastText = "";

  function buildShell(activePage) {
    var root = document.getElementById("root");
    root.innerHTML =
      '<div class="app-shell">' +
        '<aside class="sidebar" id="sidebar">' +
          '<div class="brand">' +
            '<div class="brand-mark">' + icon("sparkles", 24) + '</div>' +
            '<div><strong>Decanfro</strong><span>Academia de danza</span></div>' +
            '<button class="icon-button mobile-close" data-action="close-menu" aria-label="Cerrar menú">' + icon("close") + '</button>' +
          '</div>' +
          '<nav class="nav-list" id="nav-list" aria-label="Navegación principal"></nav>' +
          '<div class="sidebar-profile">' +
            '<div class="avatar small lilac">LF</div><div><strong>Luisa Fernanda</strong><span>Administradora</span></div>' + icon("logout", 18) +
          '</div>' +
        '</aside>' +
        '<div id="backdrop-host"></div>' +
        '<main class="main">' +
          '<header class="topbar">' +
            '<button class="icon-button mobile-menu" data-action="open-menu" aria-label="Abrir menú">' + icon("menu") + '</button>' +
            '<div class="mobile-brand"><div class="brand-mark">' + icon("sparkles", 20) + '</div><strong>DanceHub</strong></div>' +
            '<div class="top-actions"><button class="help-pill">¿Necesitas ayuda?</button><div class="avatar small pink">LF</div></div>' +
          '</header>' +
          '<div class="content" id="content"></div>' +
        '</main>' +
        '<div id="overlay-host"></div>' +
        '<div id="toast-host"></div>' +
      '</div>';
    renderNav(activePage);
    var pending = takeFlash();
    if (pending) flash(pending);
  }

  function renderNav(activePage) {
    var activeParent = activePage === "new" || activePage === "edit" || activePage === "detail" ? "dancers" : activePage;
    document.getElementById("nav-list").innerHTML =
      '<p class="nav-label">MENÚ PRINCIPAL</p>' +
      navItems.map(function (item) {
        var active = activeParent === item.page;
        return '<a href="' + urlFor(item.page) + '" class="nav-item ' + (active ? "active" : "") + '"' + (active ? ' aria-current="page"' : "") + '>' +
          icon(item.icon) + '<span>' + item.label + '</span>' + (active ? '<span class="active-dot"></span>' : "") + '</a>';
      }).join("");
  }

  function renderToast() {
    document.getElementById("toast-host").innerHTML = toastText
      ? '<div class="toast"><span class="toast-icon">' + icon("check", 17) + '</span><span>' + esc(toastText) + '</span>' +
        '<button data-action="close-toast" aria-label="Cerrar">' + icon("close", 16) + '</button></div>'
      : "";
  }

  function flash(message) {
    toastText = message;
    renderToast();
    window.setTimeout(function () {
      if (toastText === message) { toastText = ""; renderToast(); }
    }, 3400);
  }

  function setMobile(open) {
    document.getElementById("sidebar").classList.toggle("sidebar-open", open);
    document.getElementById("backdrop-host").innerHTML = open
      ? '<button class="sidebar-backdrop" data-action="close-menu" aria-label="Cerrar menú"></button>'
      : "";
  }

  function go(page, id) {
    window.location.href = urlFor(page, id);
  }

  /* Acciones comunes a todas las páginas */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-action]");
    if (!el) return;
    switch (el.getAttribute("data-action")) {
      case "navigate": go(el.getAttribute("data-page")); break;
      case "open-menu": setMobile(true); break;
      case "close-menu": setMobile(false); break;
      case "close-toast": toastText = ""; renderToast(); break;
    }
  });

  window.DH = {
    icon: icon, esc: esc, btn: btn, badge: badge, personAvatar: personAvatar,
    pageHeading: pageHeading, initialsOf: initialsOf,
    urlFor: urlFor, go: go, queryId: queryId,
    loadDancers: loadDancers, saveDancers: saveDancers,
    loadCollection: loadCollection, saveCollection: saveCollection,
    setFlash: setFlash, flash: flash,
    buildShell: buildShell
  };
})();
