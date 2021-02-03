const days = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];

export const getDisplayDate = (date: Date) => date.toLocaleDateString();

export const getDisplayDateWithDayName = (date: Date) => {
    const disDate = getDisplayDate(date);
    const dayName = days[date.getDay()];

    return `${dayName} ${disDate}`;
};
