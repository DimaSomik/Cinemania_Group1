import axios from 'axios';

const apiKey = 'cc77d73a1f36cdb91d7e6b21f538344a';
const baseUrl = 'https://api.themoviedb.org/3';

// Function to fetch today's popular movies
export async function getPopularMoviesToday(page = 1) {
  const today = new Date().toISOString().split('T')[0];
  const response = await axios.get(`${baseUrl}/trending/movie/day`, {
    params: {
      api_key: apiKey,
      date: today,
      page: page,
    },
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  }; // Also return total_pages
}

// Function to fetch this week's popular movies
export async function getPopularMoviesWeek(page = 1) {
  const response = await axios.get(`${baseUrl}/trending/movie/week`, {
    params: {
      api_key: apiKey,
      page: page,
    },
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  }; // Also return total_pages
}

// Function to fetch upcoming movies
export async function getUpcomingMovies(page = 1) {
  const response = await axios.get(`${baseUrl}/movie/upcoming`, {
    params: {
      api_key: apiKey,
      page: page,
    },
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  }; // Also return total_pages
}

// Function to search for movies by keywords, year, and country
export async function searchMovies(query = '', year = '', country = '', page = 1) {
  let url = `${baseUrl}/search/movie?api_key=${apiKey}&page=${page}`;

  const params = {
    api_key: apiKey,
    page: page,
  };

  if (query) {
    params.query = query;
  }

  if (year) {
    params.year = year;
  }

  if (country) {
    params.region = country;
  }

  const response = await axios.get(url, { params });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  }; // Also return total_pages
}

// Function to fetch detailed information about a movie
export async function getMovieDetails(movieId) {
  const response = await axios.get(`${baseUrl}/movie/${movieId}`, {
    params: {
      api_key: apiKey,
    },
  });
  return response.data;
}

// Function to fetch movie trailers
export async function getMovieVideos(movieId) {
  const response = await axios.get(`${baseUrl}/movie/${movieId}/videos`, {
    params: {
      api_key: apiKey,
    },
  });
  return response.data.results;
}

// Function to fetch the list of genres
export async function getGenres() {
  const response = await axios.get(`${baseUrl}/genre/movie/list`, {
    params: {
      api_key: apiKey,
    },
  });
  return response.data.genres;
}

// Function to fetch the list of countries
export async function getCountries() {
  const response = await axios.get(`${baseUrl}/configuration/countries`, {
    params: {
      api_key: apiKey,
    },
  });
  return response.data;
}

// Example function calls
// (async () => {
//   const popularToday = await getPopularMoviesToday(1); // Page 1
//   console.log("Today's popular movies:", popularToday.results);
//   console.log('Total pages:', popularToday.totalPages);

//   const popularWeek = await getPopularMoviesWeek(1); // Page 1
//   console.log("This week's popular movies:", popularWeek.results);
//   console.log('Total pages:', popularWeek.totalPages);

//   const upcomingMovies = await getUpcomingMovies(1); // Page 1
//   console.log('Upcoming movies:', upcomingMovies.results);
//   console.log('Total pages:', upcomingMovies.totalPages);

//   const searchResults = await searchMovies('Speed', '2014', 'DE', 1); // Page 1
//   console.log('Search results:', searchResults.results);
//   console.log('Total pages:', searchResults.totalPages);

//   const movieDetails = await getMovieDetails(550); // Example movie ID
//   console.log('Movie details:', movieDetails);

//   const movieVideos = await getMovieVideos(550); // Example movie ID
//   console.log('Movie trailers:', movieVideos);

//   const genres = await getGenres();
//   console.log('List of genres:', genres);

//   const countries = await getCountries();
//   console.log('List of countries:', countries);
// })();
