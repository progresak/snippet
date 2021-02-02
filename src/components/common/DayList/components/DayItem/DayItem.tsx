import React from 'react';
import styled from 'styled-components';
import { Workout } from './components';
import EmptyDay from '../EmptyDay';
import CalendarImage from '../../../../images/calendar.svg';

const DayItem = () => (
    <Wrapper>
        <TitleElement>
            <CalendarIcon src={CalendarImage} alt="Pondělí" />
            &nbsp;
            <span>Pondělí 25.1.2021</span>
        </TitleElement>
        <WorkoutsWrapper>
            <Workout />
            <Workout />
        </WorkoutsWrapper>
        <EmptyDay />
    </Wrapper>
);

export default DayItem;

const Wrapper = styled.div`
  margin-top: 15px;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
`;

const WorkoutsWrapper = styled.div`
    margin: 10px 0;
`;

const TitleElement = styled.div`
    background: #e2f1d2;
    border-radius: 5px;
    font-size: 16px;
    padding: 5px 0;
    text-align: center;
`;

const CalendarIcon = styled.img`
    height:13px;
    transform: translateY(1px);
`;
