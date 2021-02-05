import React from 'react';
import styled from 'styled-components';
import CaffeCup from '../../../images/coffee-cup.svg';
import { device } from '../../../layout/global/mediaQueries';

const EmptyDay = () => (
    <WrapperElement>
        <IconWrapper>
            <CaffeIcon src={CaffeCup} />
        </IconWrapper>
        <span>Žádné lekce tento den.</span>
        <DividerDiv />
    </WrapperElement>
);

export default EmptyDay;

const WrapperElement = styled.div`
  color: #595959;
  background: rgb(251,251,251);
  background: -moz-linear-gradient(0deg, rgba(251,251,251,1) 0%, rgba(232,232,232,1) 100%);
  background: -webkit-linear-gradient(0deg, rgba(251,251,251,1) 0%, rgba(232,232,232,1) 100%);
  background: linear-gradient(0deg, rgba(251,251,251,1) 0%, rgba(232,232,232,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fbfbfb",endColorstr="#e8e8e8",GradientType=1);
  display: flex;
  vertical-align: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  & > span {
    margin-top: 10px;
  }
  
  @media ${device.compactMin} {
    border: 1px solid #acacac;
    border-radius: 5px;
  }
`;

const DividerDiv = styled.div`
    margin-top: 10px;
    border-bottom: 1px solid #d6d6d6;
    width: 80%;
`;

const CaffeIcon = styled.img`
    width: 100%;
`;
const IconWrapper = styled.div`
  max-width: 50px;
`;
