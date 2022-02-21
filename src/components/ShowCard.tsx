import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import Typography from './Typography';

const ShowCardComp = ({ show, setModalState, setShowId, tv, setIsTv }: any) => {
  const [imageLoading, setImageLoading] = useState(true);

  const is_cached = (img_url: string) => {
    const imgEle = document.createElement('img');
    imgEle.src = img_url;
    return imgEle.complete ? true : false;
  };

  useEffect(() => {
    is_cached(`https://image.tmdb.org/t/p/w200/${show.poster_path}`) && setImageLoading(false);
  }, [show.poster_path]);

  return (
    <>
      <ShowCard>
        <ImageWrapper
          imageLoading={imageLoading}
          onClick={() => {
            tv ? setIsTv(true) : setIsTv(false);
            setModalState(true);
            setShowId(show.id);
          }}
        >
          <Image
            src={`https://image.tmdb.org/t/p/w200/${show.poster_path}`}
            alt={show.title || show.name}
            onLoad={(e) => setImageLoading(false)}
            loading="lazy"
          />
          <StyledTypo padding="1rem 0 0 0" fontSize="1.8rem" fontWeight="500">
            {show.title || show.name}
          </StyledTypo>
        </ImageWrapper>
      </ShowCard>
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
  position: relative;

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
    height: auto;
  }
`;

const ImageWrapper = styled.div<{ imageLoading: boolean }>`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  & > * {
    pointer-events: none;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 1), transparent);
    transition: 300s;
  }

  ${({ imageLoading }) =>
    imageLoading &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('/placeholder.jpg') no-repeat center center;
        background-size: cover;
      }
    `}
`;

const StyledTypo = styled(Typography)`
  text-align: left;
  position: absolute;
  bottom: 2rem;
  padding: 0 1rem;
  color: var(--clr-white);
  pointer-events: none;
`;
