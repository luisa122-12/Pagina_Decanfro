/* DanceHub - módulos Clases, Coreografías, Música, Vestuario y Eventos */
(function () {
  "use strict";
  var DH = window.DH;
  var icon = DH.icon, esc = DH.esc, btn = DH.btn, badge = DH.badge, personAvatar = DH.personAvatar,
      pageHeading = DH.pageHeading, initialsOf = DH.initialsOf;

  var moduleData = {
    classes: { eyebrow: "PROGRAMACIÓN", title: "Clases", subtitle: "Consulta los horarios y clases programadas.", icon: "calendar", add: "Nueva clase", items: [
      { title: "Salsa Intermedio", tag: "Intermedio", meta: "Martes · 4:00 p. m.", foot: "Carlos Martínez", note: "Salón Principal" },
      { title: "Ballet Principiante", tag: "Principiante", meta: "Miércoles · 3:00 p. m.", foot: "Natalia López", note: "Salón Espejos" },
      { title: "Bachata Avanzada", tag: "Avanzado", meta: "Jueves · 6:30 p. m.", foot: "Diego Ramírez", note: "Salón Principal" },
      { title: "Danza Contemporánea", tag: "Intermedio", meta: "Sábado · 10:00 a. m.", foot: "María Fernanda", note: "Salón Norte" }
    ] },
    choreographies: { eyebrow: "CREACIONES", title: "Coreografías", subtitle: "Organiza montajes, ensayos y participantes.", icon: "sparkles", add: "Nueva coreografía", items: [
      { title: "Ritmo Latino", tag: "Salsa", meta: "5 minutos", foot: "Carlos Martínez", note: "12 bailarines" },
      { title: "Alma en movimiento", tag: "Contemporáneo", meta: "7 minutos", foot: "María Fernanda", note: "8 bailarines" },
      { title: "Raíces", tag: "Folclor", meta: "6 minutos", foot: "Natalia López", note: "16 bailarines" }
    ] },
    events: { eyebrow: "AGENDA", title: "Eventos", subtitle: "Planea presentaciones y fechas importantes.", icon: "ticket", add: "Nuevo evento", items: [
      { title: "Festival de Danza", tag: "20 NOV", meta: "6:00 p. m.", foot: "Teatro Municipal", note: "4 coreografías" },
      { title: "Muestra de fin de año", tag: "03 DIC", meta: "5:30 p. m.", foot: "Auditorio Central", note: "6 coreografías" },
      { title: "Competencia regional", tag: "15 DIC", meta: "9:00 a. m.", foot: "Coliseo Norte", note: "3 coreografías" }
    ] },
    wardrobe: { eyebrow: "INVENTARIO", title: "Vestuario", subtitle: "Controla las prendas y su disponibilidad.", icon: "shirt", add: "Nueva prenda", items: [
      { title: "Traje de Salsa", tag: "Talla M", meta: "12 unidades", foot: "Disponible", note: "Rojo y negro" },
      { title: "Vestido de Ballet", tag: "Talla S", meta: "8 unidades", foot: "Disponible", note: "Rosa pastel" },
      { title: "Conjunto Contemporáneo", tag: "Talla M", meta: "3 unidades", foot: "Stock bajo", note: "Marfil" },
      { title: "Traje Folclórico", tag: "Talla L", meta: "10 unidades", foot: "Disponible", note: "Multicolor" }
    ] },
    music: { eyebrow: "BIBLIOTECA", title: "Música", subtitle: "Tu colección musical para clases y coreografías.", icon: "music", add: "Nueva canción", items: [
      { title: "Vivir Mi Vida", tag: "Salsa", meta: "Marc Anthony", foot: "Ritmo Latino", note: "4:12" },
      { title: "Propuesta Indecente", tag: "Bachata", meta: "Romeo Santos", foot: "Pasión", note: "3:55" },
      { title: "Experience", tag: "Instrumental", meta: "Ludovico Einaudi", foot: "Alma en movimiento", note: "5:15" },
      { title: "La Bicicleta", tag: "Tropical", meta: "Shakira & Carlos Vives", foot: "Raíces", note: "3:48" }
    ] }
  };

  var collectionLabels = {
    classes: ["Nombre de la clase", "Nivel", "Día y hora", "Instructor", "Salón"],
    choreographies: ["Nombre de la coreografía", "Tipo de danza", "Duración", "Instructor", "Participantes"],
    music: ["Nombre de la canción", "Género", "Artista", "Coreografía relacionada", "Duración"],
    wardrobe: ["Nombre de la prenda", "Talla", "Cantidad", "Estado", "Color / detalles"],
    events: ["Nombre del evento", "Fecha", "Hora", "Lugar", "Coreografías participantes"]
  };

  var PAGE = document.body.getAttribute("data-page");
  var col = null;

  function initCol(type) {
    col = {
      type: type,
      data: moduleData[type],
      items: DH.loadCollection(type, moduleData[type].items),
      selected: null,
      playing: "",
      creating: false,
      created: false,
      draft: { title: "", tag: "", meta: "", foot: "", note: "" }
    };
  }

  function collectionGridHTML() {
    var type = col.type;
    var data = col.data;
    return col.items.map(function (item, index) {
      var infoIcon = type === "events" ? "pin" : type === "music" ? "sparkles" : type === "wardrobe" ? "check" : "users";
      var isPlaying = col.playing === item.title;
      return '<article class="module-card">' +
        '<div class="module-card-top"><span class="module-icon tone-' + (index % 4) + '">' + icon(data.icon) + '</span>' + badge(item.tag, index === 2) + '</div>' +
        '<h2>' + esc(item.title) + '</h2><p class="module-meta">' + esc(item.meta) + '</p>' +
        '<div class="module-info"><span>' + icon(infoIcon, 16) + esc(item.foot) + '</span><small>' + esc(item.note) + '</small></div>' +
        '<div class="module-actions">' +
          (type === "music"
            ? '<button class="play-button ' + (isPlaying ? "playing" : "") + '" data-action="toggle-play" data-index="' + index + '">' + icon(isPlaying ? "pause" : "play", 16) + (isPlaying ? "Pausar" : "Reproducir") + '</button>'
            : "") +
          '<button class="open-detail" data-action="select-item" data-index="' + index + '">Ver detalles ' + icon("chevron", 16) + '</button>' +
        '</div></article>';
    }).join("");
  }

  function collectionOverlaysHTML() {
    var type = col.type;
    var data = col.data;
    var labels = collectionLabels[type];
    var html = "";

    if (col.selected) {
      var s = col.selected;
      html += '<div class="drawer-layer" data-action="drawer-bg"><aside class="detail-drawer">' +
        '<button class="modal-close" data-action="close-drawer">' + icon("close") + '</button>' +
        '<span class="drawer-icon">' + icon(data.icon, 28) + '</span>' +
        '<p class="eyebrow">' + esc(data.title.toUpperCase()) + '</p><h2>' + esc(s.title) + '</h2>' + badge(s.tag) +
        '<div class="drawer-details">' +
          '<div><small>Información</small><strong>' + esc(s.meta) + '</strong></div>' +
          '<div><small>' + (type === "events" ? "Lugar" : type === "music" ? "Coreografía" : "Responsable / Estado") + '</small><strong>' + esc(s.foot) + '</strong></div>' +
          '<div><small>Detalles</small><strong>' + esc(s.note) + '</strong></div>' +
        '</div>' +
        btn("Entendido", { className: "full-button", attrs: 'data-action="close-drawer"' }) +
      '</aside></div>';
    }

    if (col.creating) {
      var draftField = function (key, index, required) {
        return '<label class="field"><span>' + esc(labels[index]) + (required ? " *" : "") + '</span>' +
          '<input data-draft="' + key + '" value="' + esc(col.draft[key]) + '" placeholder="Escribe ' + esc(labels[index].toLowerCase()) + '"' + (required ? " required" : "") + '/></label>';
      };
      html += '<div class="modal-layer" role="dialog" aria-modal="true"><form class="modal-card create-modal" data-form="create">' +
        '<button type="button" class="modal-close" data-action="close-create" aria-label="Cerrar">' + icon("close", 19) + '</button>' +
        '<span class="create-icon">' + icon(data.icon, 22) + '</span>' +
        '<p class="eyebrow">NUEVO REGISTRO</p><h2>' + esc(data.add) + '</h2>' +
        '<p>Completa la información para agregarlo a ' + esc(data.title.toLowerCase()) + '.</p>' +
        '<div class="create-form">' + draftField("title", 0, true) + draftField("tag", 1, true) + draftField("meta", 2, true) + draftField("foot", 3) + draftField("note", 4) + '</div>' +
        '<div class="modal-actions">' +
          btn("Cancelar", { variant: "secondary", attrs: 'data-action="close-create"' }) +
          btn("Guardar", { type: "submit", icon: "check" }) +
        '</div></form></div>';
    }

    if (col.created) {
      html += '<div class="toast"><span class="toast-icon">' + icon("check", 17) + '</span><span>Registro creado correctamente.</span>' +
        '<button data-action="close-created" aria-label="Cerrar">' + icon("close", 16) + '</button></div>';
    }
    return html;
  }

  function collectionPageHTML() {
    var data = col.data;
    return '<div>' +
      pageHeading(data.eyebrow, data.title, data.subtitle, btn(data.add, { icon: "plus", attrs: 'data-action="open-create"' })) +
      '<div class="module-grid" id="col-grid">' + collectionGridHTML() + '</div>' +
      '<div id="col-overlays">' + collectionOverlaysHTML() + '</div>' +
    '</div>';
  }

  function renderColGrid() {
    var el = document.getElementById("col-grid");
    if (el && col) el.innerHTML = collectionGridHTML();
  }

  function renderColOverlays() {
    var el = document.getElementById("col-overlays");
    if (el && col) el.innerHTML = collectionOverlaysHTML();
  }

  function createItem() {
    var c = col;
    if (!c.draft.title.trim() || !c.draft.tag.trim() || !c.draft.meta.trim()) return;
    c.items = [Object.assign({}, c.draft)].concat(c.items);
    DH.saveCollection(c.type, c.items);
    c.draft = { title: "", tag: "", meta: "", foot: "", note: "" };
    c.creating = false;
    c.created = true;
    renderColGrid();
    renderColOverlays();
    window.setTimeout(function () {
      c.created = false;
      if (col === c) renderColOverlays();
    }, 3000);
  }

  /* ============================== Eventos ============================== */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-action]");
    if (!el || !col) return;
    var action = el.getAttribute("data-action");
    if (action === "drawer-bg" && e.target.closest(".detail-drawer")) return;

    switch (action) {
      case "open-create": col.creating = true; renderColOverlays(); break;
      case "close-create": col.creating = false; renderColOverlays(); break;
      case "select-item": col.selected = col.items[Number(el.getAttribute("data-index"))]; renderColOverlays(); break;
      case "close-drawer":
      case "drawer-bg": col.selected = null; renderColOverlays(); break;
      case "close-created": col.created = false; renderColOverlays(); break;
      case "toggle-play":
        var item = col.items[Number(el.getAttribute("data-index"))];
        col.playing = col.playing === item.title ? "" : item.title;
        renderColGrid();
        break;
    }
  });

  document.addEventListener("input", function (e) {
    var t = e.target;
    if (t.hasAttribute && t.hasAttribute("data-draft") && col) {
      col.draft[t.getAttribute("data-draft")] = t.value;
    }
  });

  document.addEventListener("submit", function (e) {
    var f = e.target;
    if (!f.hasAttribute || f.getAttribute("data-form") !== "create") return;
    e.preventDefault();
    createItem();
  });

  /* ============================== Inicio ============================== */
  DH.buildShell(PAGE);
  initCol(PAGE);
  document.getElementById("content").innerHTML = collectionPageHTML();
})();
