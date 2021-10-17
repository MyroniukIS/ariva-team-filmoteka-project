import genres from './genre-array';
import libraryTmpl from '../../templates/one-movie-card-lib.hbs';

import refs from '../refs';
const { list: library } = refs;

const addMappedGenres = movie => {
  if (movie.genres?.length === 0) {
    return { ...movie, mappedGenres: 'Other' };
  }

  if (movie.genres.length <= 3) {
    return {
      ...movie,
      mappedGenres: movie.genres.map(genre => genre.name).join(', '),
    };
  }

  return {
    ...movie,
    mappedGenres: movie.genres
      .map(genre => genre.name)
      .slice(0, 2)
      .concat('Other')
      .join(', '),
  };
};

const addYear = movie => {
  return movie.release_date ? { ...movie, year: movie.release_date.slice(0, 4) } : movie;
};

export const enrichMovies = movies => {
  return movies.map(addMappedGenres).map(addYear);
};

export const scrollToTop = () => {
  const firstItemIndex = 0;
  const firstLibraryCard = library.children.item(firstItemIndex);
  firstLibraryCard.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};
