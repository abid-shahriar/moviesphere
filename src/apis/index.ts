import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.MDBBaseUrl;

export const latestMoviesApi = () => axios.get(`/movie/latest?api_key=${config.MDBApiKey}`);
export const popularMoviesApi = () => axios.get(`trending/all/day?api_key=${config.MDBApiKey}`);
export const nowPlayingApi = (page?: number) => axios.get(`/movie/now_playing?api_key=${config.MDBApiKey}&page=${page || 1}`);
export const topRatedApi = (page?: number) => axios.get(`/movie/top_rated?api_key=${config.MDBApiKey}&page=${page || 1}`);
export const upcomingApi = (page?: number) => axios.get(`/movie/upcoming?api_key=${config.MDBApiKey}&page=${page || 1}`);
export const showDetailsApi = (id: number) => axios.get(`/movie/${id}?api_key=${config.MDBApiKey}`);
export const movieVideosApi = (id: number) => axios.get(`/movie/${id}/videos?api_key=${config.MDBApiKey}`);

export const tvShowDetailsApi = (id: number) => axios.get(`/tv/${id}?api_key=${config.MDBApiKey}`);
export const popularTvShowsApi = () => axios.get(`tv/popular?api_key=${config.MDBApiKey}`);
export const tvVideosApi = (id: number) => axios.get(`/tv/${id}/videos?api_key=${config.MDBApiKey}`);
