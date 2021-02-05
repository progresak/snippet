import { FormData, SignInCookieFormat, WithApplicationState } from '../types';
import { createReservation, CreateReservationProps, CreateReservationSuccessResponse, fetchBase } from './index';
import { getCookie, logOutCookie, setCookie } from '../utils/cookies';
import { getWeekDiffRange, isEmptyObject, uniqueArray } from '../utils';

export const setFilterWorkoutId = (id: string) => ({ applicationState, setApplicationState }:WithApplicationState) => {
    const newState = { ...applicationState, filter: { ...applicationState.filter, selectedWorkoutId: id } };
    setApplicationState(newState);
};

export const setFilterLectorId = (id: string) => ({ applicationState, setApplicationState }:WithApplicationState) => {
    const newState = { ...applicationState, filter: { ...applicationState.filter, selectedLectorId: id } };
    setApplicationState(newState);
};

export const closeModal = () => ({ applicationState, setApplicationState }:WithApplicationState) => {
    const newState = { ...applicationState, meta: { ...applicationState.meta, isModalOpen: false, reservationWorkoutId: undefined } };
    setApplicationState(newState);
};

export const openModalWithId = (calendarId: string) => ({ applicationState, setApplicationState }:WithApplicationState) => {
    const newState = { ...applicationState, meta: { ...applicationState.meta, isModalOpen: true, reservationWorkoutId: calendarId } };
    setApplicationState(newState);
};

export interface SendReservationResponse extends CreateReservationSuccessResponse {
    calendarId: string;
}
export const sendReservation = (formData: FormData) => async ({ applicationState, setApplicationState }: WithApplicationState): Promise<SendReservationResponse> => {
    const serverUrl = applicationState.apiConfiguration?.serverUrl;
    const selectedCalendarId = applicationState.meta?.reservationWorkoutId;

    if (!selectedCalendarId || !serverUrl) {
        return Promise.reject();
    }

    const cookie = getCookie<SignInCookieFormat>('customerData');
    const customerId = !isEmptyObject(cookie) ? cookie.customerId : undefined;

    const apiProps: CreateReservationProps = {
        calendarId: selectedCalendarId,
        note: '',
        capacity: 1,
        customerId,
        ...formData,
    };
    setApplicationState({ ...applicationState, meta: { isFetching: true } });
    const response = await createReservation({ serverUrl }, apiProps) as CreateReservationSuccessResponse;
    setApplicationState({ ...applicationState, meta: { isFetching: false } });
    return { ...response, calendarId: selectedCalendarId };
};

export const reFetchBaseData = () => async ({ applicationState, setApplicationState }: WithApplicationState) => {
    const serverUrl = applicationState.apiConfiguration?.serverUrl;
    const shopId = applicationState.apiConfiguration?.shopId;
    if (serverUrl && shopId) {
        const response = await fetchBase({ serverUrl, shopId });

        setApplicationState({ ...applicationState, baseData: response, meta: { ...applicationState.meta, isModalOpen: false } });
        return Promise.resolve();
    }
};

export const logOut = () => ({ applicationState, setApplicationState }: WithApplicationState) => {
    logOutCookie();
    setApplicationState({ ...applicationState, cookie: {} });
};

const getCustomerCookieObj = (userData: FormData, customerId: string, calendarId: string): SignInCookieFormat => {
    const oldCookie = getCookie<SignInCookieFormat>('customerData');
    const signedWorkouts = Array.isArray(oldCookie.calendarIds) ? oldCookie.calendarIds : [];
    const workoutIds = uniqueArray([calendarId, ...signedWorkouts]);

    return ({
        ...oldCookie,
        ...userData,
        customerId,
        calendarIds: workoutIds,
    });
};

export const setLoginCookie = (formData: FormData, customerId: string, calendarId: string) => ({ applicationState, setApplicationState }: WithApplicationState) => {
    const cookie = getCustomerCookieObj(formData, customerId, calendarId);
    setCookie('customerData', cookie);
    setApplicationState({ ...applicationState, cookie, meta: { ...applicationState.meta, isModalOpen: false } });
};

export const setWeekDiffFilter = (add: boolean = false) => ({ applicationState, setApplicationState }: WithApplicationState) => {
    const { dateFrom: df, dateTo: dt } = applicationState.filter;
    const { dateFrom, dateTo } = getWeekDiffRange({ dateFrom: df, dateTo: dt }, add);
    setApplicationState({ ...applicationState, filter: { ...applicationState.filter, dateFrom, dateTo } });
};
