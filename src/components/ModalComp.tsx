import { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  setModalState: (state: boolean) => void;
}

const ModalComp = ({ children, setModalState }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.addEventListener('click', (e: any) => {
      if (e.target === modalRef.current) {
        setModalState(false);
      }
    });
  }, [setModalState]);

  return (
    <Container className='modal' ref={modalRef}>
      {children}
    </Container>
  );
};

export default ModalComp;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 100vw;
  min-height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: modalAnimation 150ms linear;

  @keyframes modalAnimation {
    0% {
      opacity: 0;
      transform: scale(0);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
