import styled from 'styled-components';

export const CloseModalBtn = styled.span`
  font-size: 3rem;
  max-height: 30px;
  max-width: 30px;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(45deg) translateX(-50%);
  background-color: var(--clr-primary);
  color: var(--clr-white);
  border-radius: 50%;
  position: absolute;
  z-index: 101;
  top: -5px;
  left: 50%;
  cursor: pointer;

  & > * {
    pointer-events: none;
  }
`;

export const Container = styled.div`
  background-color: whitesmoke;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  max-height: 80vh;
  max-width: 800px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const InnerContainer = styled.div`
  padding: 2rem;
  text-align: center;

  & > * {
    max-width: 700px;
  }
`;

export const Image = styled.img`
  max-width: 100%;
  min-width: 320px;
  border-radius: 5px;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 10;
  transition: all 150ms ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &.hide {
    opacity: 0;
    pointer-events: none;
  }
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const VideoContainer = styled.div`
  width: 100%;
  max-width: 100%;

  & > * {
    width: 100%;
    max-width: 100%;
    min-height: 400px;
    border-radius: 10px;

    @media (max-width: 500px) {
      min-height: 200px;
      max-height: 200px;
    }

    & > * {
      width: 100%;
      max-width: 100%;
    }
  }
`;

export const NoDataFoundMessage = styled.h3`
  padding: 4rem;
  background-color: var(--clr-white);
  min-height: 200px;
  min-width: 320px;
`;

export const VideoButtonsContainer = styled.div`
  display: flex;
  margin-top: 2rem;

  & > * {
    &:not(:first-child) {
      margin-left: 1rem;
    }

    background-color: var(--clr-primary);
    padding: 2px 5px;
    border-radius: 3px;
    color: var(--clr-white);
    font-size: 1.6rem;
    cursor: pointer;
    transition: 300ms;

    &:hover {
      background-color: var(--clr-primary-deep);
    }
  }
`;
