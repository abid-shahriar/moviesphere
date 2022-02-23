import styled from 'styled-components';

import Typography from '../Typography';

const Navbar = () => {
  return (
    <Nav>
      <Container>
        <StyledTypo fontSize="3.5rem" fontWeight="600">
          Moviesphere
        </StyledTypo>
      </Container>
    </Nav>
  );
};

export default Navbar;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  background-color: var(--clr-white);
`;

const StyledTypo = styled(Typography)`
  letter-spacing: 5px;
`;
