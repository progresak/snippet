import { TextKey } from '../translations';

const days = [TextKey.Sunday, TextKey.Monday, TextKey.Tuesday, TextKey.Wednesday, TextKey.Thursday, TextKey.Friday, TextKey.Saturday];

export const getDisplayDate = (date: Date) => date.toLocaleDateString();

export const getDisplayDateWithDayName = (date: Date, localizeText: ((tk: TextKey) => string) | null = null) => {
    const disDate = getDisplayDate(date);
    const dayName = days[date.getDay()];
    const translate = localizeText || ((s) => s);
    return `${translate(dayName)} ${disDate}`;
};

export const getDisplayDateWithTime = (date: Date, localizeText: ((tk: TextKey) => string) | null = null) => {
    const day = date.getUTCDay();
    const month = date.getUTCMonth();
    const dayName = days[date.getDay()];
    const minutes = date.getUTCMinutes() === 0 ? '00' : date.getUTCMinutes();
    const hours = date.getUTCHours();

    const translate = localizeText || ((s) => s);

    return `${translate(dayName)} ${day}.${month} ${hours}:${minutes}`;
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

export const getObjectWithDateKeys = ({ dateFrom, dateTo }: WeekRange & { locale: string }, callback: (d:Date, l: string) => string): object => {
    let datePointer = new Date(dateFrom.valueOf());
    const obj = {};
    const timeDiff = dateFrom.getTime() - dateTo.getTime();

    const daysDifference = Math.abs(timeDiff / (1000 * 3600 * 24)) + 1;
    times(daysDifference)(() => {
        obj[datePointer] = [];
        datePointer = new Date(datePointer.setDate(datePointer.getDate() + 1));
    });

    return obj;
};

export const isPastDate = (date: Date): boolean => date < getActualDate();
