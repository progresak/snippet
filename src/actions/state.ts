import { ApplicationState, FormData, SignInCookieFormat, WithApplicationState } from '../types';
import { createReservation, CreateReservationProps, CreateReservationSuccessResponse, fetchBase } from './index';
import { getCookie, logOutCookie, setCookie } from '../utils/cookies';
import { getWeekDiffRange, isEmptyObject } from '../utils';

export const setFilterWorkoutId = (id: string) => ({ applicationState, setApplicationState }:WithApplicationState) => {
    const newState = { ...applicationState, filter: { ...applicationState.filter, selectedWorkoutId: id } }as ApplicationState;
    setApplicationState(newState);
    return newState;
};

export const setFilterLectorId = (id: string) => ({ applicationState, setApplicationState }:WithApplicationState) => {
    const newState = { ...applicationState, filter: { ...applicationState.filter, selectedLectorId: id } } as ApplicationState;
    setApplicationState(newState);
    return newState;
};

export const closeModal = () => ({ applicationState, setApplicationState }:WithApplicationState) => {
    const newState = { ...applicationState, meta: { ...applicationState.meta, isModalOpen: false, reservationWorkoutId: undefined } } as ApplicationState;
    setApplicationState(newState);
    return newState;
};

export const openModalWithId = (calendarId: string) => ({ applicationState, setApplicationState }:WithApplicationState) => {
    const newState = { ...applicationState, meta: { ...applicationState.meta, isModalOpen: true, reservationWorkoutId: calendarId } } as ApplicationState;
    setApplicationState(newState);
    return newState;
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
    console.log('senduju Cookie', { cookie });
    const customerId = !isEmptyObject(cookie) ? cookie.customerId : undefined;

    const apiProps: CreateReservationProps = {
        calendarId: selectedCalendarId,
        note: '',
        capacity: 1,
        customerId,
        ...formData,
    };
    setApplicationState({ ...applicationState, meta: { ...applicationState.meta, isFetching: true } });
    const response = await createReservation({ serverUrl }, apiProps) as CreateReservationSuccessResponse;
    setApplicationState({ ...applicationState, meta: { ...applicationState.meta, isFetching: false } });
    return { ...response, calendarId: selectedCalendarId };
};

export const reFetchBaseData = () => async ({ applicationState, setApplicationState }: WithApplicationState) => {
    const serverUrl = applicationState.apiConfiguration?.serverUrl;
    const shopId = applicationState.apiConfiguration?.shopId;
    if (serverUrl && shopId) {
        const response = await fetchBase({ applicationState, setApplicationState });

        return setApplicationState({ ...applicationState, baseData: response, meta: { ...applicationState.meta, isModalOpen: false } });
    }
};

export const logOut = () => ({ applicationState, setApplicationState }: WithApplicationState) => {
    logOutCookie();
    setApplicationState({ ...applicationState, cookie: {} });
};

const getCustomerCookieObj = (userData: FormData, customerId: string): SignInCookieFormat => {
    const oldCookie = getCookie<SignInCookieFormat>('customerData');

    return ({
        ...oldCookie,
        ...userData,
        customerId,
    });
};

export const setLoginCookie = (formData: FormData, customerId: string) => ({ applicationState, setApplicationState }: WithApplicationState) => {
    console.log('TAK KURVA JE TU NEBO NE', { customerId });
    const cookie = getCustomerCookieObj(formData, customerId);
    console.log('CELEJ OBJ', { cookie });
    setCookie('customerData', cookie);
    setApplicationState({ ...applicationState, cookie, meta: { ...applicationState.meta, isModalOpen: false } });
};

export const setWeekDiffFilter = (add: boolean = false) => ({ applicationState, setApplicationState }: WithApplicationState) => {
    const { dateFrom: df, dateTo: dt } = applicationState.filter;
    const { dateFrom, dateTo } = getWeekDiffRange({ dateFrom: df, dateTo: dt }, add);
    setApplicationState({ ...applicationState, meta: { ...applicationState.meta, isFetching: true } });
    fetchBase({ applicationState, setApplicationState }).then((baseData) => {
        setApplicationState({ ...applicationState, baseData, filter: { ...applicationState.filter, dateFrom, dateTo }, meta: { ...applicationState.meta, isFetching: false } });
    });
};
