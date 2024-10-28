import { getPopularMoviesWeek } from './api';
import { getGenreNames } from './weekly_trends';
import { getGenres } from './api';
import { searchMovies } from './api';

let genres = [];

let currentPage = 1;
const TOTAL_PAGES = 24;

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
    <div class="CatalogMovieCard">
        <img class="CatalogMovieImg" src="https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }" alt="${movie.title}" />
            <div class="CatalogImgOverlay"></div>
      <div class="CatalogMovieInfo">
        <div>
          <span class="CatalogMovieTitle">${movie.title}</span>
        </div>
        <div>
          <span class="CatalogMovieValue">${genreNames}</span>
          <span class="CatalogSeparator">|</span>
          <span class="CatalogMovieValue">${releaseYear}</span>
        </div>
      </div>
                    <span class="CatalogStars">${getMovieStars(
                      movie.vote_average
                    )}</span>
    </div>
  `;
}

function createMoviesCatalog(movies) {
  const gallery = document.querySelector('.CatalogGallery');
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
  const pageButtons = document.querySelectorAll('.CatalogNumberBtn');
  pageButtons.forEach(button => {
    const pageNumber = parseInt(button.innerText);

    if (pageNumber === currentPage) {
      button.classList.add('ActivePaginationButton');
    } else {
      button.classList.remove('ActivePaginationButton');
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
  if (currentPage < TOTAL_PAGES) {
    currentPage++;
    initializeCatalog(currentPage);
  }
}

const createPageButton = (page, currentPage, paginationContainer) => {
  const button = document.createElement('button');
  button.classList.add('CatalogNumberBtn');
  button.innerText = String(page).padStart(2, '0');
  if (page === currentPage) button.classList.add('ActivePaginationButton');
  button.addEventListener('click', () => initializeCatalog(page));
  paginationContainer.appendChild(button);
};

const addDots = paginationContainer => {
  const dots = document.createElement('span');
  dots.classList.add('CatalogPaginationDots');
  dots.innerText = '...';
  paginationContainer.appendChild(dots);
};

function generatePageButtons(currentPage, TOTAL_PAGES) {
  const paginationContainer = document.querySelector('.CatalogPaginationPages');
  paginationContainer.innerHTML = '';

  // Generowanie przycisków dla bieżącej strony i maksymalnie 3 stron
  const endPage = Math.min(currentPage + 2, TOTAL_PAGES - 1);
  for (let page = currentPage; page <= endPage; page++) {
    createPageButton(page, currentPage, paginationContainer);
  }

  // Dodanie "..." i przycisku ostatniej strony, jeśli różnica jest większa niż 3 strony
  if (endPage < TOTAL_PAGES - 1) {
    addDots(paginationContainer);
    createPageButton(TOTAL_PAGES, currentPage, paginationContainer); // Ostatnia strona
  } else if (endPage === TOTAL_PAGES - 1) {
    createPageButton(TOTAL_PAGES, currentPage, paginationContainer); // Jeśli jesteśmy na przedostatniej stronie, dodaj tylko ostatnią stronę
  }
}

function initializePagination() {
  const pageButtons = document.querySelectorAll('.CatalogNumberBtn');
  pageButtons.forEach(button => {
    button.addEventListener('click', handlePageButtonClick);
  });

  generatePageButtons(currentPage, TOTAL_PAGES);

  document
    .querySelector('.CatalogIconArrowLeft')
    .addEventListener('click', handleArrowLeftClick);
  document
    .querySelector('.CatalogIconArrowRight')
    .addEventListener('click', handleArrowRightClick);

  updatePaginationDisplay();
}

async function handleSearch() {
  const query = document.querySelector('.CatalogSearchInput').value.trim();
  const selectedYear = document.querySelector('.CatalogYearSelect').value;
  const paginationContainer = document.querySelector(
    '.CatalogPaginationContainer'
  );

  const { results } = await searchMovies(query, selectedYear, '', 1);

  if (results.length > 0) {
    createMoviesCatalog(results);
    paginationContainer.style.display = 'none';
  } else {
    document.querySelector(
      '.CatalogGallery'
    ).innerHTML = `<p class='CatalogNoMoviesFound'>
        <span>OOPS...</span>
        <span>We are very sorry!</span>
        <span>We don't have any results matching your search.</span>
      </p>`;
    paginationContainer.style.display = 'none';
  }
}

function initializeSearchForm() {
  const searchForm = document.querySelector('.CatalogSearchForm');

  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    handleSearch();
  });
}

function clearSearchButton() {
  const clearButton = document.querySelector('.CatalogIconX');
  const searchInput = document.querySelector('.CatalogSearchInput');

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
