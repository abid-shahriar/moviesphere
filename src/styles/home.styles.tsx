import styled from 'styled-components';

export const MainContainer = styled.main`
  position: relative;
  padding: 4rem 0;
`;

export const MoviesSliderContainer = styled.div`
  & > *:not(:first-child) {
    margin-top: 8rem;
  }
`;

export const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;

  &.fade-out {
    animation: fadeOut 500ms ease-in-out;
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }

    70% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;
