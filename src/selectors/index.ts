import { ApplicationState, Cart, MyFoxUser } from '../types';
import { uniqueArray } from '../utils';

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
