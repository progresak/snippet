import React from 'react';
import styled from 'styled-components';

export const DateSwitcher: React.FC = () => (
    <WrapperElement>
        <RoundArrowButton>{'<'}</RoundArrowButton>
        <DisplayedDate>Týden: 25.1.2021 - 31.1.2021</DisplayedDate>
        <RoundArrowButton>{'>'}</RoundArrowButton>
    </WrapperElement>
);

export default DateSwitcher;

const DisplayedDate = styled.span`
    font-size: 20px;
    font-weight: 300;
`;

const WrapperElement = styled.div`
  text-align: center;
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const RoundArrowButton = styled.button`
  border-radius: 40px;
  border: none;
  color: white;
  font-weight: bold;
  padding: 6px 10px;
  box-shadow: none;
  text-shadow: none;
  background: #6cb91c;
  cursor: pointer;
  &:focus {
    border:none;
    outline: none;
  }
  &:hover {
    box-shadow: 0 0 3px 0 #6cb91c;
  }
`;
