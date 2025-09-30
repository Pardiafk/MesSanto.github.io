export default class DayService {
  constructor(startDateStr) {
    this.startDateStr = startDateStr; // ejemplo "2025-09-01" → día 1
    console.log("[DayService] creado con inicio =", startDateStr);
  }

  today() { return new Date(); }

  // Campaña fija: se queda en el último si pasan más días
  currentIndex(total) {
    const toMidnight = d => { const x = new Date(d); x.setHours(0,0,0,0); return x; };
    const start = toMidnight(new Date(`${this.startDateStr}T00:00:00`));
    const today = toMidnight(this.today());
    const diffMs = today - start;
    const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const clamp = (n, a, b) => Math.min(Math.max(n, a), b);
    return clamp(dias, 0, total - 1); // 0..30
  }

  formatToday(locale = "es-BO") {
    return new Intl.DateTimeFormat(locale, { dateStyle: "full" }).format(this.today());
  }
}
