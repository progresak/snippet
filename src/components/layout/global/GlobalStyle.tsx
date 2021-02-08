import { createGlobalStyle } from 'styled-components';
import { MyFoxMicroSite } from '../../../types';

const GlobalStyle = createGlobalStyle<MyFoxMicroSite>`
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700&display=swap");
  
  body {
    font-family: 'Open Sans', sans-serif;
    letter-spacing: 0.4px;
  }
  button {
    ${({ snippetButtonColor }) => snippetButtonColor && `background:${snippetButtonColor}!important;`}
    ${({ snippetButtonColor }) => snippetButtonColor && `border-color:${snippetButtonColor}!important;`}
  }

  .fade-in {
    animation: fadeIn ease 1s;
    -webkit-animation: fadeIn ease 1s;
    -moz-animation: fadeIn ease 1s;
    -o-animation: fadeIn ease 1s;
    -ms-animation: fadeIn ease 1s;
  }
  @keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }

  @-moz-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }

  @-webkit-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }

  @-o-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }

  @-ms-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }

  @-moz-document url-prefix() {
    select {
      border: revert!important;
      border-radius: revert!important;
      background: revert!important;
    }
  }
`;

export default GlobalStyle;
