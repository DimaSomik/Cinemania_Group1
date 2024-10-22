import { getPopularMoviesToday } from './api';
import { getRandomMovie } from './upcoming';

const BACKGROUND_URL = "https://image.tmdb.org/t/p/original";

function truncate(str, no_words) {
    return str.split(" ").splice(0,no_words).join(" ");
};

function setNumberOfStarts(vote) {
    const numOfStars = Math.round(vote/2);
    return numOfStars;
};

function createStars(num, list) {
    for (let i = 0; i < num; i++) {
        list.insertAdjacentHTML("afterbegin", `<li class="HeroStarListItem">
                                                <svg width="16" height="16" class="HeroStarSVG">
                                                    <defs>
                                                        <linearGradient id="Gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                                            <stop class="Stop1" offset="0%" />
                                                            <stop class="Stop2" offset="100%" />
                                                        </linearGradient>
                                                    </defs>
                                                    <use href="./images/icons.svg#icon-star" fill="url(#Gradient1)"></use>
                                                </svg>
                                              </li>`);
    }
}

function loadHeroContent(movie) {
    document.querySelector('.HeroMainHeading').textContent = movie.title;
    const trimmedOverview = truncate(movie.overview, 20);
    document.querySelector('.HeroMovieDescription').textContent = trimmedOverview + "...";
    const stars = setNumberOfStarts(movie.vote_average);
    createStars(stars, document.querySelector('.HeroStarsList'));
    document.querySelector('.HeroBox').style.backgroundImage = `linear-gradient(86.47deg, #111111 33.63%, rgba(0, 0, 0, 0) 76.86%),
                                                                url(${BACKGROUND_URL}${movie.backdrop_path})`;
};

(async () => {
    const fetchPopularMovie = await getPopularMoviesToday(1);
    const randomMovie = getRandomMovie(fetchPopularMovie.results);
    // document.querySelector('.HeroWatchTrailer').addEventListener('click', openDetailsModal(randomMovie.id));
    loadHeroContent(randomMovie);
})();
