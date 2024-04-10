const firstMovieUrl = 'http://localhost:3000/films/1';

fetch(firstMovieUrl)
.then (res => res.json())
.then(showMovieInfo);

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