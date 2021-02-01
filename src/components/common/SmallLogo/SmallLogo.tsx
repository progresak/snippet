import React from 'react';
import styled from 'styled-components';
import myFoxIcon from './myfoxIcon.svg';

const SmallLogo = () => (
    <SmallLogoElement src={myFoxIcon} alt="MyFox s.r.o" />
);
export default SmallLogo;

const SmallLogoElement = styled.img`
  width: 15px;
  margin-right: 1px;
  transform: translateY(3px);
`;
