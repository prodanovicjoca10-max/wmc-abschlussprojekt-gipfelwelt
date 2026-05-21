const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const kontaktFormular = document.getElementById("kontaktFormular");
const year = document.getElementById("year");
const resultInfo = document.getElementById("resultInfo");

const tourenDaten = [
  {
    id: 1,
    name: "Nordketten-Panoramaweg",
    land: "Österreich",
    schwierigkeit: "Mittel",
    saison: "Sommer",
    dauer: "4 Stunden",
    ort: "Innsbruck",
    beschreibung: "Aussichtsreiche Bergtour mit beeindruckendem Blick auf Innsbruck und die Alpen."
  },
  {
    id: 2,
    name: "Zermatt Höhenweg",
    land: "Schweiz",
    schwierigkeit: "Schwer",
    saison: "Herbst",
    dauer: "6 Stunden",
    ort: "Zermatt",
    beschreibung: "Anspruchsvolle Route mit grandiosen Gipfelblicken und alpiner Landschaft."
  },
  {
    id: 3,
    name: "Dolomiten Rundweg",
    land: "Italien",
    schwierigkeit: "Mittel",
    saison: "Sommer",
    dauer: "5 Stunden",
    ort: "Cortina d'Ampezzo",
    beschreibung: "Spektakuläre Felsformationen, klare Luft und wunderschöne Panoramapunkte."
  },
  {
    id: 4,
    name: "Almweg Tirol",
    land: "Österreich",
    schwierigkeit: "Leicht",
    saison: "Frühling",
    dauer: "3 Stunden",
    ort: "Innsbruck",
    beschreibung: "Gemütliche Wanderung für Einsteiger mit Almen, Wiesen und entspannter Strecke."
  },
  {
    id: 5,
    name: "Schneepfad Engadin",
    land: "Schweiz",
    schwierigkeit: "Mittel",
    saison: "Winter",
    dauer: "4,5 Stunden",
    ort: "St. Moritz",
    beschreibung: "Winterliche Tour mit ruhigen Schneelandschaften und frischer Bergluft."
  },
  {
    id: 6,
    name: "Cinque-Torri-Steig",
    land: "Italien",
    schwierigkeit: "Schwer",
    saison: "Herbst",
    dauer: "5,5 Stunden",
    ort: "Cortina d'Ampezzo",
    beschreibung: "Abwechslungsreiche Route mit alpinem Charakter und eindrucksvollen Felskulissen."
  }
];

let packlistenDaten = [
  { id: 1, name: "Wanderschuhe", beschreibung: "Stabiler Halt für alpine Wege", erledigt: false },
  { id: 2, name: "Wasserflasche", beschreibung: "Ausreichend Flüssigkeit für die Tour", erledigt: true },
  { id: 3, name: "Regenjacke", beschreibung: "Wichtiger Schutz bei Wetterumschwung", erledigt: false },
  { id: 4, name: "Sonnencreme", beschreibung: "Schutz vor intensiver UV-Strahlung", erledigt: false },
  { id: 5, name: "Erste-Hilfe-Set", beschreibung: "Für kleine Notfälle unterwegs", erledigt: false }
];

const wetterFallback = {
  "Innsbruck": { temperature_2m: "17", wind_speed_10m: "11", weather_code: 2 },
  "Zermatt": { temperature_2m: "9", wind_speed_10m: "18", weather_code: 3 },
  "Cortina d'Ampezzo": { temperature_2m: "14", wind_speed_10m: "13", weather_code: 1 },
  "St. Moritz": { temperature_2m: "7", wind_speed_10m: "16", weather_code: 71 }
};

function jahrSetzen() {
  if (year) {
    year.textContent = new Date().getFullYear().toString();
  }
}

function navbarBeimScrollen() {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }

  if (backToTop) {
    backToTop.classList.toggle("show", window.scrollY > 500);
  }
}

function menueUmschalten() {
  if (!navLinks || !menuBtn) return;

  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));

  const icon = menuBtn.querySelector("i");
  if (icon) {
    icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  }
}

function navigationSchliessen() {
  if (!navLinks || !menuBtn) return;

  navLinks.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");

  const icon = menuBtn.querySelector("i");
  if (icon) {
    icon.className = "fa-solid fa-bars";
  }
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
  kontaktFormular?.reset();
}

function createIcon(className) {
  const icon = document.createElement("i");
  icon.className = className;
  return icon;
}

function createPillSpan(text) {
  const span = document.createElement("span");
  span.className = "pill";
  span.textContent = text;
  return span;
}

function createPillButton(text, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "pill pill-button";
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

function createWeatherItem(label, value) {
  const item = document.createElement("div");
  item.className = "wetter-item";

  const title = document.createElement("span");
  title.textContent = label;

  const strong = document.createElement("strong");
  strong.textContent = value;

  item.append(title, strong);
  return item;
}

function wetterCodeText(code) {
  const codes = {
    0: "Klarer Himmel",
    1: "Überwiegend klar",
    2: "Teilweise bewölkt",
    3: "Bedeckt",
    45: "Neblig",
    48: "Raureifnebel",
    51: "Leichter Nieselregen",
    53: "Mäßiger Nieselregen",
    55: "Starker Nieselregen",
    61: "Leichter Regen",
    63: "Mäßiger Regen",
    65: "Starker Regen",
    71: "Leichter Schneefall",
    73: "Mäßiger Schneefall",
    75: "Starker Schneefall",
    80: "Regenschauer",
    95: "Gewitter"
  };

  return codes[code] || "Unbekannter Wetterzustand";
}

function filterAusUrlAnwenden() {
  const params = new URLSearchParams(window.location.search);

  const land = params.get("land");
  const schwierigkeit = params.get("schwierigkeit");
  const saison = params.get("saison");
  const suche = params.get("suche");

  const landFilter = document.getElementById("landFilter");
  const schwierigkeitFilter = document.getElementById("schwierigkeitFilter");
  const saisonFilter = document.getElementById("saisonFilter");
  const sucheInput = document.getElementById("sucheInput");

  if (land && landFilter) landFilter.value = land;
  if (schwierigkeit && schwierigkeitFilter) schwierigkeitFilter.value = schwierigkeit;
  if (saison && saisonFilter) saisonFilter.value = saison;
  if (suche && sucheInput) sucheInput.value = suche;
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
      suche === "" ||
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
  icon.appendChild(createIcon("fa-solid fa-mountain"));

  const titel = document.createElement("h3");
  titel.textContent = tour.name;

  const beschreibung = document.createElement("p");
  beschreibung.textContent = tour.beschreibung;

  const pillList = document.createElement("div");
  pillList.className = "pill-list";

  const landPill = createPillButton(tour.land, () => {
    const landFilter = document.getElementById("landFilter");
    if (landFilter) {
      landFilter.value = tour.land;
      tourenRendern();
    }
  });

  const schwierigkeitPill = createPillButton(tour.schwierigkeit, () => {
    const schwierigkeitFilter = document.getElementById("schwierigkeitFilter");
    if (schwierigkeitFilter) {
      schwierigkeitFilter.value = tour.schwierigkeit;
      tourenRendern();
    }
  });

  const saisonPill = createPillButton(tour.saison, () => {
    const saisonFilter = document.getElementById("saisonFilter");
    if (saisonFilter) {
      saisonFilter.value = tour.saison;
      tourenRendern();
    }
  });

  const dauerPill = createPillSpan(tour.dauer);

  const ortPill = createPillButton(tour.ort, () => {
    const sucheInput = document.getElementById("sucheInput");
    if (sucheInput) {
      sucheInput.value = tour.ort;
      tourenRendern();
    }
  });

  pillList.append(landPill, schwierigkeitPill, saisonPill, dauerPill, ortPill);
  content.append(icon, titel, beschreibung, pillList);
  artikel.appendChild(content);

  return artikel;
}

function tourenRendern() {
  const liste = document.getElementById("tourenListe");
  if (!liste) return;

  const gefilterteTouren = tourenFiltern();
  liste.replaceChildren();

  if (resultInfo) {
    resultInfo.textContent = `${gefilterteTouren.length} Tour${gefilterteTouren.length === 1 ? "" : "en"} gefunden`;
  }

  if (gefilterteTouren.length === 0) {
    const leerBox = document.createElement("div");
    leerBox.className = "leer-box";

    const title = document.createElement("h3");
    title.textContent = "Keine Touren gefunden";

    const text = document.createElement("p");
    text.textContent = "Bitte ändere deine Filter oder probiere einen anderen Suchbegriff.";

    leerBox.append(title, text);
    liste.appendChild(leerBox);
    return;
  }

  gefilterteTouren.forEach((tour) => {
    liste.appendChild(tourenKarteErstellen(tour));
  });
}

function wetterAusgabeRendern(ortName, aktuell, infoText = "") {
  const ausgabe = document.getElementById("wetterAusgabe");
  if (!ausgabe) return;

  ausgabe.replaceChildren();

  const titel = document.createElement("h3");
  titel.textContent = `Aktuelles Wetter in ${ortName}`;

  const grid = document.createElement("div");
  grid.className = "wetter-grid";

  grid.append(
    createWeatherItem("Temperatur", `${aktuell.temperature_2m} °C`),
    createWeatherItem("Wind", `${aktuell.wind_speed_10m} km/h`),
    createWeatherItem("Wetterlage", wetterCodeText(Number(aktuell.weather_code)))
  );

  ausgabe.append(titel, grid);

  if (infoText) {
    const info = document.createElement("p");
    info.className = "status-zeile";
    info.textContent = infoText;
    ausgabe.appendChild(info);
  }
}

async function wetterLaden() {
  const ortElement = document.getElementById("ortWahl");
  const ausgabe = document.getElementById("wetterAusgabe");

  if (!ortElement || !ausgabe) return;

  ausgabe.textContent = "Wetterdaten werden geladen...";

  const teile = ortElement.value.split(",");
  const lat = teile[0];
  const lon = teile[1];
  const ortName = teile.slice(2).join(",");

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto&wind_speed_unit=kmh`;
    const antwort = await fetch(url);

    if (!antwort.ok) {
      throw new Error(`HTTP-Fehler ${antwort.status}`);
    }

    const daten = await antwort.json();

    if (!daten.current) {
      throw new Error("Keine Wetterdaten vorhanden");
    }

    wetterAusgabeRendern(ortName, daten.current);
  } catch (fehler) {
    const fallback = wetterFallback[ortName];

    if (fallback) {
      wetterAusgabeRendern(ortName, fallback, "Lokaler Fallback wurde verwendet.");
    } else {
      ausgabe.replaceChildren();

      const box = document.createElement("div");
      box.className = "leer-box";

      const title = document.createElement("h3");
      title.textContent = "Wetterdaten konnten nicht geladen werden";

      const text = document.createElement("p");
      text.textContent = "Bitte teste die Seite über Live Server oder versuche eine andere Region.";

      box.append(title, text);
      ausgabe.appendChild(box);
    }

    console.error(fehler);
  }
}

function packlisteStatusAktualisieren() {
  const statusText = document.getElementById("statusText");
  if (!statusText) return;

  const gesamt = packlistenDaten.length;
  const erledigt = packlistenDaten.filter((eintrag) => eintrag.erledigt).length;

  statusText.textContent = `${gesamt} Gegenstände in der Packliste – ${erledigt} erledigt`;
}

function packlisteArtikelErstellen(eintrag) {
  const artikel = document.createElement("article");
  artikel.className = `pack-item ${eintrag.erledigt ? "erledigt" : ""}`;

  const links = document.createElement("div");
  links.className = "pack-item-links";

  const statusBtn = document.createElement("button");
  statusBtn.className = "pack-status";
  statusBtn.type = "button";
  statusBtn.setAttribute("aria-label", "Status ändern");

  const statusIcon = createIcon("fa-solid fa-check");
  statusBtn.appendChild(statusIcon);
  statusBtn.addEventListener("click", () => {
    eintrag.erledigt = !eintrag.erledigt;
    packlisteRendern();
  });

  const textBox = document.createElement("div");
  textBox.className = "pack-text";

  const title = document.createElement("h3");
  title.textContent = eintrag.name;

  const text = document.createElement("p");
  text.textContent = eintrag.beschreibung || "Manuell zur Packliste hinzugefügt";

  textBox.append(title, text);
  links.append(statusBtn, textBox);

  const actions = document.createElement("div");
  actions.className = "pack-actions";

  const toggleButton = document.createElement("button");
  toggleButton.className = "mini-btn toggle-btn";
  toggleButton.type = "button";
  toggleButton.textContent = eintrag.erledigt ? "Als offen markieren" : "Als eingepackt markieren";
  toggleButton.addEventListener("click", () => {
    eintrag.erledigt = !eintrag.erledigt;
    packlisteRendern();
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "mini-btn delete-btn";
  deleteButton.type = "button";
  deleteButton.append(createIcon("fa-solid fa-trash"), document.createTextNode(" Löschen"));
  deleteButton.addEventListener("click", () => {
    packlistenDaten = packlistenDaten.filter((item) => item.id !== eintrag.id);
    packlisteRendern();
  });

  actions.append(toggleButton, deleteButton);
  artikel.append(links, actions);

  return artikel;
}

function packlisteRendern() {
  const box = document.getElementById("packlisteBox");
  if (!box) return;

  box.replaceChildren();
  packlisteStatusAktualisieren();

  if (packlistenDaten.length === 0) {
    const leerBox = document.createElement("div");
    leerBox.className = "leer-box";

    const title = document.createElement("h3");
    title.textContent = "Die Packliste ist leer";

    const text = document.createElement("p");
    text.textContent = "Füge einen neuen Gegenstand hinzu, um mit der Planung zu beginnen.";

    leerBox.append(title, text);
    box.appendChild(leerBox);
    return;
  }

  packlistenDaten.forEach((eintrag) => {
    box.appendChild(packlisteArtikelErstellen(eintrag));
  });
}

function gegenstandHinzufuegen() {
  const input = document.getElementById("gegenstandInput");
  if (!input) return;

  const wert = input.value.trim();

  if (!wert) {
    alert("Bitte gib einen Gegenstand ein.");
    return;
  }

  packlistenDaten.unshift({
    id: Date.now(),
    name: wert,
    beschreibung: "Manuell zur Packliste hinzugefügt",
    erledigt: false
  });

  input.value = "";
  input.focus();
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

  const wetterBtn = document.getElementById("wetterBtn");
  if (wetterBtn) {
    wetterBtn.addEventListener("click", wetterLaden);
  }
}

function packlisteEventsVerbinden() {
  const packForm = document.getElementById("packForm");
  if (packForm) {
    packForm.addEventListener("submit", (event) => {
      event.preventDefault();
      gegenstandHinzufuegen();
    });
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
    filterAusUrlAnwenden();
    tourenRendern();
    tourenEventsVerbinden();
  }

  if (document.getElementById("packlisteBox")) {
    packlisteRendern();
    packlisteEventsVerbinden();
  }
}

function hauptprogramm() {
  jahrSetzen();
  navbarBeimScrollen();
  ereignisseVerbinden();
  seitenmoduleStarten();
}

document.addEventListener("DOMContentLoaded", hauptprogramm);