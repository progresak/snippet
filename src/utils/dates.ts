const days = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];

export const getDisplayDate = (date: Date) => date.toLocaleDateString();

export const getDisplayDateWithDayName = (date: Date) => {
    const disDate = getDisplayDate(date);
    const dayName = days[date.getDay()];

    return `${dayName} ${disDate}`;
};

const getActualDate = () => new Date(new Date().setHours(0, 0, 0, 0));

interface WeekRange {
    dateFrom: Date;
    dateTo: Date;
}

export const isPrevWeekButtonDisabled = (lastDay: Date) => {
    const today = getActualDate().setHours(0, 0, 0, 0);
    const lastDayRaw = lastDay.setHours(0, 0, 0, 0);

    return (lastDayRaw <= today);
};

export const getCurrentWeekDateRange = (): WeekRange => {
    const curr = getActualDate();
    const first = curr.getDate() - curr.getDay() + 1;
    const last = first + 6;

    const firstday = new Date(new Date(curr.setDate(first)).setHours(0, 0, 0, 0));
    const lastday = new Date(new Date(curr.setDate(last)).setHours(0, 0, 0, 0));
    return {
        dateFrom: firstday,
        dateTo: lastday,
    };
};

export const getWeekDiffRange = ({ dateFrom, dateTo }: WeekRange, next = true): WeekRange => {
    const prevFrom = new Date(dateFrom.setDate((dateFrom.getDate() + (next ? 7 : -7))));
    const prevTo = new Date(dateTo.setDate((dateTo.getDate() + (next ? 7 : -7))));
    return {
        dateFrom: prevFrom,
        dateTo: prevTo,
    };
};

const times = (x) => (f) => {
    if (x > 0) {
        f();
        times(x - 1)(f);
    }
};

export const getObjectWithDateKeys = ({ dateFrom, dateTo }: WeekRange, callback: (d:Date) => string): object => {
    let datePointer = new Date(dateFrom.valueOf());
    const obj = {};
    const timeDiff = dateFrom.getTime() - dateTo.getTime();

    const daysDifference = Math.abs(timeDiff / (1000 * 3600 * 24)) + 1;
    times(daysDifference)(() => {
        obj[callback(datePointer)] = [];
        datePointer = new Date(datePointer.setDate(datePointer.getDate() + 1));
    });

    return obj;
};
