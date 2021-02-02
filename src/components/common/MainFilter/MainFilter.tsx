import React from 'react';
import styled from 'styled-components';
import FilterSelectBox from './components/FilterSelectBox';
import DateSwitcher from './components/DateSwitcher';

export const MainFilter: React.FC = () => (
    <MainFilterWrapper>
        <FiltersWrapper>
            <FilterSelectBox />
            <FilterSelectBox />
        </FiltersWrapper>
        <DateSwitcher />
    </MainFilterWrapper>

);

export default MainFilter;

const FiltersWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainFilterWrapper = styled.div`
  text-align: center; // TODO?
  margin: 20px 0;
`;
