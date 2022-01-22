import styled from 'styled-components';
import djs from 'dayjs';

import Typography from '../Typography';
import ShowCard from '../ShowCard';

const NowPlayingComp = ({ shows }: any) => {
  console.log(shows[0]);
  return (
    <Container>
      {shows.map((show: any) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </Container>
  );
};

export default NowPlayingComp;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
`;
