import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
      body {
        margin: 0;
        padding: 0;
        background: black;
        }
     * { 
        scrollbar-color: lightgray transparent;
        scrollbar-width: thin;
        box-sizing: border-box;
    }
    ::-webkit-scrollbar {
    width: 0.25rem;
    }
  
    ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);

`;
