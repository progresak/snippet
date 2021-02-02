import React from 'react';
import DayItem from './components/DayItem/DayItem';
import { withSelectorProps } from '../withStateContext';
import { getGroupedCalendarsByDate } from '../../../selectors';
import { WithId } from '../../../types';

interface DayListProps {
    days: Record<string, WithId & {dateKey: string}>
}

const renderItems = (days: Record<string, WithId & {dateKey: string}>) => Object.keys(days).map((dateKey) => {
    const calendarIds = days[dateKey];

    return <DayItem key={dateKey} date={dateKey} calendarIds={calendarIds} />;
});

const DayList: React.FC<DayListProps> = ({ days }) => {
    if (!days) {
        return (<span>Loading...</span>); // todo: spinner
    }

    return (
        <>
            {renderItems(days)}
        </>
    );
};

const withListData = withSelectorProps(getGroupedCalendarsByDate, 'days');

export default withListData(DayList);
