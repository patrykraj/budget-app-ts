import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}
    padding: 0;
    background-color: black;

    *,
    ::before,
    ::after {
      box-sizing: border-box;
      font-family: Arial, Helvetica, sans-serif;
    }
  
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    nav {
      a + a {
        margin-left: ${({ theme }) => theme.spacing.xs}px;
      }
    }
`;

export default GlobalStyle;
