const filmsFullApi = 'http://localhost:3000/films';
const firstMovieUrl = `${filmsFullApi}/1`;
const filmsList = el('films')

let currentFilm;

fetch(firstMovieUrl)
.then (res => res.json())
.then(showMovieInfo);

fetch(filmsFullApi)
.then (res => res.json())
.then(filmsMenu);

el('buy-ticket').addEventListener('click', () => {
  currentFilm.tickets_sold += 1;
  el('ticket-num').textContent = Math.max(0, currentFilm.capacity - currentFilm.tickets_sold)
});

function filmsMenu(films){
  filmsList.innerHTML = '';
  films.forEach(film => {
    const filmLi = document.createElement('li')
    filmLi.textContent = film.title;
    filmLi.classList.add('film');
    filmLi.classList.add('item');
    filmsList.appendChild(filmLi);
  })
}

function showMovieInfo(movie) {
  el('title').textContent = movie.title;
  el('runtime').textContent = movie.runtime;
  el('film-info').textContent = movie.description;
  el('showtime').textContent = movie.showtime;
  el('ticket-num').textContent = parseInt(movie.capacity) - parseInt(movie.tickets_sold);
  el('poster').src = movie.poster;
  currentFilm = movie;
}

function el(id) {
  return document.getElementById(id);
}