import React from 'react';
import styled from 'styled-components';

export const FilterSelectBox: React.FC = () => (
    <SelectInput name="cars" id="cars">
        <option value="volvo">Lekce</option>
        <option value="saab">Jedna</option>
    </SelectInput>
);

export default FilterSelectBox;

const SelectInput = styled.select`
    width: 100%;
    max-width: 220px;
    border-radius: 5px;
    padding: 10px;
    background: #f0f0f0;
    color: #757575;
    font-size: 16px;
    border: 1px solid #c4c4c4;
    margin: 0 10px;
  
`;
