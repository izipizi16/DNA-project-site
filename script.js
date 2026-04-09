async function loadEvents() {
  try {
    // carica lista file dalla cartella events (trucco con GitHub raw API)
    const response = await fetch("https://api.github.com/repos/izipizi16/DNA-project-site/contents/events");
    const files = await response.json();

    const events = [];

    for (let file of files) {
      if (file.name.endsWith(".json")) {
        const res = await fetch(file.download_url);
        const data = await res.json();
        events.push(data);
      }
    }

    displayEvents(events);

  } catch (error) {
    console.error("Errore caricamento eventi:", error);
  }
}

function displayEvents(events) {
  const upcoming = document.getElementById("upcomingEvents");
  const past = document.getElementById("pastEvents");

  upcoming.innerHTML = "";
  past.innerHTML = "";

  const now = new Date();

  events.forEach(event => {
    const div = document.createElement("div");
    div.classList.add("event");

    let imageHTML = "";
    if (event.image) {
      const imageUrl = "https://raw.githubusercontent.com/izipizi16/DNA-project-site/main/" + event.image;
      imageHTML = `<img src="${imageUrl}" class="event-img">`;
    }

    div.innerHTML = `
      ${imageHTML}
      <h3>${event.title}</h3>
      <p>${event.date}</p>
      <p>${event.description}</p>
    `;

    if (event.galleryLink) {
      const link = document.createElement("a");
      link.href = event.galleryLink;
      link.target = "_blank";
      link.innerText = "Guarda tutte le foto 📸";
      link.style.color = "#a855f7";
      link.style.display = "block";
      link.style.marginTop = "10px";

      div.appendChild(link);
    }

    const eventDate = new Date(event.date);

    if (eventDate >= now) {
      upcoming.appendChild(div);
    } else {
      past.appendChild(div);
    }
  });
}

// scroll bottone
document.getElementById("scrollButton")?.addEventListener("click", () => {
  document.getElementById("events").scrollIntoView({ behavior: "smooth" });
});

// carica eventi
loadEvents();

// 🧬 genera DNA dinamici
function createDNA() {
  const container = document.querySelector(".dna-background");

  for (let i = 0; i < 40; i++) {
    const dna = document.createElement("div");
    dna.classList.add("dna");
    dna.innerText = "🧬";

    dna.style.left = Math.random() * 100 + "vw";
    dna.style.animationDuration = (5 + Math.random() * 10) + "s";
    dna.style.fontSize = (20 + Math.random() * 40) + "px";

    container.appendChild(dna);
  }
}

createDNA();