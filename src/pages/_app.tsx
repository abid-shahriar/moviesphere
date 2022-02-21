import type { AppProps } from 'next/app';

import '../styles/main.scss';
import '../styles/slick.scss';
import '../styles/slick_theme.scss';

import Navbar from '../components/Nav';
import styled from 'styled-components';
import FooterComp from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Main>
        <Component {...pageProps} />
      </Main>
      <FooterComp />
    </>
  );
}

export default MyApp;

const Main = styled.main`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2.5%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  margin-top: var(--nav-height);
`;
