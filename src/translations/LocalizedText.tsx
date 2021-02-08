import React, { useContext } from 'react';
import TextKey from './TextKey';
import LocalizationContext from '../providers/LocalizationContext';

export interface LocalizedTextProps {
    textKey: TextKey;
    lowerCase?: boolean;
    upperCase?: boolean;
    firstLowerCase?: boolean;
}

export const LocalizedText = ({ textKey, lowerCase, firstLowerCase, upperCase, ...other }: LocalizedTextProps) => {
    const { localizeText } = useContext(LocalizationContext);

    let text = localizeText(textKey);

    if (lowerCase) {
        text = text.toLowerCase();
    }

    if (upperCase) {
        text = text.toUpperCase();
    }

    if (firstLowerCase) {
        text = `${text[0].toLowerCase()}${text.slice(1)}`;
    }
    return <span {...other}>{text}</span>;
};

export default LocalizedText;
