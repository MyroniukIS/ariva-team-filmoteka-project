import genres from './genre-array';
import galleryTmpl from '../../templates/oneMovieCard.hbs';

import refs from '../refs';
const { list: gallery } = refs;

const mapGenre = genreId => {
  const foundGenre = genres.find(genre => genre.id === genreId);
  if (foundGenre) {
    return foundGenre.name;
  }
  return '';
};

const addMappedGenres = movie => {
  if (!movie.genre_ids.length) {
    return { ...movie, mappedGenres: 'Other' };
  }

  if (movie.genre_ids.length <= 3) {
    return {
      ...movie,
      mappedGenres: movie.genre_ids
        .map(mapGenre)
        .filter(genre => genre !== '')
        .join(', '),
    };
  }

  return {
    ...movie,
    mappedGenres: movie.genre_ids
      .map(mapGenre)
      .filter(genre => genre !== '')
      .slice(0, 2)
      .concat('Other')
      .join(', '),
  };
};

const addYear = movie => {
  return movie.release_date ? { ...movie, year: movie.release_date.slice(0, 4) } : movie;
};

export const drawCards = movies => {
  const enrichedMovies = movies.map(addMappedGenres).map(addYear);

  const cards = galleryTmpl(enrichedMovies);
  gallery.innerHTML = cards;
};