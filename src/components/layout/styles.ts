import styled from 'styled-components';
import backgroundImage from '../images/background.jpg';

export const Content = styled.div`
  padding: 25px;
`;

export const Container = styled.div`
    max-width: 680px;
    background: white;
    margin: auto;
    color: #595959;
`;

export const TopLine = styled.div`
    width: 100%;
    background: #6bb91c;
    height: 4px;
`;

export const PageBackground = styled.div`
  background-color: black;
  background-image: url(${`./${backgroundImage}`});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
`;

export const PageWrapper = styled.div`
  width: 100%;
  position: absolute;
`;
