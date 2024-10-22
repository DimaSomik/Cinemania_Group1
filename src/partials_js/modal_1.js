export async function openDetailsModal(movieId) {
  document.querySelector('.MovieCard').style.display = "flex";

  document.querySelector('.ModalMovieTitle').innerText = movieId.title;
  document.querySelector('.ModalMovieRating').innerText = movieId.vote_average;
  document.querySelector('.ModalMovieDetails p:nth-of-type(3)').innerText = movieId.popularity;
//   document.querySelector('.ModalMovieDetails p:nth-of-type(4)').innerText = movieId.genres.map(genre => genre.name).join(' ');
  // document.querySelector('.ModalMovieDetails p:nth-of-type(6)').innerText = movieId.overview;
  document.getElementById('detailsModal').style.display = 'flex'; // Otwórz modal
};

// Funkcja zamykająca modal
function closeDetailsModal() {
  document.getElementById('detailsModal').style.display = 'none';
};
