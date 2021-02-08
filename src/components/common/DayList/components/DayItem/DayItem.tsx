import React from 'react';
import styled from 'styled-components';
import { Workout } from './components';
import EmptyDay from '../EmptyDay';
import { WithId } from '../../../../../types';
import { device } from '../../../../layout/global/mediaQueries';
import { CalendarImg, DisabledImage } from '../../../imageComponents';

interface DayItemProps {
    date: string,
    calendarIds: (WithId & {dateKey: string})[];
}

const renderWorkouts = (ids:WithId[]) => {
    if (!ids.length) {
        return <EmptyDay />;
    }

    return ids.map(({ id }) => <Workout id={id} key={id} />);
};

const DayItem: React.FC<DayItemProps> = ({ date, calendarIds }) => {
    const isEmptyDay = !!calendarIds.length;
    return (
        <Wrapper>
            <TitleElement>
                <IconWrapper>
                    {isEmptyDay ? <CalendarImg /> : <DisabledImage />}
                </IconWrapper>
                &nbsp;
                <span>
                    {date}
                </span>
            </TitleElement>
            <WorkoutsWrapper>
                {renderWorkouts(calendarIds)}
            </WorkoutsWrapper>
        </Wrapper>
    );
};

export default DayItem;

const Wrapper = styled.div`
  margin-top: 15px;
    
  @media ${device.compactMin} {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
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
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: center;
`;

const IconWrapper = styled.div`
    width: 16px;
    transform: translateY(1px);
`;
