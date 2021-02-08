import React from 'react';
import DayItem from './components/DayItem/DayItem';
import { withSelectorProps } from '../withStateContext';
import { getFullGroupedCalendarsByDate } from '../../../selectors';
import { WithId, WithLocalizeText } from '../../../types';
import { LocalizedText, TextKey } from '../../../translations';
import { compose, getDisplayDateWithDayName } from '../../../utils';
import withLocalizeText from '../withLocalizeText';

interface DayListProps extends WithLocalizeText {
    days: Record<string, WithId & {dateKey: string, fromDate: Date}>
}

const renderItems = (days: Record<string, WithId & {dateKey: string}>, localizeText: (tk: TextKey) => string) => Object.keys(days).map((dateKey) => {
    const calendarIds = days[dateKey];

    return <DayItem key={dateKey} date={getDisplayDateWithDayName(new Date(dateKey), localizeText)} calendarIds={calendarIds} />;
});

const DayList: React.FC<DayListProps> = ({ days, localizeText }) => {
    if (!days) {
        return (<LocalizedText textKey={TextKey.Loading} />); // todo: spinner
    }

    return (
        <>
            {renderItems(days, localizeText)}
        </>
    );
};

const withListData = compose(
    withSelectorProps(getFullGroupedCalendarsByDate, 'days'),
    withLocalizeText,
);

export default withListData(DayList);
