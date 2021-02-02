import { ApplicationState, Cart, MyFoxUser, WithId } from '../types';
import { findByKey, groupBy, uniqueArray } from '../utils';

export const getUniqueInstructors = (state: ApplicationState) => {
    const calendars = state?.baseData?.calendars;
    const employees = calendars?.map<MyFoxUser[]>(({ employees: e }) => e.map<MyFoxUser>(({ userMyFox }) => userMyFox)).reduce((prev, curr) => prev.concat(curr));
    if (employees) {
        return uniqueArray(employees);
    }
    return [];
};

export const getUniqueWorkouts = (state: ApplicationState) => {
    const calendars = state?.baseData?.calendars;
    const carts = calendars?.map<Cart>(({ id, carts: e }) => ({ id, ...e[0] }));

    if (carts) {
        return uniqueArray(carts);
    }

    return [];
};
export const getCalendarIds = (state: ApplicationState) => state?.baseData?.calendars?.map(({ id }) => id);

export const getCalendarById = (state: ApplicationState, { id }: WithId) => {
    const calendars = state?.baseData?.calendars;
    if (!calendars || !id) {
        return undefined;
    }

    return findByKey(calendars, id);
};

export const getGroupedCalendarsByDate = (state: ApplicationState) => {
    const calendars = state?.baseData?.calendars;
    const idsWithDateKeys = calendars?.map(({ id, from }) => {
        const dateFrom = new Date(from);
        const dateKey = `${dateFrom.toLocaleDateString()}`;
        return { id, dateKey };
    });

    return groupBy(idsWithDateKeys, 'dateKey');
};
