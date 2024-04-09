document.addEventListener('DOMContentLoaded', () => {
  const filmsList = document.getElementById('films');
  const showing = document.getElementById('showing');
  const buyTicket = document.getElementById("buy-ticket");
  const ticketNum = document.getElementById("ticket-num");

  // Fetch initial data
  fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(data => {
      const film = data[0];
      displayFilm(film);
      displayFilms(data);
    });

  // Displaying the first film
  function displayFilm(film) {
    document.getElementById("title").innerText = film.title;
    document.getElementById("runtime").innerText = `${film.runtime} minutes`;
    document.getElementById("film-info").innerText = film.description;
    document.getElementById("showtime").innerText = film.showtime;
    ticketNum.innerText = film.capacity - film.tickets_sold;
    document.getElementById("poster").src = film.poster;

    if (film.tickets_sold === film.capacity) {
      buyTicket.innerText = "Sold Out";
      buyTicket.disabled = true;
      filmsList.querySelector(`li[data-id="${film.id}"]`).classList.add("sold-out");
    } else {
      buyTicket.innerText = "Buy Ticket";
      buyTicket.disabled = false;
    }

    buyTicket.addEventListener("click", () => buyTicketHandler(film));
  }

  // Displaying the list of films
  function displayFilms(films) {
    films.forEach((film) => {
      const listItem = document.createElement("li");
      listItem.classList.add("film", "item");
      if (film.tickets_sold === film.capacity) {
        listItem.classList.add("sold-out");
        listItem.innerText = `${film.title} (Sold Out)`;
      } else {
        listItem.innerText = film.title;
      }
      listItem.dataset.id = film.id;
      listItem.addEventListener("click", () => {
        fetch(`http://localhost:3000/films/${film.id}`)
          .then(response => response.json())
          .then(film => displayFilm(film, showing));
      });
      filmsList.appendChild(listItem);
    });
  }

  // Buying a ticket
  function buyTicketHandler(film) {
    if (film.tickets_sold < film.capacity) {
      film.tickets_sold++;
      ticketNum.innerText = film.capacity - film.tickets_sold;
      updateFilm(film);
      createTicket(film);

      if (film.tickets_sold === film.capacity) {
        buyTicket.innerText = "Sold Out";
        buyTicket.disabled = true;
        filmsList.querySelector(`li[data-id="${film.id}"]`).classList.add("sold-out");
      }
    } else {
      alert("This showing is sold out.");
    }
  }

  // Updating the film on the server
  function updateFilm(film) {
    fetch(`http://localhost:3000/films/${film.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tickets_sold: film.tickets_sold }),
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error));
  }

  // Creating a ticket
  function createTicket(film) {
    fetch("http://localhost:3000/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ film_id: film.id, number_of_tickets: 1 }),
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error));
  }

  // Delete a film
  filmsList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const filmId = event.target.closest("li").dataset.id;
      deleteFilm(filmId);
    }
  });

  // Deleting the film from the server
  function deleteFilm(filmId) {
    fetch(`http://localhost:3000/films/${filmId}`, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(() => {
        window.location.reload();
      })
      .catch(error => console.error("Error:", error));
  }
});