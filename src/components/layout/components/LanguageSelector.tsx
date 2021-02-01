import React from 'react';
import styled from 'styled-components';

export const LanguageSelector: React.FC = () => (
    <SelectInput name="cars" id="cars">
        <option value="volvo">CZ</option>
        <option value="saab">DE</option>
    </SelectInput>
);

export default LanguageSelector;

const SelectInput = styled.select`
    max-width: 50px;
    border-radius: 5px;
`;
