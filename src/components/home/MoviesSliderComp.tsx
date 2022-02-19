import styled from 'styled-components';

import ShowCard from '../ShowCard';
import CustomSlider from '../Slider';
import Typography from '../Typography';

interface Props {
  shows: any;
  setModalState: (state: boolean) => void;
  setShowId: (id: number) => void;
  title: string;
  delay?: number;
  tv?: boolean;
  setIsTv?: (isTv: boolean) => void;
}

const MoviesSliderComp = ({ shows, setModalState, setShowId, title, delay = 0, tv, setIsTv }: Props) => {
  return (
    <Container>
      <Typography fontSize='2.5rem' fontWeight='600' margin='0 0 0 0' textTransform='capitalize'>
        {title}:
      </Typography>
      <CustomSlider delay={delay}>
        {shows?.map((show: any) => (
          <ShowCard key={show.id} show={show} setShowId={setShowId} setModalState={setModalState} tv={tv} setIsTv={setIsTv} />
        ))}
      </CustomSlider>
    </Container>
  );
};

export default MoviesSliderComp;

const Container = styled.div``;
