import React from 'react';
import styled from 'styled-components';
import { device } from '../global/mediaQueries';
import { withActionProps, withStoreProps } from '../../common/withStateContext';
import { compose } from '../../../utils';
import { changeLanguage } from '../../../actions/state';
import { SyntheticEventData } from 'react-dom/test-utils';

interface Option {
    value: string;
    label: string;
}

interface LanguageSelectorProps {
    selectedLng?: string;
    handleOnChange: (id: string) => void;
}
const options: Option[] = [
    { label: 'CZ', value: 'cs' },
    { label: 'EN', value: 'en' },
];

export const LanguageSelector: React.FC = ({ handleOnChange, selectedLng }: LanguageSelectorProps) => {
    const handleChange = (e: unknown) => {
        handleOnChange(event.target.value);
    };
    return (
        <SelectInput value={selectedLng} onChange={handleChange}>
            {options.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
            ))}
        </SelectInput>
    );
};

export default compose(
    withStoreProps('selectedLanguage', 'selectedLng'),
    withActionProps(changeLanguage, 'handleOnChange'),
)(LanguageSelector);

const SelectInput = styled.select`
    max-width: 50px;
    border-radius: 5px;
  @media ${device.compact} {
    margin-bottom: 10px;
  }
`;
