import styled from 'styled-components';
import backgroundImage from '../images/background.jpg';

export const Content = styled.div`
  box-shadow: 0 0 2px 0 #000000;
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

export const PageWrapper = styled.div`
  background-color: black;
  background-image: url(${backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: absolute;
`;
