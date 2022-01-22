import type { NextPage } from 'next';

import NowPlayingComp from '../components/home/NowPlayingComp';
import { nowPlaying } from '../apis';

const Home: NextPage = (props: any) => {
  return <NowPlayingComp shows={props.nowPlaying.results} />;
};

export default Home;

export async function getServerSideProps() {
  const nowPlayingMovies: any = await nowPlaying();

  return {
    props: {
      nowPlaying: nowPlayingMovies.data
    }
  };
}
