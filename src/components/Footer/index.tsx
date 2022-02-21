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
  padding: 1rem;
  background-color: #d4d3d3;
`;
