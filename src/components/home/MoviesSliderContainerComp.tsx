import { MoviesSliderContainer } from '../../styles/home.styles';
import MoviesSliderComp from './MoviesSliderComp';

interface Props {
  nowPlaying: any;
  popularMovies: any;
  topRatedMovies: any;
  upcomingMovies: any;
  popularTvShows: any;
  topRatedTvShows: any;
  setShowId: (id: number) => void;
  setIsTv: (isTv: boolean) => void;
  setModalState: (state: boolean) => void;
}

const MoviesSliderContainerComp = (props: Props) => {
  const { nowPlaying, popularMovies, popularTvShows, setIsTv, setModalState, setShowId, topRatedMovies, topRatedTvShows, upcomingMovies } = props;

  return (
    <MoviesSliderContainer>
      <MoviesSliderComp
        shows={nowPlaying.results}
        setModalState={setModalState}
        setShowId={setShowId}
        title="now plying in theaters"
        delay={0}
        setIsTv={setIsTv}
      />

      <MoviesSliderComp
        shows={popularMovies.results}
        setModalState={setModalState}
        setShowId={setShowId}
        title="popular movies"
        delay={1000}
        setIsTv={setIsTv}
      />

      <MoviesSliderComp
        shows={topRatedMovies.results}
        setModalState={setModalState}
        setShowId={setShowId}
        title="top rated moves"
        delay={2000}
        setIsTv={setIsTv}
      />

      <MoviesSliderComp
        shows={upcomingMovies.results}
        setModalState={setModalState}
        setShowId={setShowId}
        title="upcoming movies"
        delay={3000}
        setIsTv={setIsTv}
      />

      <MoviesSliderComp
        shows={popularTvShows.results}
        setModalState={setModalState}
        setShowId={setShowId}
        title="popular TV shows"
        delay={1000}
        tv={true}
        setIsTv={setIsTv}
      />

      <MoviesSliderComp
        shows={topRatedTvShows.results}
        setModalState={setModalState}
        setShowId={setShowId}
        title="top rated TV shows"
        delay={2000}
        tv={true}
        setIsTv={setIsTv}
      />
    </MoviesSliderContainer>
  );
};

export default MoviesSliderContainerComp;
