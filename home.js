/* DanceHub - página de inicio (index.html) */
(function () {
  "use strict";
  var DH = window.DH;
  var icon = DH.icon, esc = DH.esc, btn = DH.btn, badge = DH.badge, personAvatar = DH.personAvatar,
      pageHeading = DH.pageHeading, initialsOf = DH.initialsOf;

  var state = { dancers: DH.loadDancers() };

  function dashboardHTML() {
    var stats = [
      { label: "Total bailarines", value: String(state.dancers.length), detail: "+8 este mes", icon: "users", tone: "purple", page: "dancers" },
      { label: "Clases programadas", value: "12", detail: "4 para hoy", icon: "calendar", tone: "pink", page: "classes" },
      { label: "Coreografías", value: "8", detail: "3 en preparación", icon: "sparkles", tone: "blue", page: "choreographies" },
      { label: "Próximos eventos", value: "5", detail: "Siguiente en 6 días", icon: "ticket", tone: "orange", page: "events" }
    ];
    return '<div>' +
      '<section class="dance-hero">' +
        '<div class="hero-orb hero-orb-one"></div>' +
        '<div class="hero-orb hero-orb-two"></div>' +
        '<div class="hero-copy">' +
          '<p class="hero-kicker"><span>' + icon("sparkles", 14) + '</span> MARTES, 14 DE ABRIL</p>' +
          '<h1>¡Hola, Luisa!</h1>' +
          '<p>El movimiento comienza aquí. Organiza tu academia y deja que cada talento encuentre su ritmo.</p>' +
          '<div class="hero-actions">' +
            btn("Nuevo bailarín", { icon: "plus", attrs: 'data-action="navigate" data-page="new"' }) +
            '<button class="hero-link" data-action="navigate" data-page="classes">Ver clases de hoy ' + icon("chevron", 16) + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="hero-visual">' +
          '<div class="hero-image-main">' +
            '<img src="https://images.unsplash.com/photo-1782882663570-37043a790136?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900" alt="Bailarinas contemporáneas en movimiento"/>' +
            '<span class="image-shine"></span>' +
          '</div>' +
          '<div class="hero-image-small">' +
            '<img src="https://images.unsplash.com/photo-1667384445186-a97ad2eb415a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=400" alt="Grupo de bailarinas durante un ensayo"/>' +
          '</div>' +
          '<div class="hero-note"><span>' + icon("music", 16) + '</span><p><strong>12 clases</strong><small>esta semana</small></p></div>' +
        '</div>' +
      '</section>' +
      '<div class="stats-grid">' + stats.map(function (s) {
        return '<button class="stat-card" data-action="navigate" data-page="' + s.page + '"><span class="stat-icon ' + s.tone + '">' + icon(s.icon) + '</span>' +
          '<span class="stat-copy"><span>' + s.label + '</span><strong>' + s.value + '</strong><small>' + s.detail + '</small></span>' +
          '<span class="stat-arrow">' + icon("chevron", 18) + '</span></button>';
      }).join("") + '</div>' +
      '<div class="dashboard-grid">' +
        '<section class="panel">' +
          '<div class="section-heading"><div><h2>Próximos eventos</h2><p>Tu agenda para las próximas semanas</p></div><button class="text-button" data-action="navigate" data-page="events">Ver todos ' + icon("chevron", 16) + '</button></div>' +
          '<div class="event-list">' +
            '<button class="event-row" data-action="navigate" data-page="events"><span class="date-tile"><strong>20</strong><small>NOV</small></span><span class="event-copy"><strong>Festival de Danza</strong><span>' + icon("clock", 14) + ' 6:00 p. m. <i></i> ' + icon("pin", 14) + ' Teatro Municipal</span></span>' + icon("chevron", 18) + '</button>' +
            '<button class="event-row" data-action="navigate" data-page="events"><span class="date-tile soft"><strong>03</strong><small>DIC</small></span><span class="event-copy"><strong>Muestra de fin de año</strong><span>' + icon("clock", 14) + ' 5:30 p. m. <i></i> ' + icon("pin", 14) + ' Auditorio Central</span></span>' + icon("chevron", 18) + '</button>' +
            '<button class="event-row" data-action="navigate" data-page="events"><span class="date-tile blue"><strong>15</strong><small>DIC</small></span><span class="event-copy"><strong>Competencia regional</strong><span>' + icon("clock", 14) + ' 9:00 a. m. <i></i> ' + icon("pin", 14) + ' Coliseo Norte</span></span>' + icon("chevron", 18) + '</button>' +
          '</div>' +
        '</section>' +
        '<section class="panel activity-panel"><div class="section-heading"><div><h2>Actividad reciente</h2><p>Últimos movimientos</p></div></div>' +
          '<div class="timeline">' +
            '<div><span class="timeline-icon purple">' + icon("users", 16) + '</span><p><strong>Nueva bailarina registrada</strong><span>Mariana Díaz · hace 25 min</span></p></div>' +
            '<div><span class="timeline-icon pink">' + icon("calendar", 16) + '</span><p><strong>Clase actualizada</strong><span>Salsa Intermedio · hace 2 h</span></p></div>' +
            '<div><span class="timeline-icon blue">' + icon("sparkles", 16) + '</span><p><strong>Coreografía creada</strong><span>Alma Latina · ayer</span></p></div>' +
          '</div>' +
        '</section>' +
      '</div>' +
    '</div>';
  }

  DH.buildShell("home");
  document.getElementById("content").innerHTML = dashboardHTML();
})();
