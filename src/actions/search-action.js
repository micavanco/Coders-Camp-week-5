import axios from 'axios';

export const FETCH_SEARCH = 'FETCH_SEARCH';
const API_KEY = "fd067333da9722a67e0a78739ccecbf1";

export function fetchSearch(search) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}`;
  const request = axios.get(url);

  return {
    type: FETCH_SEARCH,
    payload: request
  }
}
