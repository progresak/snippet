import React from 'react';
import { TextKey } from '../translations';

interface WithLocalizeText {
    localizeText: (textKey: TextKey) => string;
}
const initialValue = {
    localizeText: (a:TextKey) => a,
};

const LocalizationContext = React.createContext<WithLocalizeText>(initialValue);
LocalizationContext.displayName = 'LocalizationContext';

export default LocalizationContext;
