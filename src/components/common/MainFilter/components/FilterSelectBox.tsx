import React from 'react';
import styled from 'styled-components';

interface Option {
    id: string;
    label: string;
}

interface FilterSelectBoxProps {
    defaultName: string;
    options: Option[];
    selectedId?: string;
}
// TODO: FIX FILTER
export const FilterSelectBox: React.FC<FilterSelectBoxProps> = ({ options, defaultName, selectedId }) => (
    <SelectInput name={defaultName}>
        <option key={`${defaultName}-default`} value={undefined}>{defaultName}</option>
        {options.map(({ id, label }) => (
            <option key={id} value={id} selected={selectedId === id}>{label}</option>
        ))}
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
