const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const kontaktFormular = document.getElementById("kontaktFormular");
const year = document.getElementById("year");

const tourenDaten = [
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
  },
  {
    name: "Almweg Tirol",
    land: "Österreich",
    schwierigkeit: "Leicht",
    saison: "Frühling",
    dauer: "3 Stunden",
    ort: "Innsbruck",
    beschreibung: "Gemütliche Wanderung für Einsteiger mit Almen, Wiesen und entspannter Strecke."
  },
  {
    name: "Schneepfad Engadin",
    land: "Schweiz",
    schwierigkeit: "Mittel",
    saison: "Winter",
    dauer: "4,5 Stunden",
    ort: "Zermatt",
    beschreibung: "Winterliche Tour mit ruhigen Schneelandschaften und frischer Bergluft."
  }
];

let packlistenDaten = [
  { name: "Wanderschuhe", erledigt: false },
  { name: "Wasserflasche", erledigt: true },
  { name: "Erste Hilfe", erledigt: false },
  { name: "Regenjacke", erledigt: false }
];

function jahrSetzen() {
  if (year) {
    year.textContent = new Date().getFullYear().toString();
  }
}

function navbarBeimScrollen() {
  if (navbar) {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  if (backToTop) {
    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }
}

function menueUmschalten() {
  if (!navLinks || !menuBtn) {
    return;
  }

  navLinks.classList.toggle("open");
  menuBtn.innerHTML = navLinks.classList.contains("open")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
}

function navigationSchliessen() {
  if (!navLinks || !menuBtn) {
    return;
  }

  navLinks.classList.remove("open");
  menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

function zurSeitenoberkante() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function formularPruefen(event) {
  event.preventDefault();

  const name = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const thema = document.getElementById("thema")?.value.trim();
  const nachricht = document.getElementById("nachricht")?.value.trim();

  if (!name || !email || !thema || !nachricht) {
    alert("Bitte fülle alle Pflichtfelder vollständig aus.");
    return;
  }

  alert("Vielen Dank! Deine Nachricht wurde erfolgreich vorbereitet.");
  kontaktFormular.reset();
}

function tourenFiltern() {
  const land = document.getElementById("landFilter")?.value || "alle";
  const schwierigkeit = document.getElementById("schwierigkeitFilter")?.value || "alle";
  const saison = document.getElementById("saisonFilter")?.value || "alle";
  const suche = document.getElementById("sucheInput")?.value.toLowerCase().trim() || "";

  return tourenDaten.filter((tour) => {
    const landPasst = land === "alle" || tour.land === land;
    const schwierigkeitPasst = schwierigkeit === "alle" || tour.schwierigkeit === schwierigkeit;
    const saisonPasst = saison === "alle" || tour.saison === saison;
    const suchePasst =
      tour.name.toLowerCase().includes(suche) ||
      tour.beschreibung.toLowerCase().includes(suche) ||
      tour.ort.toLowerCase().includes(suche);

    return landPasst && schwierigkeitPasst && saisonPasst && suchePasst;
  });
}

function tourenKarteErstellen(tour) {
  const artikel = document.createElement("article");
  artikel.className = "card";

  const content = document.createElement("div");
  content.className = "card-content";

  const icon = document.createElement("div");
  icon.className = "card-icon";
  icon.innerHTML = '<i class="fa-solid fa-mountain"></i>';

  const titel = document.createElement("h3");
  titel.textContent = tour.name;

  const beschreibung = document.createElement("p");
  beschreibung.textContent = tour.beschreibung;

  const land = document.createElement("p");
  land.innerHTML = `<strong>Land:</strong> ${tour.land}`;

  const ort = document.createElement("p");
  ort.innerHTML = `<strong>Ort:</strong> ${tour.ort}`;

  const schwierigkeit = document.createElement("p");
  schwierigkeit.innerHTML = `<strong>Schwierigkeit:</strong> ${tour.schwierigkeit}`;

  const saison = document.createElement("p");
  saison.innerHTML = `<strong>Saison:</strong> ${tour.saison}`;

  const dauer = document.createElement("p");
  dauer.innerHTML = `<strong>Dauer:</strong> ${tour.dauer}`;

  content.append(icon, titel, beschreibung, land, ort, schwierigkeit, saison, dauer);
  artikel.appendChild(content);

  return artikel;
}

function tourenRendern() {
  const liste = document.getElementById("tourenListe");
  if (!liste) {
    return;
  }

  const gefilterteTouren = tourenFiltern();
  liste.replaceChildren();

  if (gefilterteTouren.length === 0) {
    const leerBox = document.createElement("div");
    leerBox.className = "leer-box";
    leerBox.textContent = "Keine Touren gefunden. Bitte ändere deine Filtereinstellungen.";
    liste.appendChild(leerBox);
    return;
  }

  gefilterteTouren.forEach((tour) => {
    const karte = tourenKarteErstellen(tour);
    liste.appendChild(karte);
  });
}

async function wetterLaden() {
  const ort = document.getElementById("wetterOrt")?.value;
  const ausgabe = document.getElementById("wetterAusgabe");

  if (!ort || !ausgabe) {
    return;
  }

  ausgabe.textContent = "Wetterdaten werden geladen...";

  const koordinaten = {
    "Innsbruck": { lat: 47.2692, lon: 11.4041 },
    "Zermatt": { lat: 46.0207, lon: 7.7491 },
    "Cortina d'Ampezzo": { lat: 46.5405, lon: 12.1357 }
  };

  const ortDaten = koordinaten[ort];

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${ortDaten.lat}&longitude=${ortDaten.lon}&current=temperature_2m,wind_speed_10m,weather_code`;
    const antwort = await fetch(url);
    const daten = await antwort.json();

    ausgabe.innerHTML = `
      <h3>Aktuelles Wetter in ${ort}</h3>
      <p><strong>Temperatur:</strong> ${daten.current.temperature_2m} °C</p>
      <p><strong>Windgeschwindigkeit:</strong> ${daten.current.wind_speed_10m} km/h</p>
      <p><strong>Wettercode:</strong> ${daten.current.weather_code}</p>
    `;
  } catch (fehler) {
    ausgabe.textContent = "Die Wetterdaten konnten leider nicht geladen werden.";
  }
}

function packlisteElementErstellen(eintrag, index) {
  const li = document.createElement("li");
  li.className = eintrag.erledigt ? "pack-item erledigt" : "pack-item";

  const links = document.createElement("div");
  links.className = "pack-item-links";
  links.innerHTML = `<i class="fa-solid fa-backpack"></i><span>${eintrag.name}</span>`;

  const actions = document.createElement("div");
  actions.className = "pack-actions";

  const toggleButton = document.createElement("button");
  toggleButton.className = "klein-btn";
  toggleButton.type = "button";
  toggleButton.textContent = eintrag.erledigt ? "Zurücksetzen" : "Erledigt";
  toggleButton.addEventListener("click", () => {
    packlistenDaten[index].erledigt = !packlistenDaten[index].erledigt;
    packlisteRendern();
  });

  const loeschenButton = document.createElement("button");
  loeschenButton.className = "klein-btn loeschen";
  loeschenButton.type = "button";
  loeschenButton.textContent = "Löschen";
  loeschenButton.addEventListener("click", () => {
    packlistenDaten.splice(index, 1);
    packlisteRendern();
  });

  actions.append(toggleButton, loeschenButton);
  li.append(links, actions);

  return li;
}

function packlisteRendern() {
  const liste = document.getElementById("packliste");
  if (!liste) {
    return;
  }

  liste.replaceChildren();

  if (packlistenDaten.length === 0) {
    const leerEintrag = document.createElement("li");
    leerEintrag.className = "leer-box";
    leerEintrag.textContent = "Die Packliste ist aktuell leer.";
    liste.appendChild(leerEintrag);
    return;
  }

  packlistenDaten.forEach((eintrag, index) => {
    const listenelement = packlisteElementErstellen(eintrag, index);
    liste.appendChild(listenelement);
  });
}

function gegenstandHinzufuegen() {
  const input = document.getElementById("neuerGegenstand");
  if (!input) {
    return;
  }

  const wert = input.value.trim();

  if (!wert) {
    alert("Bitte gib einen Gegenstand ein.");
    return;
  }

  packlistenDaten.push({
    name: wert,
    erledigt: false
  });

  input.value = "";
  packlisteRendern();
}

function tourenEventsVerbinden() {
  ["landFilter", "schwierigkeitFilter", "saisonFilter", "sucheInput"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener("input", tourenRendern);
      element.addEventListener("change", tourenRendern);
    }
  });

  const wetterLadenBtn = document.getElementById("wetterLadenBtn");
  if (wetterLadenBtn) {
    wetterLadenBtn.addEventListener("click", wetterLaden);
  }
}

function packlisteEventsVerbinden() {
  const hinzufuegenBtn = document.getElementById("hinzufuegenBtn");
  if (hinzufuegenBtn) {
    hinzufuegenBtn.addEventListener("click", gegenstandHinzufuegen);
  }
}

function ereignisseVerbinden() {
  window.addEventListener("scroll", navbarBeimScrollen);

  if (menuBtn) {
    menuBtn.addEventListener("click", menueUmschalten);
  }

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", navigationSchliessen);
  });

  if (backToTop) {
    backToTop.addEventListener("click", zurSeitenoberkante);
  }

  if (kontaktFormular) {
    kontaktFormular.addEventListener("submit", formularPruefen);
  }
}

function seitenmoduleStarten() {
  if (document.getElementById("tourenListe")) {
    tourenRendern();
    tourenEventsVerbinden();
  }

  if (document.getElementById("packliste")) {
    packlisteRendern();
    packlisteEventsVerbinden();
  }
}

function hauptprogramm() {
  jahrSetzen();
  navbarBeimScrollen();
  ereignisseVerbinden();
  seitenmoduleStarten();
  console.log("GipfelWelt wurde erfolgreich geladen.");
}

document.addEventListener("DOMContentLoaded", hauptprogramm);