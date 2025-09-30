import DayModel from "./DayModel.js";
import DayService from "./DayService.js";

/* 31 “te amo” — el TÍTULO principal */
const LOVE_31 = [
  "TE QUIERO","JE T’AIME","TI AMO","EU TE AMO","ICH LIEBE DICH","SARANGHAE","I LOVE YOU","AISHITERU",
  "TE AMO","SENI SEVIYORUM","T’ESTIMO","TE IUBESC","QUIÉROTE","T’AMMO","TI VOIO BEN",
  "MAHAL KITA","INIIBIG KITA","MI TA STIMA BO","KUYAYKI","ROHAYHU","ĽÚBIM ŤA","SZERETLEK","JEG ELSKER DIG",
  "Я ТЕБЕ КОХАЮ","ОБИЧАМ ТЕ","MA ARMASTAN SIND","SIRUM EM KEZ","DOOSTET DARAM","ZA TA SARA MENA LARAM",
  "EK HET JOU LIEF","IN K’AATECH","AMO-TE"
];

export default class AppController {
  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);
    this.model = new DayModel();
    this.service = new DayService("2025-09-01"); // ⬅ fecha de inicio (día 1)
    console.log("[AppController] creado");
  }

  init() {
    this.root.innerHTML = `
  <!-- Fecha arriba a la izquierda -->
  <div class="date-container">
    <p id="today" class="today"></p>
  </div>

  <!-- Efectos de partículas -->
  <div id="particles-container"></div>

  <div class="page">
    <header class="hero">
      <h1 id="hero-word" class="love-title">TE AMO</h1>
      <p class="tagline">Un "te amo" diferente cada día</p>
    </header>

    <section class="message">
      <h2 id="title" class="day-title"></h2>
      <p id="text" class="message-text"></p>
    </section>

    <!-- Imágenes decorativas (se mantienen como en tu versión) -->
    <div class="decorative-images">
      <img src="./src/img/cocacola.png"     alt="Coca Cola"       class="coca-cola">
      <img src="./src/img/sabritas.png"     alt="Sabritas"        class="sabritas">
      <img src="./src/img/ferrerorochel.png" alt="Ferrero Rocher" class="ferrero">
      <img src="./src/img/hamburgesa.png"    alt="Hamburguesa"    class="hamburguesa">
      <img src="./src/img/dazai.png"         alt="Dazai"          class="dazai">
      <img src="./src/img/rosasrojas.png"    alt="Rosas Rojas"    class="rosas">
    </div>

    <!-- Imagen principal de Isis -->
    <section class="main-photo-section">
      <img src="./src/img/linda.jpg" alt="Isis" class="photo-main">
    </section>
  </div>
`;

    // Fecha
    document.querySelector("#today").textContent = this.service.formatToday();

    // Día actual
    const idx = this.service.currentIndex(this.model.getTotal()); // 0..30
    const day = this.model.getByIndex(idx);

    // Temas por día (tu lógica, no toca colores del fondo)
    const themes = ['theme-red', 'theme-blue', 'theme-purple', 'theme-olive'];
    document.documentElement.classList.remove(...themes);
    document.documentElement.classList.add(themes[idx % themes.length]);

    // Título = “te amo” del día
    const lovePhrase = LOVE_31[idx] ?? "TE AMO";
    document.querySelector("#hero-word").textContent = lovePhrase;

    // Mensaje del día
    document.querySelector("#title").textContent = day?.titulo ?? "Día";
    document.querySelector("#text").textContent  = day?.texto  ?? "";

    // Efectos
    this.initEffects(idx);
  }

  initEffects(dayIndex) {
    const container = document.getElementById('particles-container');
    container.innerHTML = '';

    if (dayIndex === 8) {
      this.createBirthdayEffects();
    } else {
      this.createConfettiEffects();
    }
  }

  createBirthdayEffects() {
    const container = document.getElementById('particles-container');

    // Globos
    for (let i = 0; i < 15; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      balloon.style.left = Math.random() * 100 + '%';
      // arranque con delay negativo para que no “se queden arriba”
      balloon.style.animationDelay = (-Math.random() * 2) + 's';
      balloon.style.background = this.getRandomColor();
      container.appendChild(balloon);
    }

    // Serpentinas
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = this.getRandomColor();
      confetti.style.animationDelay = (-Math.random() * 2.5) + 's';
      container.appendChild(confetti);
    }
  }

  createConfettiEffects() {
    const container = document.getElementById('particles-container');

    for (let i = 0; i < 10; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = this.getRandomColor();
      // delay negativo => las piezas ya vienen cayendo
      confetti.style.animationDelay = (-Math.random() * 2) + 's';
      container.appendChild(confetti);
    }
  }

  getRandomColor() {
    return '#DC143C'; // rojo para las partículas
  }
}
