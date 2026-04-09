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
  const container = document.getElementById("upcomingEvents");

  container.innerHTML = "";

  events.forEach(event => {
    const div = document.createElement("div");
    div.classList.add("event");

    div.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.date}</p>
      <p>${event.description}</p>
    `;

    container.appendChild(div);
  });
}

// scroll bottone
document.getElementById("scrollButton")?.addEventListener("click", () => {
  document.getElementById("events").scrollIntoView({ behavior: "smooth" });
});

// carica eventi
loadEvents();