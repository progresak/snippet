import TextKey from '../TextKey';

type LocaleTranslations = Record<TextKey, string>

const translations: LocaleTranslations = {
    [TextKey.Reservation]: 'Rezervace',
};

export default translations;
