import { getGenres } from './api';

let currentIndex = 0;
let userMoviesList = [];
let availableGenres = [];
const userMoviesContainer = document.getElementById('user-movies');
const showMoreButton = document.getElementById('show-more');

async function fetchAvailableGenres() {
  availableGenres = await getGenres();
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

function renderUserMovies(limit = getUserMoviesPerLoad()) {
  const moviesToLoad = limit;

  for (let i = 0; i < moviesToLoad; i++) {
    if (currentIndex < userMoviesList.length) {
      const movie = userMoviesList[currentIndex];

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
        userMoviesContainer.appendChild(movieCard);
        currentIndex++;
      } else {
        console.error(
          `Movie is not defined or genre_ids are missing for index ${currentIndex}`
        );
      }
    } else {
      showMoreButton.style.display = 'none';
      break;
    }
  }
}

function showMoreMovies() {
  renderUserMovies(getUserMoviesPerLoad());
}

async function initializeMovies() {
  await fetchAvailableGenres();
  fetchMoviesFromStorage();
  renderUserMovies(12);
}

document.addEventListener('DOMContentLoaded', initializeMovies);

showMoreButton.addEventListener('click', showMoreMovies);
