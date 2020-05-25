import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset-advanced';

export default createGlobalStyle`
  ${reset};

  body {
    font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', sans-serif;
    font-weight: 500;
    background-color: #292d3e;
    color: rgb(166, 172, 205);
  }

  #gatsby-focus-wrapper {
    display: flex;
    justify-content: center;
  }
`;
