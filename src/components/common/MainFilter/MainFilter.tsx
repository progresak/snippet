import React from 'react';
import styled from 'styled-components';
import FilterSelectBox from './components/FilterSelectBox';
import DateSwitcher from './components/DateSwitcher';
import { getUniqueInstructors, getUniqueWorkouts } from '../../../selectors';
import { withSelectorProps } from '../withStateContext';
import { MyFoxUser } from '../../../types';
import { compose } from '../../../utils';

interface MainFilterProps {
    instructors: MyFoxUser[];
    workouts: MyFoxUser[];
}

export const MainFilter: React.FC<MainFilterProps> = ({ instructors, workouts }) => {
    const instructorOptions = instructors?.map(({ id, name, surname }) => ({ id, label: `${name} ${surname}` }));
    const workoutsOptions = workouts?.map(({ id, name }) => ({ id, label: name }));

    return (
        <MainFilterWrapper>
            <FiltersWrapper>
                <FilterSelectBox key="workouts" defaultName="Lekce" options={workoutsOptions} />
                <FilterSelectBox key="lectors" defaultName="Instruktor" options={instructorOptions} />
            </FiltersWrapper>
            <DateSwitcher />
        </MainFilterWrapper>
    );
};

const withMainFilterData = compose(
    withSelectorProps(getUniqueInstructors, 'instructors'),
    withSelectorProps(getUniqueWorkouts, 'workouts'),
);

export default withMainFilterData(MainFilter);

const FiltersWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainFilterWrapper = styled.div`
  text-align: center;
  margin: 20px 0;
`;
