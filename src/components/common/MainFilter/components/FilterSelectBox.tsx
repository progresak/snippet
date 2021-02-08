import React from 'react';
import styled from 'styled-components';
import { device } from '../../../layout/global/mediaQueries';

interface Option {
    id: string;
    label: string;
}

interface FilterSelectBoxProps {
    defaultName: string;
    options: Option[];
    selectedId?: string;
    handleOnChange: (id: string) => void;
}

export const FilterSelectBox: React.FC<FilterSelectBoxProps> = ({ options, defaultName, handleOnChange, selectedId }) => {
    const handleChange = (event: any) => {
        handleOnChange(event.target.value);
    };
    return (
        <SelectInput value={selectedId} onChange={handleChange}>
            <option key={`${defaultName}-default`} value="">{defaultName}</option>
            {options.map(({ id, label }) => (
                <option key={id} value={id}>{label}</option>
            ))}
        </SelectInput>
    );
};

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
    -moz-appearance: none;

  @media ${device.compact} {
    width: 70%;
    max-width: initial;
    text-align: center;
    margin: 5px;
  }
`;
