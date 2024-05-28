import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api/';

export default {
  episode: {
    getPage: async (page?: number) =>
      await axios
        .get(`${BASE_URL}episode${page === 0 ? '' : `?page=${page}`}`)
        .then(r => r.data)
        .catch(e => e),
    get: async (id: number) =>
      await axios
        .get(`${BASE_URL}episode/${id}`)
        .then(r => r.data)
        .catch(e => e),
  },
  character: {
    get: async (id: any) =>
      await axios
        .get(`${BASE_URL}character/${id}`)
        .then(r => r.data)
        .catch(e => e),
  },
};

// https://rickandmortyapi.com/api/character/
