const days = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];

export const getDisplayDate = (date: Date) => date.toLocaleDateString();

export const getDisplayDateWithDayName = (date: Date) => {
    const disDate = getDisplayDate(date);
    const dayName = days[date.getDay()];

    return `${dayName} ${disDate}`;
};

const getActualDate = () => new Date();

interface WeekRange {
    dateFrom: Date;
    dateTo: Date;
}

export const isPrevWeekButtonDisabled = (lastDay: Date) => {
    const today = getActualDate().setHours(0, 0, 0, 0);
    const lastDayRaw = lastDay.setHours(0, 0, 0, 0);
    return (lastDayRaw < today);
};

export const getCurrentWeekDateRange = (): WeekRange => {
    const curr = getActualDate();
    const first = curr.getDate() - curr.getDay() + 1;
    const last = first + 6;

    const firstday = new Date(curr.setDate(first));
    const lastday = new Date(curr.setDate(last));
    console.log({ firstday, lastday });
    return {
        dateFrom: firstday,
        dateTo: lastday,
    };
};

export const getWeekDiffRange = ({ dateFrom, dateTo }: WeekRange, next = true): WeekRange => {
    const prevFrom = new Date(dateFrom.setDate((dateFrom.getDate() + (next ? 6 : -7))));
    const prevTo = new Date(dateTo.setDate((dateTo.getDate() + (next ? 7 : -6))));
    return {
        dateFrom: prevFrom,
        dateTo: prevTo,
    };
};

export const getObjectWithDateKeys = ({ dateFrom, dateTo }: WeekRange, callback: (d:Date) => string): object => {
    let datePointer = dateFrom;
    const obj = {};
    while (datePointer < dateTo) {
        obj[callback(datePointer)] = [];
        datePointer = new Date(datePointer.setDate(datePointer.getDate() + 1));
    }

    return obj;
};
