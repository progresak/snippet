import React from 'react';
import styled from 'styled-components';
import CaffeCup from '../../../images/coffee-cup.svg';

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
  background: #f0f0f0;
  color: #595959;
  border: 1px solid #acacac;
  border-radius: 5px;
  display: flex;
  vertical-align: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  & > span {
    margin-top: 10px;
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
