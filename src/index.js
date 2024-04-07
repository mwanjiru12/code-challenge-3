// Your code here
$('ul#films').on('click', 'li.film', function() {
    const filmId = $(this).data('id');
    getMovieDetails(filmId);
  });

  const getMovieDetails = async (filmId) => {
    try {
      const response = await fetch(`/films/${filmId}`);
      const movie = await response.json();
      displayMovieDetails(movie);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const displayMovieDetails = (movie) => {
    // Update the movie details on the page
    $('#poster').attr('src', movie.poster);
    $('#title').text(movie.title);
    $('#runtime').text(`Runtime: ${movie.runtime} minutes`);
    $('#showtime').text(`Showtime: ${movie.showtime}`);
    $('#available-tickets').text(`Available Tickets: ${movie.capacity - movie.tickets_sold}`);
  };
