import refs from '../js/refs.js';
import { spiner } from './utils/rainbow-spiner.js';

import apiService from './utils/api-service.js';

import galleryLib from '..//templates/one-movie-card-lib.hbs';

const { queueButton, watchedButton, dinamicButtons, list: library, libraryLink, homeLink } = refs;

const arrayLsWatched = 'watched';
const arrayLsQueue = 'queue';

const getTotalByType = typeFilms => {
  return JSON.parse(localStorage.getItem(typeFilms))?.length ?? 0;
};

const getCurrentTab = () => {
  return dinamicButtons.querySelector('.btn-active').textContent.toLowerCase();
};

const onButtonClick = event => {
  {
    if (event.target.classList.contains('btn-active')) {
      return;
    }

    if (event.target.textContent.toLowerCase() === arrayLsWatched) {
      queueButton.classList.replace('btn-active', 'btn-disable');
      watchedButton.classList.replace('btn-disable', 'btn-active');

      window.paginator.totalResults = getTotalByType(arrayLsWatched);
      renderList(arrayLsWatched, 1);
    } else if (event.target.textContent.toLowerCase() === arrayLsQueue) {
      watchedButton.classList.replace('btn-active', 'btn-disable');
      queueButton.classList.replace('btn-disable', 'btn-active');

      window.paginator.totalResults = getTotalByType(arrayLsQueue);
      renderList(arrayLsQueue, 1);
    }
  }
};

const onLibraryPageClick = event => {
  const { page = 1 } = event;
  const currentType = getCurrentTab();

  renderList(currentType, page);
};

function getFilmsFromLocalStorage(typeFilms, pageNumber) {
  const page = pageNumber ?? 1;
  const pageSize = 20;

  let movies = JSON.parse(localStorage.getItem(typeFilms));

  if (!movies) {
    return [];
  }

  return movies.slice((page - 1) * pageSize, page * pageSize);
}

function onLibraryLinkClick(event) {
  if (event.target.classList.contains('link__current')) {
    return;
  }

  const currentType = getCurrentTab();
  window.paginator.onPageClick = onLibraryPageClick;
  window.paginator.totalResults = getTotalByType(currentType);

  if (!window.paginator.isShown) {
    window.paginator.show();
  }

  renderList(currentType);
}

function renderList(typeFilms, pageNumber) {
  const array = getFilmsFromLocalStorage(typeFilms, pageNumber);
  if (array?.length === 0) {
    library.innerHTML = '';
    return;
  }

  if (spiner.isHidden) {
    spiner.show();
  }
  apiService.fetchMoviesByIds(array).then(data => {
    const card = galleryLib(data);
    library.innerHTML = card;
  });
  setInterval(spiner.hide, 1000);
}

const initializeUserLibrary = function () {
  dinamicButtons.addEventListener('click', onButtonClick);
  libraryLink.addEventListener('click', onLibraryLinkClick);
};

initializeUserLibrary();
