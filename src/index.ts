import { Genre, Movie } from "./index.types"
import db from './db.json';

const arrayEquals = (a: Genre[], b: Genre[] ) => {
  return a.length === b.length && a.every((x, index) => x === b[index]);
}

const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
}

const movies = db.movies as Movie[];

export const getFilteredMovies = ({ genres }: { genres: Genre[] }): Movie[] => {
  if(genres.length === 0) return [movies[getRandomNumber(0, movies.length - 1)]];

  // Create an empty map object, every key is an empty arrays
  const moviesLengthMap: Record<string, Movie[]> = genres.reduce((acc, _, index) => ({ ...acc, [index + 1]: []}), {});

  movies.forEach(movie => {
     const intersection = movie.genres.filter(x => genres.includes(x));

     if(arrayEquals(intersection, movie.genres)) {
      moviesLengthMap[intersection.length].push(movie);
     }
  });
  
  const filteredMovies: Movie[] = [];
  const filterMapArray = Object.keys(moviesLengthMap).sort((a, b) => Number(b) - Number(a));
  filterMapArray.forEach(item => filteredMovies.push(...moviesLengthMap[item]))
  
  return filteredMovies;
}
