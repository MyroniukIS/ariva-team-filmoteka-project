import _debounce from 'debounce';
import validator from 'validator';
import refs from './refs.js';
import serviceApi from './api-service.js';
import { drawCards } from './components/gallery-adapter';

const { list, input, notifyEr } = refs;

let searchQuery = '';

input.addEventListener(
  'input',
  _debounce(e => {
    const queryValue = e.target.value.trim(' ');
    const validateQueryValue = validator.isEmpty(queryValue);
    notifyEr.classList.add('hide');
    list.innerHTML = ' ';
    if (!validateQueryValue) {
      searchQuery = queryValue;
      render(queryValue);
    }
  }, 300),
);

const fetchNewPagefromSearch = event => {
  serviceApi.changePage(event.page);
  serviceApi
    .fetchDataDb(searchQuery)
    .then(param => {
      const totalResults = param.total_results;
      const showArrayElement = param.results;
      if (showArrayElement.length == 0) {
        notifyEr.classList.remove('hide');
        list.innerHTML = '';
      }
      return { showArrayElement, totalResults };
    })
    .then(elem => {
      const { showArrayElement, totalResults } = elem;
      drawCards(showArrayElement);

      console.log('New elements fetched', showArrayElement);

      if (!window.paginator.isShown) {
        window.paginator.show();
      }
    });

  console.log('Search result triggered', event);
};

function render(query) {
  serviceApi
    .fetchDataDb(query)
    .then(param => {
      const totalResults = param.total_results;
      const showArrayElement = param.results;
      if (showArrayElement.length == 0) {
        notifyEr.classList.remove('hide');
        list.innerHTML = '';
      }
      return { showArrayElement, totalResults };
    })
    .then(elem => {
      const { showArrayElement, totalResults } = elem;

      drawCards(showArrayElement);

      window.paginator.onPageClick = fetchNewPagefromSearch;
      window.paginator.totalResults = totalResults;

      if (!window.paginator.isShown) {
        window.paginator.show();
      }
    });
}