async function loadEvents() {
  const container = document.getElementById("events");

  try {
    const res = await fetch("/events/");
    const text = await res.text();

    // lista file (hack semplice)
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const links = [...doc.querySelectorAll("a")];

    const files = links
      .map(a => a.getAttribute("href"))
      .filter(href => href.endsWith(".json"));

    for (let file of files) {
      const eventRes = await fetch(file);
      const event = await eventRes.json();

      const div = document.createElement("div");
      div.innerHTML = `
        <h2>${event.title}</h2>
        <p>${new Date(event.date).toLocaleDateString()}</p>
        <img src="${event.image}" width="200"/>
        <p>${event.description}</p>
      `;

      container.appendChild(div);
    }
  } catch (err) {
    console.error(err);
  }
}

loadEvents();