import React from 'react';
import { DayList, MainFilter } from '../common';

interface Props {
}
const Dashboard: React.FC<Props> = () => (
    <div>
        <MainFilter />
        <DayList />
    </div>
);

export default Dashboard;
