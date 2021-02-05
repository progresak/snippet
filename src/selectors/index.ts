import { ApplicationState, Cart, MyFoxUser, WithId } from '../types';
import { findByKey, getCurrentWeekDateRange, getDisplayDateWithDayName, getObjectWithDateKeys, groupBy, uniqueArrayOfObjects } from '../utils';

export const getUniqueInstructors = (state: ApplicationState) => {
    const calendars = state?.baseData?.calendars;
    const employees = calendars?.map<MyFoxUser[]>(({ employees: e }) => e.map<MyFoxUser>(({ userMyFox }) => userMyFox)).reduce((prev, curr) => prev.concat(curr));
    if (employees) {
        return uniqueArrayOfObjects(employees);
    }
    return [];
};
export const getSelectedWorkoutFilterId = (state:ApplicationState) => state?.filter?.selectedWorkoutId;
export const getSelectedLectorFilterId = (state:ApplicationState) => state?.filter?.selectedLectorId;

export const isModalOpened = (state:ApplicationState) => !!state?.meta?.isModalOpen;

export const getUniqueWorkouts = (state: ApplicationState) => {
    const calendars = state?.baseData?.calendars;
    const carts = calendars?.map<Cart>(({ id, carts: e }) => ({ id, ...e[0] }));

    if (carts) {
        return uniqueArrayOfObjects(carts);
    }

    return [];
};
export const getCalendarIds = (state: ApplicationState) => state?.baseData?.calendars?.map(({ id }) => id);

export const getCalendarById = (state: ApplicationState, { id }: WithId) => {
    const calendars = state?.baseData?.calendars;
    if (!calendars || !id) {
        return undefined;
    }

    const calendar = findByKey(calendars, id);
    if (!calendar) {
        return undefined;
    }
    const dateFrom = new Date(calendar.from);

    return { ...calendar, dateFrom };
};

export const getFilteredCalendars = (state: ApplicationState) => {
    const calendars = state?.baseData?.calendars;
    const lectorId = state?.filter?.selectedLectorId;
    const workoutId = state?.filter?.selectedWorkoutId;
    const dateTo = state?.filter?.dateTo;
    const dateFrom = state?.filter?.dateFrom;

    if (!calendars) {
        return [];
    }

    return calendars
        .filter(({ employees }) => (!lectorId || employees[0]?.userMyFox?.id === lectorId))
        .filter(({ id }) => (!workoutId || id === workoutId))
        .filter(({ from }) => {
            const fromDate = new Date(from);
            return (fromDate >= dateFrom && fromDate < dateTo);
        });
};

export const getFullGroupedCalendarsByDate = (state: ApplicationState) => {
    const calendars = getFilteredCalendars(state);
    const dateTo = state?.filter?.dateTo;
    const dateFrom = state?.filter?.dateFrom;
    const emptyDateRange = getObjectWithDateKeys({ dateFrom, dateTo }, getDisplayDateWithDayName);
    console.log(emptyDateRange );
    const idsWithDateKeys = calendars?.map(({ id, from }) => {
        const fromDate = new Date(from);
        const dateKey = getDisplayDateWithDayName(fromDate);
        return { id, dateKey };
    });
    const m = groupBy(idsWithDateKeys, 'dateKey');

    return { ...emptyDateRange, ...m };
};
