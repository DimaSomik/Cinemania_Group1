const headerMenuBtn = document.querySelector('.header-menu-btn');
const headerMenu = document.querySelector('.header-menu');

function toggleMenu(event) {
  headerMenu.classList.toggle('active');
  document.body.classList.toggle('lock');

  if (headerMenu.classList.contains('active')) {
    document.addEventListener('click', closeMenuOnClickOutside);
  } else {
    document.removeEventListener('click', closeMenuOnClickOutside);
  }
}

function closeMenuOnClickOutside(event) {
  if (!headerMenu.contains(event.target) && event.target !== headerMenuBtn) {
    headerMenu.classList.remove('active');
    document.body.classList.remove('lock');
    document.removeEventListener('click', closeMenuOnClickOutside);
  }
}


// auxiliary functions
const displayNone = elem => {
  document.querySelector(`${elem}`).style.display = 'none';
};
const displayFlex = elem => {
  document.querySelector(`${elem}`).style.display = 'flex';
};
const displayUnset = elem => {
  document.querySelector(`${elem}`).style.display = 'unset';
};

function openHomePage () {
  homePage.style.color = '#f87719';
  catalogPage.style.color = '#595959';
  libraryPage.style.color = '#595959';

  displayNone('.HeroBox');
  displayFlex('.StartedHeroBox');
  displayNone('.LibraryHeroBox');
  displayNone('.Library-General-Container');
  displayNone('.catalog-container');
  displayFlex('#movies-list');
  document.querySelector('.movie-container').style.display = 'grid';
  displayUnset('.upcoming');
  // displayNone('#user-library');
  displayNone('.my-movie-container');
  displayNone('.library-container');
  displayNone('.library-load-more-btn-container');
};

export function openCatalogPage () {
  homePage.style.color = '#595959';
  catalogPage.style.color = '#f87719';
  libraryPage.style.color = '#595959';
  
  displayFlex('.HeroBox');
  displayUnset('.catalog-container');
  displayNone('.StartedHeroBox');
  displayNone('.LibraryHeroBox');
  displayNone('.Library-General-Container');
  displayNone('#movies-list');
  displayNone('.movie-container');
  displayNone('.upcoming');
  // displayNone('#user-library');
  displayNone('.my-movie-container');
  displayNone('.library-container');
  displayNone('.library-load-more-btn-container');
};

function openLibraryPage () {
  homePage.style.color = '#595959';
  catalogPage.style.color = '#595959';
  libraryPage.style.color = '#f87719';
  
  displayFlex('.LibraryHeroBox');
  displayFlex('.my-movie-container');
  displayFlex('.library-container');
  displayFlex('.library-load-more-btn-container');
  displayNone('.HeroBox');
  displayNone('.StartedHeroBox');
  displayNone('.catalog-container');
  displayNone('#movies-list');
  displayNone('.movie-container');
  displayNone('.upcoming');
  displayUnset('.Library-General-Container');
};

const homePage = document.querySelector('.header-link-index');
homePage.addEventListener('click', event => {
  event.preventDefault();
  openHomePage();
});

const catalogPage = document.querySelector('.header-link-catalog');
catalogPage.addEventListener('click', event => {
  event.preventDefault();
  openCatalogPage();
});

const libraryPage = document.querySelector('.header-link-library');
libraryPage.addEventListener('click', event => {
  event.preventDefault();
  openLibraryPage();
});

headerMenuBtn.addEventListener('click', toggleMenu);
const menuLinks = document.querySelectorAll('.header-list a');

menuLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
