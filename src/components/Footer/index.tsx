import styled from 'styled-components';

import Typography from '../Typography';

const FooterComp = () => {
  return (
    <Footer>
      <Typography textAlign="center" fontSize="1.5rem">
        Made with nextJS(ISR) and &quot;The MovieDb API&quot;
      </Typography>

      <Typography textAlign="center" fontSize="1.5rem">
        <a href="https://abidshahriar.me" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--clr-primary-deep)' }}>
          Abid Shahriar
        </a>
      </Typography>
    </Footer>
  );
};

export default FooterComp;

const Footer = styled.footer`
  margin-top: 4rem;
  padding: 1.5rem;
  background-color: #e7e7e7;
`;
