import React from 'react';
import styled from 'styled-components';
import FilterSelectBox from './components/FilterSelectBox';
import DateSwitcher from './components/DateSwitcher';
import { getSelectedLectorFilterId, getSelectedWorkoutFilterId, getUniqueInstructors, getUniqueWorkouts } from '../../../selectors';
import { withActionProps, withSelectorProps } from '../withStateContext';
import { MyFoxUser } from '../../../types';
import { compose } from '../../../utils';
import { setFilterLectorId, setFilterWorkoutId } from '../../../actions/state';
import { device } from '../../layout/global/mediaQueries';
import withLocalizeText from '../withLocalizeText';
import { TextKey } from '../../../translations';

interface MainFilterProps {
    instructors: MyFoxUser[];
    workouts: MyFoxUser[];
    setWorkoutId: (id: string) => void;
    setLectorId: (id: string) => void;
    selectedLectorId: string | undefined;
    selectedWorkoutId: string | undefined;
}

export const MainFilter: React.FC<MainFilterProps> = ({ instructors, workouts, setWorkoutId, setLectorId, selectedLectorId, selectedWorkoutId }) => {
    const instructorOptions = instructors?.map(({ id, name, surname }) => ({ id, label: `${name} ${surname}` }));
    const workoutsOptions = workouts?.map(({ id, name }) => ({ id, label: name }));

    return (
        <MainFilterWrapper>
            <FiltersWrapper>
                <ConnectedFilterSelectBox key="workouts" defaultName={TextKey.Workout} options={workoutsOptions} handleOnChange={setWorkoutId} selectedId={selectedWorkoutId} />
                <ConnectedFilterSelectBox key="lectors" defaultName={TextKey.Instructor} options={instructorOptions} handleOnChange={setLectorId} selectedId={selectedLectorId} />
            </FiltersWrapper>
            <DateSwitcher />
        </MainFilterWrapper>
    );
};
const ConnectedFilterSelectBox = withLocalizeText(FilterSelectBox);

const withMainFilterData = compose(
    withSelectorProps(getUniqueInstructors, 'instructors'),
    withSelectorProps(getUniqueWorkouts, 'workouts'),

    withSelectorProps(getSelectedLectorFilterId, 'selectedLectorId'),
    withSelectorProps(getSelectedWorkoutFilterId, 'selectedWorkoutId'),

    withActionProps(setFilterWorkoutId, 'setWorkoutId'),
    withActionProps(setFilterLectorId, 'setLectorId'),
);

export default withMainFilterData(MainFilter);

const FiltersWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media ${device.compact} {
    flex-direction: column;
  }
`;

const MainFilterWrapper = styled.div`
  text-align: center;
  margin: 20px 0;
`;
