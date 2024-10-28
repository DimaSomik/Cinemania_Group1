import { getGenreNames } from "./weekly_trends";

const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModalBtn');
const moviePoster = document.getElementById('moviePoster');
const movieTitle = document.querySelector('.FirstModalTitle')
const movieRating = document.getElementById('movieRating');
const moviePopularity = document.querySelector('.FirstModalPopularity');
const movieGenres = document.querySelector('.FirstModalGenres');
const movieDescription = document.getElementById('movieDescription');
const toggleLibraryBtn = document.getElementById('toggleLibraryBtn');
const trailerContainer = document.getElementById('trailerContainer');

let currentMovie = null;

// Funkcja do wyświetlania modala
export async function showModal(movie) {
  currentMovie = movie;
  moviePoster.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
  movieTitle.innerText = movie.title;
  movieRating.innerText = `${movie.vote_average.toFixed(1)} / ${movie.vote_count.toFixed(1)}`;
  moviePopularity.innerText = `${movie.popularity.toFixed(1)}`;
  const genreNames = getGenreNames(movie.genre_ids);
  movieGenres.innerText = `${genreNames}`;
  movieDescription.innerText = movie.overview;

  updateLibraryButton();
  modal.classList.remove('hidden');

  document.addEventListener('keydown', handleEscKeyPress);
}

// Funkcja do zamykania modala
function closeModal() {
  modal.classList.add('hidden');
  trailerContainer.classList.add('hidden');
  trailerContainer.innerHTML = ''; // Usuń trailer z kontenera
  document.removeEventListener('keydown', handleEscKeyPress);
}

// Funkcja obsługująca naciśnięcie klawisza ESC
function handleEscKeyPress(event) {
  if (event.key === 'Escape') closeModal();
}

// Funkcja do aktualizacji tekstu przycisku (dodaj/usuń z `My library`)
function updateLibraryButton() {
  const library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  const isInLibrary = library.some(item => item.id === currentMovie.id);
  toggleLibraryBtn.textContent = isInLibrary ? 'Remove from My Library' : 'Add to My Library';
}

// Funkcja do dodawania/usuwa filmu z `My library`
function toggleLibrary() {
  let library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  const isInLibrary = library.some(item => item.id === currentMovie.id);

  if (isInLibrary) {
    library = library.filter(item => item.id !== currentMovie.id);
  } else {
    library.push(currentMovie);
  }

  localStorage.setItem('myLibrary', JSON.stringify(library));
  updateLibraryButton();
}

// Funkcja do wyświetlania trailera
async function showTrailer() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${currentMovie.id}/videos?api_key=YOUR_KEY`);
    const data = await response.json();
    const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');

    if (trailer) {
      trailerContainer.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>`;
      trailerContainer.classList.remove('hidden');
    } else {
      trailerContainer.innerHTML = '<p>Sorry, no trailer available.</p>';
      trailerContainer.classList.remove('hidden');
    }
  } catch (error) {
    console.error('Failed to load trailer:', error);
  }
}

// Event listeners
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});
toggleLibraryBtn.addEventListener('click', toggleLibrary);

// Przykład wywołania showModal z obiektem filmu
// showModal({ id: 123, poster_path: '/example.jpg', title: 'Example Movie', vote_average: 8.5, popularity: 123.4, overview: 'This is an example description.' });