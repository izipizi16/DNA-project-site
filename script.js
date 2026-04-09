async function loadEvents() {
  const upcomingContainer = document.getElementById('upcomingEvents');
  const pastContainer = document.getElementById('pastEvents');

  const now = new Date();

  // 👉 AGGIORNA QUI quando crei nuovi eventi
  const files = [
    '/events/testtttttt.json'
  ];

  for (let file of files) {
    try {
      const res = await fetch(file);
      const event = await res.json();

      const div = document.createElement('div');
      div.classList.add('event-card');

      div.innerHTML = `
        <h3>${event.title}</h3>
        <p>${new Date(event.date).toLocaleString()}</p>
        <p>${event.description}</p>
      `;

      const eventDate = new Date(event.date);

      if (eventDate >= now) {
        upcomingContainer.appendChild(div);
      } else {
        pastContainer.appendChild(div);
      }

    } catch (err) {
      console.error(err);
    }
  }
}

loadEvents();

// scroll bottone
document.getElementById("scrollButton").addEventListener("click", () => {
  document.getElementById("events").scrollIntoView({ behavior: "smooth" });
});