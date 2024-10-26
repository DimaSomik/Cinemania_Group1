import { getUpcomingMovies } from './api';
import { getGenres } from './api';
import { getGenreNames } from './weekly_trends';

// const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original';
let genres = [];
let currentMovie = null;

function displayMovie(movie) {
  document.getElementById('movieTitle').textContent = movie.title;
  document.getElementById('releaseDate').textContent =
    movie.release_date.replaceAll('-', '.');
  let movieVoteAvarage = Number(movie.vote_average).toFixed(1);
  document.getElementById('movieVote').textContent = movieVoteAvarage;
  document.getElementById('movieVotes').textContent = movie.vote_count;
  let moviePopularity = Number(movie.popularity).toFixed(1);
  document.getElementById('moviePopularity').textContent = moviePopularity;

  const genreNames = getGenreNames(movie.genre_ids);
  document.getElementById('movieGenre').textContent = genreNames;

  document.getElementById('movieOverview').textContent = movie.overview;

  const backdropPath = movie.backdrop_path
    ? `${IMG_BASE_URL}${movie.backdrop_path}`
    : '../images/placeholder.jpg';
  document.getElementById('movieImg').src = backdropPath;

  currentMovie = movie;
  updateLibraryButton();
}

export function getRandomMovie(movies) {
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
}

(async () => {
  const fetchGenres = await getGenres();
  genres = fetchGenres;

  const fetchUpcomingMovies = await getUpcomingMovies(1);
  const randomMovie = getRandomMovie(fetchUpcomingMovies.results);
  displayMovie(randomMovie);
})();

const libraryButton = document.getElementById('libraryButton');

function updateLibraryButton() {
  const library = JSON.parse(localStorage.getItem('moviesLibrary')) || [];
  const isInLibrary = library.some(item => item.id === currentMovie.id);
  libraryButton.textContent = isInLibrary
    ? 'Remove from My Library'
    : 'Add to My Library';
}

function toggleLibrary() {
  let library = JSON.parse(localStorage.getItem('moviesLibrary')) || [];
  const isInLibrary = library.some(item => item.id === currentMovie.id);

  if (isInLibrary) {
    library = library.filter(item => item.id !== currentMovie.id);
  } else {
    library.push(currentMovie);
  }

  localStorage.setItem('moviesLibrary', JSON.stringify(library));
  updateLibraryButton();
}

libraryButton.addEventListener('click', toggleLibrary);
