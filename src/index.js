const filmsFullApi = 'http://localhost:3000/films';
const firstMovieUrl = `${filmsFullApi}/1`;
const filmsList = el('films')

fetch(firstMovieUrl)
.then (res => res.json())
.then(showMovieInfo);

fetch(filmsFullApi)
.then (res => res.json())
.then(filmsMenu);

function filmsMenu(films){
  filmsList.innerHTML = '';
  films.forEach(film => {
    const filmLi = document.createElement('li')
    filmLi.textContent = film.title;
    filmLi.classList.add('film');
    filmLi.classList.add('item');
    filmsList.appendChild(filmLi);
  });
}

function showMovieInfo(movie) {
  el('title').textContent = movie.title;
  el('runtime').textContent = movie.runtime;
  el('film-info').textContent = movie.description;
  el('showtime').textContent = movie.showtime;
  el('ticket-num').textContent = parseInt(movie.capacity) - parseInt(movie.tickets_sold);
  el('poster').src = movie.poster;
}

function el(id) {
  return document.getElementById(id);
}