import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

import { movieVideosApi, showDetailsApi, tvShowDetailsApi, tvVideosApi } from '../apis';

import Loader from './Loader';
import Typography from './Typography';
import {
  CloseModalBtn,
  Container,
  Image,
  InnerContainer,
  Overlay,
  VideoContainer,
  Wrapper,
  NoDataFoundMessage,
  VideoButtonsContainer,
} from './styles/showDetailsComp.styles';

interface Props {
  id: number;
  setModalState: (state: boolean) => void;
  isTv?: boolean;
}

const ShowDetailsComp = ({ id, setModalState, isTv }: Props) => {
  const [showData, setShowData] = useState<any>({});
  const [videoData, setVideoData] = useState<any>({});
  const [dataNotFound, setDataNotFound] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<any>();

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchShowDetailsApi = isTv ? tvShowDetailsApi : showDetailsApi;
    const fetchShowVideosApi = isTv ? tvVideosApi : movieVideosApi;

    fetchShowDetailsApi(id)
      .then((res: any) => {
        setShowData(res.data);

        fetchShowVideosApi(id).then((res: any) => {
          const youtubeVideos = res.data.results.filter((video: any) => video.site === 'YouTube');
          setVideoData(youtubeVideos);
          setSelectedVideo(youtubeVideos[0]);

          setDataNotFound(false);

          setTimeout(() => {
            overlayRef.current?.classList.add('hide');
          }, 500);
        });
      })
      .catch((err: any) => {
        setDataNotFound(true);

        setTimeout(() => {
          overlayRef.current?.classList.add('hide');
        }, 500);
      });
  }, [id, isTv]);

  return (
    <Wrapper>
      <Container>
        <InnerContainer>
          {!dataNotFound ? (
            <>
              {showData?.backdrop_path && !selectedVideo?.key && (
                <Image src={`https://image.tmdb.org/t/p/original/${showData?.backdrop_path}`} alt={showData.title} />
              )}

              {selectedVideo && selectedVideo.key && (
                <VideoContainer>
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </VideoContainer>
              )}

              {selectedVideo && selectedVideo.key && (
                <VideoButtonsContainer>
                  {videoData.length >= 3 && (
                    <>
                      <Typography onClick={() => setSelectedVideo(videoData[0])}>video-1</Typography>
                      <Typography onClick={() => setSelectedVideo(videoData[videoData.length - 1])}>video-2</Typography>
                      <Typography onClick={() => setSelectedVideo(videoData[Math.ceil((videoData.length - 1) / 2)])}>video-3</Typography>
                    </>
                  )}

                  {videoData.length === 2 && (
                    <>
                      <Typography onClick={() => setSelectedVideo(videoData[0])}>video-1</Typography>
                      <Typography onClick={() => setSelectedVideo(videoData[1])}>video-2</Typography>
                    </>
                  )}

                  {videoData.length === 1 && (
                    <>
                      <Typography onClick={() => setSelectedVideo(videoData[0])}>video-1</Typography>
                    </>
                  )}
                </VideoButtonsContainer>
              )}

              <Typography fontSize="2.4rem" fontWeight="500" margin="2rem 0 0 0">
                {showData?.title || showData?.name}
              </Typography>
              {showData?.tagline && <Typography>-{showData.tagline}</Typography>}
              <Typography margin="2rem 0">{showData?.overview}</Typography>
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
            </>
          ) : (
            <NoDataFoundMessage>No Data Found</NoDataFoundMessage>
          )}
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
