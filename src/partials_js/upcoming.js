import { getUpcomingMovies } from "./api";
import { getGenres } from "./api";
import { getGenreNames } from "./weekly_trends";

// const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original';
let genres = [];

function displayMovie(movie) {
  document.getElementById('movieTitle').textContent = movie.title;
  document.getElementById('releaseDate').textContent = movie.release_date.replaceAll("-", ".");
  let movieVoteAvarage = Number(movie.vote_average).toFixed(1);
  document.getElementById('movieVote').textContent = movieVoteAvarage;
  document.getElementById('movieVotes').textContent = movie.vote_count;
  let moviePopularity = Number(movie.popularity).toFixed(1);
  document.getElementById('moviePopularity').textContent = moviePopularity;
  
  const genreNames = getGenreNames(movie.genre_ids);
  document.getElementById('movieGenre').textContent = genreNames;
  
  document.getElementById('movieOverview').textContent = movie.overview;
  
  console.log(movie);
  const backdropPath = movie.backdrop_path ? `${IMG_BASE_URL}${movie.backdrop_path}` : '../images/placeholder.jpg';
  document.getElementById('movieImg').src = backdropPath;
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

libraryButton.addEventListener('click', function () {
  if (libraryButton.textContent.trim() === 'Add to my library') {
    libraryButton.textContent = 'Remove from my library';
  } else {
    libraryButton.textContent = 'Add to my library';
  }
});

