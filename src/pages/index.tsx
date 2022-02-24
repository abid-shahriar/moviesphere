import Head from 'next/head';
import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';

import { nowPlayingApi, popularMoviesApi, popularTvShowsApi, topRatedApi, topRatedTvShowsApi, upcomingApi } from '../apis';

import Loader from '../components/Loader';
import ModalComp from '../components/ModalComp';
import ShowDetailsComp from '../components/ShowDetailsComp';
import MoviesSliderContainerComp from '../components/home/MoviesSliderContainerComp';

import { LoaderContainer, MainContainer } from '../styles/home.styles';

const Home: NextPage = (props: any) => {
  const { popularMovies, nowPlaying, topRatedMovies, upcomingMovies, popularTvShows, topRatedTvShows } = props;

  const loaderContainerRef = useRef<HTMLDivElement>(null);

  const [modalState, setModalState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isTv, setIsTv] = useState(false);
  const [showId, setShowId] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);

    setTimeout(() => {
      loaderContainerRef?.current?.classList.add('fade-out');
    }, 2000);
  }, []);

  return (
    <>
      <MainContainer>
        <LoaderContainer ref={loaderContainerRef}>
          <Loader />
        </LoaderContainer>

        <MoviesSliderContainerComp
          nowPlaying={nowPlaying}
          popularMovies={popularMovies}
          topRatedMovies={topRatedMovies}
          upcomingMovies={upcomingMovies}
          popularTvShows={popularTvShows}
          topRatedTvShows={topRatedTvShows}
          setShowId={setShowId}
          setIsTv={setIsTv}
          setModalState={setModalState}
        />

        {modalState && (
          <ModalComp setModalState={setModalState}>
            <ShowDetailsComp id={showId} setModalState={setModalState} isTv={isTv} />
          </ModalComp>
        )}
      </MainContainer>

      <Head>
        <title>Moviesphere</title>

        <meta name="description" content="Moviesphere is a movie discovery web app that allows you to discover movies and TV shows" />
        <meta name="og:description" content="Moviesphere is a movie discovery web app that allows you to discover movies and TV shows" />
      </Head>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const nowPlayingMovies: any = await nowPlayingApi();
  const popularMovies: any = await popularMoviesApi();
  const topRatedMovies: any = await topRatedApi();
  const upcomingMovies: any = await upcomingApi();
  const popularTvShows: any = await popularTvShowsApi();
  const topRatedTvShows: any = await topRatedTvShowsApi();

  return {
    props: {
      fallback: 'suspense',
      nowPlaying: nowPlayingMovies.data,
      popularMovies: popularMovies.data,
      topRatedMovies: topRatedMovies.data,
      upcomingMovies: upcomingMovies.data,
      popularTvShows: popularTvShows.data,
      topRatedTvShows: topRatedTvShows.data,
    },
    revalidate: 60,
  };
}
