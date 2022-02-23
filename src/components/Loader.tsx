import styled from 'styled-components';

const Loader = () => {
  return (
    <Container>
      <LoaderContainer>
        <div></div>
        <div></div>
      </LoaderContainer>
    </Container>
  );
};

export default Loader;

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
`;

const LoaderContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 160px;
  height: 160px;

  & div {
    position: absolute;
    border: 4px solid var(--clr-primary);
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  & div:nth-child(2) {
    animation-delay: -0.75s;
  }

  @keyframes lds-ripple {
    0% {
      top: 72px;
      left: 72px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 144px;
      height: 144px;
      opacity: 0;
    }
  }
`;
