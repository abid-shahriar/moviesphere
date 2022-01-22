import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.MDBBaseUrl;

export const latestMovies = () => axios.get(`/latest?api_key=${config.MDBApiKey}&language=en-US`);
export const popularMovies = (page?: number) => axios.get(`/popular?api_key=${config.MDBApiKey}&language=en-US&page=${page || 1}`);
export const nowPlaying = (page?: number) => axios.get(`/now_playing?api_key=${config.MDBApiKey}&language=en-US&page=${page || 1}`);
export const topRated = (page?: number) => axios.get(`/top_rated?api_key=${config.MDBApiKey}&language=en-US&page=${page || 1}`);
export const upcoming = (page?: number) => axios.get(`/upcoming?api_key=${config.MDBApiKey}&language=en-US&page=${page || 1}`);
export const showDetails = (id: number) => axios.get(`/${id}?api_key=${config.MDBApiKey}&language=en-US`);
