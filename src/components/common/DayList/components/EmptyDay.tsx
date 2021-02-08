import React from 'react';
import styled from 'styled-components';

const EmptyDay = () => (
    <WrapperElement>
        <span>Žádné lekce tento den.</span>
        <DividerDiv />
    </WrapperElement>
);

export default EmptyDay;

const WrapperElement = styled.div`
  color: #595959;
  font-weight: 100;
  display: flex;
  vertical-align: center;
  flex-direction: column;
  align-items: center;
  & > span {
    margin-top: 5px;
  }
`;

const DividerDiv = styled.div`
    margin-top: 10px;
    border-bottom: 1px solid #d6d6d6;
    width: 100%;
`;
