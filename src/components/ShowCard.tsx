import dayjs from 'dayjs';
import styled from 'styled-components';
import Link from 'next/link';

import Typography from './Typography';
import { useState } from 'react';
import ModalComp from './ModalComp';
import ShowDetailsComp from './ShowDetailsComp';

const ShowCardComp = ({ show }: any) => {
  const [modalState, setModalState] = useState(false);

  return (
    <>
      <ShowCard onClick={() => setModalState(true)}>
        <Image src={`https://image.tmdb.org/t/p/original/${show.poster_path}`} alt={show.title} />
        <StyledTypo title={show.original_title} padding='1rem 0 0 0' fontSize='2rem' fontWeight='500'>
          {show.title}
        </StyledTypo>

        <Typography>{dayjs(show.release_date).format('MMM YYYY')}</Typography>
      </ShowCard>

      {modalState && (
        <ModalComp setModalState={setModalState}>
          <ShowDetailsComp id={show.id} />
        </ModalComp>
      )}
    </>
  );
};

export default ShowCardComp;

const ShowCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: pointer;

  @media (max-width: 768px) {
    max-width: 200px;
  }
  @media (max-width: 500px) {
    max-width: 170px;
  }
`;

const Image = styled.img`
  max-width: 200px;
  border-radius: 5px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const StyledTypo = styled(Typography)`
  max-width: 200px;
  text-align: center;

  @media (max-width: 768px) {
    max-width: 200px;
  }
  @media (max-width: 500px) {
    max-width: 170px;
  }
`;
