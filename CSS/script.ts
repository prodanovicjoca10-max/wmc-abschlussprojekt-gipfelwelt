type Tour = {
  name: string;
  land: string;
  schwierigkeit: string;
  saison: string;
  dauer: string;
  ort: string;
  beschreibung: string;
};

type PackEintrag = {
  name: string;
  erledigt: boolean;
};

const navbarTs = document.getElementById("navbar") as HTMLElement | null;
const menuBtnTs = document.getElementById("menuBtn") as HTMLButtonElement | null;
const navLinksTs = document.getElementById("navLinks") as HTMLElement | null;
const backToTopTs = document.getElementById("backToTop") as HTMLButtonElement | null;
const kontaktFormularTs = document.getElementById("kontaktFormular") as HTMLFormElement | null;
const yearTs = document.getElementById("year") as HTMLElement | null;

const tourenDatenTs: Tour[] = [
  {
    name: "Nordketten-Panoramaweg",
    land: "Österreich",
    schwierigkeit: "Mittel",
    saison: "Sommer",
    dauer: "4 Stunden",
    ort: "Innsbruck",
    beschreibung: "Aussichtsreiche Bergtour mit beeindruckendem Blick auf Innsbruck und die Alpen."
  },
  {
    name: "Zermatt Höhenweg",
    land: "Schweiz",
    schwierigkeit: "Schwer",
    saison: "Herbst",
    dauer: "6 Stunden",
    ort: "Zermatt",
    beschreibung: "Anspruchsvolle Route mit grandiosen Gipfelblicken und alpiner Landschaft."
  },
  {
    name: "Dolomiten Rundweg",
    land: "Italien",
    schwierigkeit: "Mittel",
    saison: "Sommer",
    dauer: "5 Stunden",
    ort: "Cortina d'Ampezzo",
    beschreibung: "Spektakuläre Felsformationen, klare Luft und wunderschöne Panoramapunkte."
  }
];

let packlistenDatenTs: PackEintrag[] = [
  { name: "Wanderschuhe", erledigt: false },
  { name: "Wasserflasche", erledigt: true },
  { name: "Erste Hilfe", erledigt: false }
];

function jahrSetzenTs(): void {
  if (yearTs) {
    yearTs.textContent = new Date().getFullYear().toString();
  }
}

function navbarBeimScrollenTs(): void {
  if (navbarTs) {
    navbarTs.classList.toggle("scrolled", window.scrollY > 40);
  }

  if (backToTopTs) {
    backToTopTs.classList.toggle("show", window.scrollY > 500);
  }
}

function menueUmschaltenTs(): void {
  if (!navLinksTs || !menuBtnTs) return;

  navLinksTs.classList.toggle("open");
  menuBtnTs.innerHTML = navLinksTs.classList.contains("open")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
}

function packlisteRendernTs(): void {
  const liste = document.getElementById("packliste") as HTMLUListElement | null;
  if (!liste) return;

  liste.replaceChildren();

  packlistenDatenTs.forEach((eintrag: PackEintrag, index: number) => {
    const li = document.createElement("li");
    li.className = eintrag.erledigt ? "pack-item erledigt" : "pack-item";

    li.innerHTML = `
      <div class="pack-item-links">
        <i class="fa-solid fa-backpack"></i>
        <span>${eintrag.name}</span>
      </div>
      <div class="pack-actions">
        <button class="klein-btn" type="button" data-toggle="${index}">
          ${eintrag.erledigt ? "Zurücksetzen" : "Erledigt"}
        </button>
        <button class="klein-btn loeschen" type="button" data-delete="${index}">
          Löschen
        </button>
      </div>
    `;

    liste.appendChild(li);
  });
}

function hauptprogrammTs(): void {
  jahrSetzenTs();
  navbarBeimScrollenTs();

  window.addEventListener("scroll", navbarBeimScrollenTs);

  if (menuBtnTs) {
    menuBtnTs.addEventListener("click", menueUmschaltenTs);
  }

  if (backToTopTs) {
    backToTopTs.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (kontaktFormularTs) {
    kontaktFormularTs.addEventListener("submit", (event: Event) => {
      event.preventDefault();
      alert("Formular wurde erfolgreich geprüft.");
    });
  }

  if (document.getElementById("packliste")) {
    packlisteRendernTs();
  }

  console.log("TypeScript-Version von GipfelWelt wurde geladen.");
}

document.addEventListener("DOMContentLoaded", hauptprogrammTs);
 