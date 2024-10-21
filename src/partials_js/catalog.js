import { getPopularMoviesWeek } from './api';
import { getGenreNames } from './weekly_trends';
import { getGenres } from './api';
import { searchMovies } from './api';

let genres = [];

let currentPage = 1;
const totalPages = 24;

function getMovieStars(vote) {
  const fullStars = Math.floor(vote / 2);
  const halfStar = vote % 2 >= 0.5;
  let stars = '';

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars += '&#9733;'; // pełna
    } else if (i === fullStars && halfStar) {
      stars += '&#9734;'; // połowa
    } else {
      stars += '&#9734;'; // pusta
    }
  }
  return stars;
}

function createMovieCard(movie) {
  const releaseYear = movie.release_date
    ? movie.release_date.split('-')[0]
    : 'Unknown';

  const genreNames = getGenreNames(movie.genre_ids);

  return `
    <div class="catalog-movie-card">
        <img class="catalog-movie-img" src="https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }" alt="${movie.title}" />
            <div class="catalog-img-overlay"></div>
      <div class="catalog-movie-info">
        <div>
          <span class="catalog-movie-title">${movie.title}</span>
        </div>
        <div>
          <span class="catalog-movie-value">${genreNames}</span>
          <span class="catalog-separator">|</span>
          <span class="catalog-movie-value">${releaseYear}</span>
        </div>
      </div>
                    <span class="catalog-stars">${getMovieStars(
                      movie.vote_average
                    )}</span>
    </div>
  `;
}

function createMoviesCatalog(movies) {
  const gallery = document.querySelector('.catalog-gallery');
  gallery.innerHTML = movies.map(createMovieCard).join('');
}

async function initializeCatalog(page = 1) {
  await getGenres();

  const isMobile = window.innerWidth < 768;
  const moviesPerPage = isMobile ? 10 : 20;

  const { results } = await getPopularMoviesWeek(page);

  createMoviesCatalog(results.slice(0, moviesPerPage));

  currentPage = page;

  updatePaginationDisplay();
  initializePagination();
}

function handleResize() {
  initializeCatalog();
}

window.addEventListener('resize', handleResize);

function updatePaginationDisplay() {
  const pageButtons = document.querySelectorAll('.catalog-number-btn');
  pageButtons.forEach(button => {
    const pageNumber = parseInt(button.innerText);

    if (pageNumber === currentPage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

function handlePageButtonClick(event) {
  const page = parseInt(event.target.innerText);
  initializeCatalog(page);
}
function handleArrowLeftClick() {
  if (currentPage > 1) {
    currentPage--;
    initializeCatalog(currentPage);
  }
}

function handleArrowRightClick() {
  if (currentPage < totalPages) {
    currentPage++;
    initializeCatalog(currentPage);
  }
}

const createPageButton = (page, currentPage, paginationContainer) => {
  const button = document.createElement('button');
  button.classList.add('catalog-number-btn');
  button.innerText = String(page).padStart(2, '0');
  if (page === currentPage) button.classList.add('active');
  button.addEventListener('click', () => initializeCatalog(page));
  paginationContainer.appendChild(button);
};

const addDots = paginationContainer => {
  const dots = document.createElement('span');
  dots.classList.add('catalog-pagination-dots');
  dots.innerText = '...';
  paginationContainer.appendChild(dots);
};

function generatePageButtons(currentPage, totalPages) {
  const paginationContainer = document.querySelector(
    '.catalog-pagination-pages'
  );
  paginationContainer.innerHTML = '';

  // Generowanie przycisków dla bieżącej strony i maksymalnie 3 stron
  const endPage = Math.min(currentPage + 2, totalPages - 1);
  for (let page = currentPage; page <= endPage; page++) {
    createPageButton(page, currentPage, paginationContainer);
  }

  // Dodanie "..." i przycisku ostatniej strony, jeśli różnica jest większa niż 3 strony
  if (endPage < totalPages - 1) {
    addDots(paginationContainer);
    createPageButton(totalPages, currentPage, paginationContainer); // Ostatnia strona
  } else if (endPage === totalPages - 1) {
    createPageButton(totalPages, currentPage, paginationContainer); // Jeśli jesteśmy na przedostatniej stronie, dodaj tylko ostatnią stronę
  }
}

function initializePagination() {
  const pageButtons = document.querySelectorAll('.catalog-number-btn');
  pageButtons.forEach(button => {
    button.addEventListener('click', handlePageButtonClick);
  });

  generatePageButtons(currentPage, totalPages);

  document
    .querySelector('.catalog-icon-arrow-left')
    .addEventListener('click', handleArrowLeftClick);
  document
    .querySelector('.catalog-icon-arrow-right')
    .addEventListener('click', handleArrowRightClick);

  updatePaginationDisplay();
}

async function handleSearch() {
  const query = document.querySelector('.catalog-search-input').value.trim();

  if (!query) return;

  const { results } = await searchMovies(query, 1);

  if (results.length > 0) {
    createMoviesCatalog(results);
  } else {
    document.querySelector(
      '.catalog-gallery'
    ).innerHTML = `<p class='catalog-no-movies-found'>
        <span>OOPS...</span>
        <span>We are very sorry!</span>
        <span>We don't have any results matching your search.</span>
      </p>`;
  }
}

function initializeSearchForm() {
  const searchForm = document.querySelector('.catalog-search-form');

  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    handleSearch();
  });
}

function clearSearchButton() {
  const clearButton = document.querySelector('.catalog-icon-x');
  const searchInput = document.querySelector('.catalog-search-input');

  if (clearButton && searchInput) {
    clearButton.addEventListener('click', () => {
      searchInput.value = '';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializeCatalog();
  initializePagination();
  initializeSearchForm();
  clearSearchButton();
});
