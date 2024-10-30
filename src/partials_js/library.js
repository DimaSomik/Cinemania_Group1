import { getGenres } from './api';
import { showModal } from './modal_1';

let currentIndex = 0;
let userMoviesList = [];
let availableGenres = [];
const userMoviesContainer = document.getElementById('user-movies');
const showMoreButton = document.getElementById('show-more');
const genreFilter = document.getElementById('genre-filter');

const DEFAULT_MOVIES_TO_DISPLAY = 9;
const MOVIES_INCREMENT = 3;

async function fetchAvailableGenres() {
  availableGenres = await getGenres();
  populateGenreDropdown();
}

function populateGenreDropdown() {
  availableGenres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre.id;
    option.textContent = genre.name;
    genreFilter.appendChild(option);
  });
}

function fetchMoviesFromStorage() {
  const storedUserMovies =
    JSON.parse(localStorage.getItem('moviesLibrary')) || [];
  userMoviesList = userMoviesList.concat(storedUserMovies);
}

function getUserMoviesPerLoad() {
  const screenWidth = window.innerWidth;
  return screenWidth < 768 ? 1 : 3;
}

export function fetchGenreNames(genreIds) {
  return genreIds
    .map(id => {
      const genre = availableGenres.find(g => g.id === id);
      return genre ? genre.name : 'Unknown Genre';
    })
    .slice(0, 2)
    .join(', ');
}

function generateStars(vote) {
  const fullStars = Math.floor(vote / 2);
  return Array.from({ length: 5 }, (_, i) => (i < fullStars ? '★' : '☆')).join(
    ''
  );
}

function renderUserMovies(limit = DEFAULT_MOVIES_TO_DISPLAY, genreId = 'all') {
  userMoviesContainer.innerHTML = '';

  const filteredMovies =
    genreId === 'all'
      ? userMoviesList
      : userMoviesList.filter(movie =>
          movie.genre_ids.includes(Number(genreId))
        );

  for (let i = 0; i < Math.min(limit, filteredMovies.length); i++) {
    const movie = filteredMovies[currentIndex + i];

    if (movie && movie.genre_ids) {
      const genreNames = fetchGenreNames(movie.genre_ids);
      const movieCard = document.createElement('div');
      movieCard.classList.add('my-movie-card');
      movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
        movie.title
      }">
        <div class="my-movie-info">
          <h2 class="my-movie-title">${movie.title}</h2>
          <p>${genreNames} | ${movie.release_date.split('-')[0]}</p>
          <div class="my-stars">${generateStars(movie.vote_average)}</div>
        </div>
      `;
      movieCard.onclick = () => showModal(movie);
      userMoviesContainer.appendChild(movieCard);
    }
  }

  currentIndex += limit;

  // Zaktualizuj widoczność przycisku "Load more"
  showMoreButton.style.display =
    currentIndex < filteredMovies.length ? 'block' : 'none';
}

function filterMoviesByGenre() {
  const selectedGenreId = genreFilter.value;
  currentIndex = 0; // Resetuj indeks
  renderUserMovies(DEFAULT_MOVIES_TO_DISPLAY, selectedGenreId);
}

function showMoreMovies() {
  const selectedGenreId = genreFilter.value;
  renderUserMovies(MOVIES_INCREMENT, selectedGenreId);
}

async function initializeMovies() {
  await fetchAvailableGenres();
  fetchMoviesFromStorage();
  renderUserMovies(DEFAULT_MOVIES_TO_DISPLAY);
}

document.addEventListener('DOMContentLoaded', initializeMovies);
genreFilter.addEventListener('change', filterMoviesByGenre);
showMoreButton.addEventListener('click', showMoreMovies);
