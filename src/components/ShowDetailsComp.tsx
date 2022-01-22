import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { showDetails } from '../apis';
import Loader from './Loader';
import Typography from './Typography';

interface Props {
  id: number;
}

const ShowDetailsComp = ({ id }: Props) => {
  const [showData, setShowData] = useState<any>({});

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    showDetails(id).then((res: any) => {
      setShowData(res.data);
    });

    setTimeout(() => {
      overlayRef.current?.classList.add('hide');
    }, 1500);
  }, [id]);

  console.log(showData);

  return (
    <Container>
      <InnerContainer>
        {showData?.backdrop_path && <Image src={`https://image.tmdb.org/t/p/original/${showData?.backdrop_path}`} alt={showData.title} />}

        <Typography fontSize='2.4rem' fontWeight='500'>
          {showData?.title}
        </Typography>

        <Typography>-{showData?.tagline}</Typography>

        <Typography margin='2rem 0'>{showData?.overview}</Typography>

        <Typography>Release Date: {dayjs(showData?.release_date).format('DD MMM YYYY')}</Typography>
        <Typography>
          genres:{' '}
          {showData?.genres?.map((genre: any, idx: number) => (
            <span key={genre.id}>{showData?.genres?.length - 1 === idx ? `${genre?.name}` : `${genre?.name}, `}</span>
          ))}
        </Typography>

        <Typography>
          Avg Rating: {showData?.vote_average} ({showData?.vote_count} votes)
        </Typography>
      </InnerContainer>
      <Overlay ref={overlayRef}>
        <Loader />
      </Overlay>
    </Container>
  );
};

export default ShowDetailsComp;

const Container = styled.div`
  background-color: whitesmoke;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  max-height: 700px;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const InnerContainer = styled.div`
  padding: 2rem;
  text-align: center;

  & > * {
    max-width: 700px;
  }
`;

const Image = styled.img`
  max-width: 700px;
  border-radius: 5px;
`;

const Overlay = styled.div`
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
  }
`;
