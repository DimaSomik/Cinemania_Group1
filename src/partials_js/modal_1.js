import { getMovieDetails } from './api';

export async function openDetailsModal(movieId) {
  const movieDetails = getMovieDetails(movieId);

  document.querySelector('.MovieCard').style.display = "flex";

  document.querySelector('.ModalMovieTitle').innerText = movieDetails.title;
  document.querySelector('.ModalMovieRating').innerText = movieDetails.vote_average;
  document.querySelector('.ModalMovieDetails p:nth-of-type(3)').innerText = movieDetails.popularity;
//   document.querySelector('.ModalMovieDetails p:nth-of-type(4)').innerText = movieDetails.genres.map(genre => genre.name).join(' ');
  // document.querySelector('.ModalMovieDetails p:nth-of-type(6)').innerText = movieDetails.overview;
  document.getElementById('detailsModal').style.display = 'flex'; // Otwórz modal
};

// Funkcja zamykająca modal
function closeDetailsModal() {
  document.getElementById('detailsModal').style.display = 'none';
};
