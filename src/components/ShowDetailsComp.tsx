import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { movieVideosApi, showDetailsApi, tvShowDetailsApi, tvVideosApi } from '../apis';
import Loader from './Loader';
import Typography from './Typography';

interface Props {
  id: number;
  setModalState: (state: boolean) => void;
  isTv?: boolean;
}

const ShowDetailsComp = ({ id, setModalState, isTv }: Props) => {
  const [showData, setShowData] = useState<any>({});
  const [videoData, setVideoData] = useState<any>({});

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchShowDetailsApi = isTv ? tvShowDetailsApi : showDetailsApi;
    const fetchShowVideosApi = isTv ? tvVideosApi : movieVideosApi;

    fetchShowDetailsApi(id).then((res: any) => {
      setShowData(res.data);

      fetchShowVideosApi(id).then((res: any) => {
        const youtubeVideos = res.data.results.filter((video: any) => video.site === 'YouTube');
        setVideoData(youtubeVideos[youtubeVideos.length - 1]);

        setTimeout(() => {
          overlayRef.current?.classList.add('hide');
        }, 1500);
      });
    });
  }, [id, isTv]);

  console.log(videoData);

  return (
    <Wrapper>
      <Container>
        <InnerContainer>
          {showData?.backdrop_path && !videoData && (
            <Image src={`https://image.tmdb.org/t/p/original/${showData?.backdrop_path}`} alt={showData.title} />
          )}

          {videoData && (
            <VideoContainer>
              <iframe
                src={`https://www.youtube.com/embed/${videoData.key}`}
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </VideoContainer>
          )}

          <Typography fontSize='2.4rem' fontWeight='500' margin='2rem 0 0 0'>
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

const VideoContainer = styled.div`
  width: 100%;
  max-width: 100%;

  & > * {
    width: 100%;
    max-width: 100%;
    min-height: 400px;
    border-radius: 10px;

    & > * {
      width: 100%;
      max-width: 100%;
    }
  }
`;
