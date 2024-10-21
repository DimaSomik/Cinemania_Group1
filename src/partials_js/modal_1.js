import { getMovieDetails } from './api';

export async function openDetailsModal(movieId) {
  const fetchData = await getMovieDetails(movieId);

  document.querySelector('.ModalMovieTitle').innerText = fetchData.title;
  document.querySelector('.ModalMovieRating').innerText = fetchData.vote_average;
  document.querySelector('.ModalMovieDetails p:nth-of-type(3)').innerText = fetchData.popularity;
  document.querySelector('.ModalMovieDetails p:nth-of-type(4)').innerText = fetchData.genres.map(genre => genre.name).join(' ');
  document.querySelector('.ModalMovieDetails p:nth-of-type(6)').innerText = fetchData.overview;
  document.getElementById('detailsModal').style.display = 'flex'; // Otwórz modal
}

// Funkcja zamykająca modal
function closeDetailsModal() {
  document.getElementById('detailsModal').style.display = 'none';
}
