// -----------------------------
// CONFIG
// -----------------------------
const eventsContainerFuture = document.getElementById("events-future");
const eventsContainerPast = document.getElementById("events-past");
const repoURL = "https://raw.githubusercontent.com/izipizi16/DNA-project-site/main/events/";

// Lista dei file events (in futuro possiamo generarla dinamicamente)
const eventsFiles = ["evento1.md", "evento2.md"]; // Sostituisci con i tuoi file reali

// -----------------------------
// SCROLL BOTTONI
// -----------------------------
document.querySelector(".hero button").addEventListener("click", () => {
  document.getElementById("events-section").scrollIntoView({ behavior: "smooth" });
});

// -----------------------------
// PARSING EVENTI
// -----------------------------
async function fetchEvents() {
  const events = [];

  for (const file of eventsFiles) {
    const res = await fetch(`${repoURL}${file}`);
    const text = await res.text();

    // Parse frontmatter semplice
    const match = text.match(/---\s*([\s\S]*?)\s*---/);
    if (match) {
      const yaml = match[1];
      const event = {};
      yaml.split("\n").forEach(line => {
        const [key, ...rest] = line.split(":");
        if (!key) return;
        event[key.trim()] = rest.join(":").trim();
      });
      events.push(event);
    }
  }

  return events;
}

// -----------------------------
// CREAZIONE Riquadri HTML
// -----------------------------
function createEventCard(event) {
  const card = document.createElement("div");
  card.className = "event-card";

  // Cover
  if (event.cover) {
    const img = document.createElement("img");
    img.src = `/images/uploads/${event.cover}`;
    img.alt = event.title;
    card.appendChild(img);
  }

  // Titolo
  const h3 = document.createElement("h3");
  h3.textContent = event.title;
  card.appendChild(h3);

  // Data
  const pDate = document.createElement("p");
  pDate.className = "event-date";
  pDate.textContent = new Date(event.date).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
  card.appendChild(pDate);

  // Descrizione
  const pBody = document.createElement("p");
  pBody.textContent = event.body;
  card.appendChild(pBody);

  // Galleria immagini
  if (event.gallery) {
    const galleryDiv = document.createElement("div");
    galleryDiv.className = "gallery";
    event.gallery.split(",").forEach(imgName => {
      const img = document.createElement("img");
      img.src = `/images/uploads/${imgName.trim()}`;
      galleryDiv.appendChild(img);
    });
    card.appendChild(galleryDiv);
  }

  return card;
}

// -----------------------------
// POPOLARE EVENTI FUTURI / PASSATI
// -----------------------------
async function renderEvents() {
  const events = await fetchEvents();
  const today = new Date();

  events.forEach(event => {
    const eventDate = new Date(event.date);
    const card = createEventCard(event);

    if (eventDate >= today) {
      eventsContainerFuture.appendChild(card);
    } else {
      eventsContainerPast.appendChild(card);
    }
  });
}

// Avvio
renderEvents();