import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';

import { nowPlayingApi, popularMoviesApi, popularTvShowsApi, topRatedApi, upcomingApi } from '../apis';

import Loader from '../components/Loader';
import ModalComp from '../components/ModalComp';
import ShowDetailsComp from '../components/ShowDetailsComp';
import MoviesSliderComp from '../components/home/MoviesSliderComp';

import { LoaderContainer, MainContainer, MoviesSliderContainer } from '../styles/home.styles';

const Home: NextPage = (props: any) => {
  const { popularMovies, nowPlaying, topRatedMovies, upcomingMovies, popularTvShows } = props;

  const [loading, setLoading] = useState(true);
  const loaderContainerRef = useRef<HTMLDivElement>(null);
  const [modalState, setModalState] = useState(false);
  const [showId, setShowId] = useState(1);
  const [isTv, setIsTv] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      loaderContainerRef?.current?.classList.add('fade-out');
    }, 1500);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <MainContainer>
      {loading && (
        <LoaderContainer ref={loaderContainerRef}>
          <Loader />
        </LoaderContainer>
      )}

      <MoviesSliderContainer>
        <MoviesSliderComp
          shows={nowPlaying.results}
          setModalState={setModalState}
          setShowId={setShowId}
          title='now plying in theaters'
          delay={0}
          setIsTv={setIsTv}
        />

        <MoviesSliderComp
          shows={popularMovies.results}
          setModalState={setModalState}
          setShowId={setShowId}
          title='popular movies'
          delay={1000}
          setIsTv={setIsTv}
        />

        <MoviesSliderComp
          shows={topRatedMovies.results}
          setModalState={setModalState}
          setShowId={setShowId}
          title='top rated moves'
          delay={2000}
          setIsTv={setIsTv}
        />

        <MoviesSliderComp
          shows={upcomingMovies.results}
          setModalState={setModalState}
          setShowId={setShowId}
          title='upcoming movies'
          delay={3000}
          setIsTv={setIsTv}
        />

        <MoviesSliderComp
          shows={popularTvShows.results}
          setModalState={setModalState}
          setShowId={setShowId}
          title='popular TV shows'
          delay={1000}
          tv={true}
          setIsTv={setIsTv}
        />
      </MoviesSliderContainer>

      {modalState && (
        <ModalComp setModalState={setModalState}>
          <ShowDetailsComp id={showId} setModalState={setModalState} isTv={isTv} />
        </ModalComp>
      )}
    </MainContainer>
  );
};

export default Home;

export async function getStaticProps() {
  const nowPlayingMovies: any = await nowPlayingApi();
  const popularMovies: any = await popularMoviesApi();
  const topRatedMovies: any = await topRatedApi();
  const upcomingMovies: any = await upcomingApi();
  const popularTvShows: any = await popularTvShowsApi();

  return {
    props: {
      fallback: 'blocking', // 'blocking' | 'initial' | 'ready' | 'suspense'
      nowPlaying: nowPlayingMovies.data,
      popularMovies: popularMovies.data,
      topRatedMovies: topRatedMovies.data,
      upcomingMovies: upcomingMovies.data,
      popularTvShows: popularTvShows.data
    },
    revalidate: 60
  };
}
