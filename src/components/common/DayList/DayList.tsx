import React from 'react';
import DayItem from './components/DayItem/DayItem';
import { withStoreProps } from '../withStateContext';
import { Calendar } from '../../../types';

interface DayListProps {
    calendars: Calendar[];
}

const renderDayItem = ({ id, ...calendar }: Calendar) => <DayItem key={id} {...calendar} />;
const renderItems = (calendars: Calendar[]) => calendars.map(renderDayItem);

const DayList: React.FC<DayListProps> = ({ calendars }) => {
    if (!calendars) {
        return (<span>Loading...</span>); // todo: spinner
    }

    return (
        <>
            {renderItems(calendars)}
        </>
    );
};

const withListData = withStoreProps(['baseData', 'calendars'], 'calendars');

export default withListData(DayList);
