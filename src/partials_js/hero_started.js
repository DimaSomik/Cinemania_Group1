const startedButton = document.querySelector(".StartedHeroWatchTrailer");
const homePage = document.querySelector('.header-link-index');
const catalogPage = document.querySelector('.header-link-catalog');
const libraryPage = document.querySelector('.header-link-library');

const displayNone = (elem) => {document.querySelector(`${elem}`).style.display = "none"};
const displayFlex = (elem) => {document.querySelector(`${elem}`).style.display = "flex"};
const displayUnset = (elem) => {document.querySelector(`${elem}`).style.display = "unset"};

startedButton.addEventListener("click", () => {
    homePage.style.color = "#595959";
    catalogPage.style.color = "#f87719";
    libraryPage.style.color = "#595959";

    displayFlex(".HeroBox");
    displayUnset(".catalog-container");
    displayNone(".StartedHeroBox");
    displayNone(".LibraryHeroBox");
    displayNone("#movies-list");
    displayNone(".movie-container");
    displayNone(".upcoming");
});