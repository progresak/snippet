import TextKey from './TextKey';
import cs from './locales/cs';
import en from './locales/en';
import { LocaleTranslations } from '../types';

const DEFAULT_LNG = 'cs';

export const getTranslation = (language: string = DEFAULT_LNG) => (textKey: TextKey) => {
    let translationMap = {} as LocaleTranslations;
    switch (language) {
    case DEFAULT_LNG:
        translationMap = cs;
        break;
    case 'en':
        translationMap = en;
        break;
    default:
        translationMap = cs;
    }

    if (translationMap[textKey]) {
        return translationMap[textKey];
    }

    return 'NOT TRANSLATED';
};
