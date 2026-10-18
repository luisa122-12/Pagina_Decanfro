/* DanceHub - módulo Bailarines: lista (bailarines.html), registro (nuevo-bailarin.html),
   edición (editar-bailarin.html) y perfil (perfil-bailarin.html) */
(function () {
  "use strict";
  var DH = window.DH;
  var icon = DH.icon, esc = DH.esc, btn = DH.btn, badge = DH.badge, personAvatar = DH.personAvatar,
      pageHeading = DH.pageHeading, initialsOf = DH.initialsOf;

  var PAGE = document.body.getAttribute("data-page"); // dancers | new | edit | detail

  function makeEmptyForm() {
    return { id: 0, name: "", age: "", document: "", phone: "", email: "", address: "", level: "", dance: "", classes: [], date: "", status: "Activa", initials: "", tone: "lilac" };
  }

  var classOptions = ["Salsa Intermedio", "Ballet Principiante", "Bachata Avanzada", "Danza Contemporánea", "Jazz Juvenil", "Ritmos Urbanos"];

  var state = {
    page: PAGE,
    dancers: DH.loadDancers(),
    selected: null,
    query: "",
    deleteTarget: null
  };

  var formState = null; // { mode, initial, form, errors }

  function filteredDancers() {
    var q = state.query.toLowerCase();
    return state.dancers.filter(function (d) {
      return (d.name + " " + d.dance + " " + d.level).toLowerCase().indexOf(q) !== -1;
    });
  }

  function statusHTML(d) {
    return '<span class="status ' + (d.status === "Inactiva" ? "inactive" : "") + '"><i></i>' + esc(d.status) + '</span>';
  }

  function dancersResultsHTML() {
    var filtered = filteredDancers();
    var table = '<div class="data-table">' +
      '<div class="table-row table-head"><span>BAILARÍN</span><span>CONTACTO</span><span>NIVEL</span><span>TIPO DE CLASE</span><span>ESTADO</span><span>ACCIONES</span></div>' +
      filtered.map(function (d) {
        return '<div class="table-row">' +
          '<button class="person-cell" data-action="view-dancer" data-id="' + d.id + '">' + personAvatar(d) + '<span><strong>' + esc(d.name) + '</strong><small>' + esc(d.age) + ' años</small></span></button>' +
          '<span class="contact-cell"><span>' + esc(d.email) + '</span><small>' + esc(d.phone) + '</small></span>' +
          '<span>' + badge(d.level, d.level === "Principiante") + '</span>' +
          '<span class="dance-cell class-summary">' + esc(d.classes.slice(0, 1).join("")) + (d.classes.length > 1 ? '<small>+' + (d.classes.length - 1) + ' más</small>' : "") + '</span>' +
          '<span>' + statusHTML(d) + '</span>' +
          '<span class="action-cell"><button data-action="edit-dancer" data-id="' + d.id + '" aria-label="Editar a ' + esc(d.name) + '">' + icon("edit", 17) + '</button>' +
          '<button class="delete-action" data-action="ask-delete" data-id="' + d.id + '" aria-label="Eliminar a ' + esc(d.name) + '">' + icon("trash", 17) + '</button></span>' +
        '</div>';
      }).join("") + '</div>';

    var cards = '<div class="mobile-cards">' + filtered.map(function (d) {
      return '<article class="dancer-card">' +
        '<button class="mobile-person" data-action="view-dancer" data-id="' + d.id + '">' + personAvatar(d) + '<span><strong>' + esc(d.name) + '</strong><small>' + esc(d.age) + ' años · ' + d.classes.length + ' ' + (d.classes.length === 1 ? "clase" : "clases") + '</small></span>' + icon("chevron", 18) + '</button>' +
        '<div class="mobile-class-list">' + d.classes.map(function (item) { return badge(item); }).join("") + '</div>' +
        '<div class="mobile-meta"><span><small>Nivel</small>' + badge(d.level) + '</span><span><small>Estado</small>' + statusHTML(d) + '</span></div>' +
        '<div class="mobile-card-actions">' +
          btn("Editar", { variant: "secondary", icon: "edit", attrs: 'data-action="edit-dancer" data-id="' + d.id + '"' }) +
          btn("Eliminar", { variant: "ghost", icon: "trash", attrs: 'data-action="ask-delete" data-id="' + d.id + '"' }) +
        '</div></article>';
    }).join("") + '</div>';

    var empty = filtered.length === 0
      ? '<div class="empty-state"><span>' + icon("search", 28) + '</span><h3>No encontramos bailarines</h3><p>Prueba con otro nombre, tipo de danza o nivel.</p>' +
        btn("Limpiar búsqueda", { variant: "secondary", attrs: 'data-action="clear-search"' }) + '</div>'
      : "";

    return table + cards + empty;
  }

  function dancersListHTML() {
    var n = filteredDancers().length;
    return '<div>' +
      pageHeading("GESTIÓN DE PERSONAS", "Bailarines", "Administra la información y el progreso de tus bailarines.", btn("Nuevo bailarín", { icon: "plus", attrs: 'data-action="navigate" data-page="new"' })) +
      '<div class="list-toolbar"><label class="search-box">' + icon("search", 19) +
        '<input id="search-input" value="' + esc(state.query) + '" placeholder="Buscar por nombre, danza o nivel..."/>' +
        '<button id="clear-search-btn" data-action="clear-search" aria-label="Limpiar búsqueda" style="' + (state.query ? "" : "display:none") + '">' + icon("close", 15) + '</button></label>' +
        '<div class="result-count" id="result-count"><strong>' + n + '</strong> bailarines</div></div>' +
      '<div class="table-panel" id="dancers-results">' + dancersResultsHTML() + '</div>' +
    '</div>';
  }

  function updateDancersResults() {
    var results = document.getElementById("dancers-results");
    var count = document.getElementById("result-count");
    var clear = document.getElementById("clear-search-btn");
    if (!results) return;
    results.innerHTML = dancersResultsHTML();
    count.innerHTML = '<strong>' + filteredDancers().length + '</strong> bailarines';
    clear.style.display = state.query ? "" : "none";
  }

  /* ------------------------------ Formulario de bailarín ------------------------------ */
  function initForm(mode) {
    var initial = mode === "new" ? Object.assign(makeEmptyForm(), { classes: [] }) : state.selected;
    formState = {
      mode: mode,
      initial: initial,
      form: Object.assign({}, initial, { classes: initial.classes.slice() }),
      errors: {}
    };
  }

  function formAvatarInitials(form) {
    return form.name ? initialsOf(form.name) : "FT";
  }

  function dancerFormHTML() {
    var fs = formState;
    var form = fs.form;
    var errors = fs.errors;
    var mode = fs.mode;

    function field(key, label, placeholder, type) {
      type = type || "text";
      return '<label class="field ' + (errors[key] ? "field-error" : "") + '"><span>' + label + '</span>' +
        '<input type="' + type + '" data-field="' + key + '" value="' + esc(form[key]) + '" placeholder="' + esc(placeholder) + '"/>' +
        (errors[key] ? '<small>' + esc(errors[key]) + '</small>' : "") + '</label>';
    }

    function select(key, label, options) {
      return '<label class="field ' + (errors[key] ? "field-error" : "") + '"><span>' + label + '</span>' +
        '<select data-field="' + key + '"><option value=""' + (form[key] === "" ? " selected" : "") + '>Seleccionar</option>' +
        options.map(function (o) { return '<option' + (form[key] === o ? " selected" : "") + '>' + esc(o) + '</option>'; }).join("") +
        '</select>' + (errors[key] ? '<small>' + esc(errors[key]) + '</small>' : "") + '</label>';
    }

    var avatarDancer = Object.assign({}, form, { initials: formAvatarInitials(form) });

    return '<div class="form-page">' +
      '<button class="back-button" data-action="navigate" data-page="dancers">' + icon("arrow", 18) + ' Volver a bailarines</button>' +
      pageHeading(
        mode === "new" ? "NUEVO REGISTRO" : "ACTUALIZAR INFORMACIÓN",
        mode === "new" ? "Registrar bailarín" : "Editar bailarín",
        mode === "new" ? "Completa la información para agregar un nuevo bailarín." : "Modifica los datos de " + fs.initial.name + "."
      ) +
      '<form class="form-panel" data-form="dancer" novalidate>' +
        '<div class="form-section-title"><span>' + icon("users", 20) + '</span><div><h2>Información personal</h2><p>Datos básicos de identificación y contacto.</p></div></div>' +
        '<div class="photo-uploader">' +
          personAvatar(avatarDancer, "huge", "form-avatar") +
          '<div><strong>Foto del bailarín</strong><p>Sube una imagen JPG o PNG para identificar su perfil.</p>' +
            '<label class="upload-button">' + icon("plus", 16) + (form.photo ? "Cambiar foto" : "Subir foto") + '<input type="file" data-photo="1" accept="image/png,image/jpeg,image/webp"/></label></div>' +
          (form.photo ? '<button class="remove-photo" type="button" data-action="remove-photo">Quitar</button>' : "") +
        '</div>' +
        '<div class="form-grid">' +
          field("name", "Nombre completo *", "Ej. Laura Gómez") + " " +
          field("age", "Edad *", "Ej. 19", "number") + " " +
          field("document", "Documento *", "Número de identificación") + " " +
          field("phone", "Teléfono *", "Ej. 300 123 4567", "tel") + " " +
          field("email", "Correo electrónico *", "nombre@correo.com", "email") + " " +
          field("address", "Dirección", "Dirección de residencia") +
        '</div>' +
        '<div class="form-divider"></div>' +
        '<div class="form-section-title"><span class="pink">' + icon("sparkles", 20) + '</span><div><h2>Información académica</h2><p>Detalles de su formación dentro de la academia.</p></div></div>' +
        '<div class="form-grid compact-grid">' +
          select("level", "Nivel de danza *", ["Principiante", "Intermedio", "Avanzado"]) + " " +
          field("date", "Fecha de inscripción *", "", "date") + " " +
          select("status", "Estado *", ["Activa", "Inactiva"]) +
        '</div>' +
        '<fieldset class="class-picker ' + (errors.classes ? "field-error" : "") + '"><legend>Clases a inscribir *</legend><p>Puedes seleccionar una o varias clases para este bailarín.</p><div>' +
          classOptions.map(function (className) {
            var checked = form.classes.indexOf(className) !== -1;
            return '<label class="' + (checked ? "selected" : "") + '"><input type="checkbox" data-class="' + esc(className) + '"' + (checked ? " checked" : "") + '/>' +
              '<span class="class-check">' + (checked ? icon("check", 14) : "") + '</span>' +
              '<span><strong>' + esc(className) + '</strong><small>' + (className.indexOf("Salsa") !== -1 || className.indexOf("Bachata") !== -1 ? "Salón principal" : "Salón de espejos") + '</small></span></label>';
          }).join("") +
        '</div>' + (errors.classes ? '<small class="class-error">' + esc(errors.classes) + '</small>' : "") + '</fieldset>' +
        (Object.keys(errors).length > 0 ? '<div class="error-summary"><strong>Revisa los campos marcados</strong><span>Completa correctamente la información antes de guardar.</span></div>' : "") +
        '<div class="form-actions">' +
          btn("Cancelar", { variant: "secondary", attrs: 'data-action="navigate" data-page="dancers"' }) +
          btn(mode === "new" ? "Guardar bailarín" : "Guardar cambios", { type: "submit", icon: "check" }) +
        '</div>' +
      '</form>' +
    '</div>';
  }


  function formUpdate(key, value) {
    var fs = formState;
    if (!fs) return;
    fs.form[key] = value;
    if (key === "name" && !fs.form.photo) {
      var av = document.getElementById("form-avatar");
      if (av) av.textContent = formAvatarInitials(fs.form);
    }
    if (fs.errors[key]) {
      fs.errors[key] = "";
      var input = document.querySelector('[data-field="' + key + '"]');
      var label = input && input.closest("label.field");
      if (label) {
        label.classList.remove("field-error");
        var small = label.querySelector("small");
        if (small) small.remove();
      }
    }
  }

  function toggleClass(className) {
    var fs = formState;
    var form = fs.form;
    var classes = form.classes.indexOf(className) !== -1
      ? form.classes.filter(function (item) { return item !== className; })
      : form.classes.concat([className]);
    form.classes = classes;
    form.dance = classes[0] ? classes[0].split(" ")[0] : "";
    if (classes.length) fs.errors.classes = "";
    renderContent();
  }

  function uploadPhoto(file) {
    if (!file) return;
    var fs = formState;
    var reader = new FileReader();
    reader.onload = function () {
      fs.form.photo = String(reader.result);
      if (formState === fs && (state.page === "new" || state.page === "edit")) renderContent();
    };
    reader.readAsDataURL(file);
  }

  function submitDancerForm() {
    var fs = formState;
    var form = fs.form;
    var next = {};
    if (!form.name.trim()) next.name = "El nombre es obligatorio.";
    if (!form.age || Number(form.age) < 5 || Number(form.age) > 100) next.age = "Ingresa una edad válida.";
    if (!form.document.trim()) next.document = "El documento es obligatorio.";
    if (!form.phone.trim()) next.phone = "El teléfono es obligatorio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Ingresa un correo electrónico válido.";
    if (!form.level) next.level = "Selecciona un nivel de danza.";
    if (!form.classes.length) next.classes = "Selecciona al menos una clase.";
    if (!form.date) next.date = "Selecciona una fecha de inscripción.";
    fs.errors = next;
    if (!Object.keys(next).length) {
      var updated;
      var message;
      if (fs.mode === "new") {
        var created = Object.assign({}, form, { id: Date.now(), initials: initialsOf(form.name) });
        updated = [created].concat(state.dancers);
        message = "Bailarín registrado correctamente.";
      } else {
        updated = state.dancers.map(function (item) { return item.id === form.id ? form : item; });
        message = "Los datos del bailarín fueron actualizados correctamente.";
      }
      if (!DH.saveDancers(updated)) {
        window.alert("No se pudo guardar: el almacenamiento del navegador está lleno. Prueba con una foto más pequeña o sin foto.");
        return;
      }
      state.dancers = updated;
      DH.setFlash(message);
      DH.go("dancers");
    } else {
      renderContent();
    }
  }

  /* ------------------------------ Detalle ------------------------------ */
  function dancerDetailHTML() {
    var dancer = state.selected;
    var details = [
      ["Edad", dancer.age + " años"],
      ["Documento", dancer.document],
      ["Teléfono", dancer.phone],
      ["Correo electrónico", dancer.email],
      ["Dirección", dancer.address],
      ["Fecha de inscripción", new Date(dancer.date + "T00:00:00").toLocaleDateString("es-CO")]
    ];
    return '<div class="detail-page"><button class="back-button" data-action="navigate" data-page="dancers">' + icon("arrow", 18) + ' Volver a bailarines</button>' +
      '<div class="profile-hero">' + personAvatar(dancer, "huge") +
        '<div class="profile-title"><p>PERFIL DEL BAILARÍN</p><h1>' + esc(dancer.name) + '</h1><div>' + badge(dancer.level) + statusHTML(dancer) + '</div></div>' +
        '<div class="profile-actions">' +
          btn("Editar", { variant: "secondary", icon: "edit", attrs: 'data-action="detail-edit"' }) +
          btn("Eliminar", { variant: "ghost", icon: "trash", attrs: 'data-action="detail-delete"' }) +
        '</div></div>' +
      '<section class="panel enrolled-panel"><div class="section-heading"><div><h2>Clases inscritas</h2><p>' + dancer.classes.length + ' ' + (dancer.classes.length === 1 ? "clase activa" : "clases activas") + '</p></div></div>' +
        '<div class="enrolled-list">' + dancer.classes.map(function (item) {
          return '<span>' + icon("calendar", 17) + '<strong>' + esc(item) + '</strong>' + icon("check", 15) + '</span>';
        }).join("") + '</div></section>' +
      '<section class="panel detail-panel"><div class="section-heading"><div><h2>Información personal</h2><p>Datos de contacto y registro</p></div></div>' +
        '<div class="detail-grid">' + details.map(function (pair, i) {
          var ic = i === 2 ? "phone" : i === 3 ? "mail" : i === 5 ? "calendar" : "users";
          return '<div><span class="detail-icon">' + icon(ic, 17) + '</span><p><small>' + pair[0] + '</small><strong>' + esc(pair[1] || "No registrado") + '</strong></p></div>';
        }).join("") + '</div></section>' +
    '</div>';
  }

  /* ------------------------------ Modal eliminar ------------------------------ */
  function deleteModalHTML(dancer) {
    return '<div class="modal-layer" role="dialog" aria-modal="true" aria-labelledby="delete-title"><div class="modal-card">' +
      '<button class="modal-close" data-action="cancel-delete" aria-label="Cerrar">' + icon("close", 19) + '</button>' +
      '<span class="danger-icon">' + icon("trash", 24) + '</span>' +
      '<h2 id="delete-title">¿Eliminar bailarín?</h2>' +
      '<p>¿Estás seguro de que deseas eliminar a <strong>' + esc(dancer.name) + '</strong>? Esta acción eliminará el registro de forma permanente.</p>' +
      '<div class="modal-actions">' +
        btn("Cancelar", { variant: "secondary", attrs: 'data-action="cancel-delete"' }) +
        btn("Eliminar", { variant: "danger", icon: "trash", attrs: 'data-action="confirm-delete"' }) +
      '</div></div></div>';
  }

  /* ============================== Render ============================== */
  function renderContent() {
    var el = document.getElementById("content");
    var html = "";
    switch (state.page) {
      case "dancers": html = dancersListHTML(); break;
      case "new":
      case "edit": html = dancerFormHTML(); break;
      case "detail": html = dancerDetailHTML(); break;
    }
    el.innerHTML = html;
  }

  function renderOverlay() {
    document.getElementById("overlay-host").innerHTML = state.deleteTarget ? deleteModalHTML(state.deleteTarget) : "";
  }

  function findDancer(id) {
    for (var i = 0; i < state.dancers.length; i++) {
      if (String(state.dancers[i].id) === String(id)) return state.dancers[i];
    }
    return null;
  }

  function removeDancer() {
    var target = state.deleteTarget;
    if (!target) return;
    var remaining = state.dancers.filter(function (d) { return d.id !== target.id; });
    if (!DH.saveDancers(remaining)) {
      window.alert("No se pudo eliminar el registro: error de almacenamiento del navegador.");
      return;
    }
    state.dancers = remaining;
    state.deleteTarget = null;
    renderOverlay();
    if (state.page === "dancers") {
      renderContent();
      window.scrollTo({ top: 0, behavior: "smooth" });
      DH.flash("El bailarín fue eliminado correctamente.");
    } else {
      DH.setFlash("El bailarín fue eliminado correctamente.");
      DH.go("dancers");
    }
  }

  /* ============================== Eventos ============================== */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-action]");
    if (!el) return;
    var action = el.getAttribute("data-action");
    var d;

    switch (action) {
      case "view-dancer": DH.go("detail", el.getAttribute("data-id")); break;
      case "edit-dancer": DH.go("edit", el.getAttribute("data-id")); break;
      case "ask-delete": d = findDancer(el.getAttribute("data-id")); if (d) { state.deleteTarget = d; renderOverlay(); } break;
      case "detail-edit": DH.go("edit", state.selected.id); break;
      case "detail-delete": state.deleteTarget = state.selected; renderOverlay(); break;
      case "cancel-delete": state.deleteTarget = null; renderOverlay(); break;
      case "confirm-delete": removeDancer(); break;
      case "clear-search":
        state.query = "";
        var input = document.getElementById("search-input");
        if (input) input.value = "";
        updateDancersResults();
        break;
      case "remove-photo":
        if (formState) { formState.form.photo = undefined; renderContent(); }
        break;
    }
  });

  document.addEventListener("input", function (e) {
    var t = e.target;
    if (t.id === "search-input") {
      state.query = t.value;
      updateDancersResults();
    } else if (t.hasAttribute && t.hasAttribute("data-field")) {
      formUpdate(t.getAttribute("data-field"), t.value);
    }
  });

  document.addEventListener("change", function (e) {
    var t = e.target;
    if (!t.hasAttribute) return;
    if (t.hasAttribute("data-class")) {
      toggleClass(t.getAttribute("data-class"));
    } else if (t.hasAttribute("data-photo")) {
      uploadPhoto(t.files && t.files[0]);
    }
  });

  document.addEventListener("submit", function (e) {
    var f = e.target;
    if (!f.hasAttribute || f.getAttribute("data-form") !== "dancer") return;
    e.preventDefault();
    submitDancerForm();
  });

  /* ============================== Inicio ============================== */
  DH.buildShell(PAGE);

  if (PAGE === "edit" || PAGE === "detail") {
    state.selected = findDancer(DH.queryId());
    if (!state.selected) {
      // Sin bailarín válido en la URL: volver a la lista
      DH.go("dancers");
      return;
    }
  }
  if (PAGE === "new" || PAGE === "edit") initForm(PAGE);

  renderContent();
  renderOverlay();
})();
