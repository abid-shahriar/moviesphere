import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { showDetailsApi, tvShowDetailsApi } from '../apis';
import Loader from './Loader';
import Typography from './Typography';

interface Props {
  id: number;
  setModalState: (state: boolean) => void;
  isTv?: boolean;
}

const ShowDetailsComp = ({ id, setModalState, isTv }: Props) => {
  const [showData, setShowData] = useState<any>({});

  const overlayRef = useRef<HTMLDivElement>(null);

  console.log(showData);

  useEffect(() => {
    const fetchApi = isTv ? tvShowDetailsApi : showDetailsApi;

    fetchApi(id).then((res: any) => {
      setShowData(res.data);

      setTimeout(() => {
        overlayRef.current?.classList.add('hide');
      }, 1500);
    });
  }, [id, isTv]);

  return (
    <Wrapper>
      <Container>
        <InnerContainer>
          {showData?.backdrop_path && <Image src={`https://image.tmdb.org/t/p/original/${showData?.backdrop_path}`} alt={showData.title} />}

          <Typography fontSize='2.4rem' fontWeight='500'>
            {showData?.title || showData?.name}
          </Typography>

          {showData?.tagline && <Typography>-{showData.tagline}</Typography>}

          <Typography margin='2rem 0'>{showData?.overview}</Typography>

          {showData?.release_date && <Typography>Release Date: {dayjs(showData?.release_date).format('DD MMM YYYY')}</Typography>}

          {showData?.first_air_date && <Typography>First Air Date: {dayjs(showData.first_air_date).format('DD MMM YYYY')}</Typography>}
          {showData?.last_air_date && <Typography>Last Air Date: {dayjs(showData.last_air_date).format('DD MMM YYYY')}</Typography>}
          {showData?.seasons && showData?.seasons.length && <Typography>Seasons: {showData?.seasons.length}</Typography>}

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

      <CloseModalBtn onClick={() => setModalState(false)}>
        <span>+</span>
      </CloseModalBtn>
    </Wrapper>
  );
};

export default ShowDetailsComp;

const CloseModalBtn = styled.span`
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

const Container = styled.div`
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

const InnerContainer = styled.div`
  padding: 2rem;
  text-align: center;

  & > * {
    max-width: 700px;
  }
`;

const Image = styled.img`
  max-width: 100%;
  min-width: 320px;
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
    pointer-events: none;
  }
`;

const Wrapper = styled.div`
  position: relative;
`;
