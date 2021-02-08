import TextKey from '../TextKey';

type LocaleTranslations = Record<TextKey, string>

const translations: LocaleTranslations = {
    [TextKey.ReservationToGroupWorkout]: 'Rezervace na skupinovou lekci',
    [TextKey.ReservationSystem]: 'Rezervační systém',
    [TextKey.Loading]: 'Načítám',
    [TextKey.Week]: 'Týden',
    [TextKey.YouAreLoggedInAs]: 'Přihlašujete se jako',
    [TextKey.LogOut]: 'Odhlásit',
    [TextKey.FillAllFields]: 'Vyplňte prosím všechna pole',
    [TextKey.LoggedIn]: 'Přihlášeno',
    [TextKey.Cancel]: 'Zrušit',
    [TextKey.Ok]: 'Ok',
    [TextKey.NoWorkoutsToday]: 'Žádné lekce tento den.',
    [TextKey.WorkoutSignedIn]: 'Přihlášeno',
    [TextKey.WorkoutSignIn]: 'Přihlásit',
    [TextKey.Min]: 'min',
    [TextKey.Price]: 'Cena',
    [TextKey.Occupated]: 'Obsazeno',
    [TextKey.ReservationLabelText]: 'Pro dokončení rezervace zadejte své kontaktní údaje:',

};

export default translations;
