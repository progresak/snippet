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

export const closeModal = () => ({ getState, setApplicationState }:WithApplicationState) => {
    const applicationState = getState();
    const newState = { ...applicationState, meta: { ...applicationState.meta, isModalOpen: false, reservationWorkoutId: undefined } } as ApplicationState;
    setApplicationState(newState);
    return getState();
};

export const openModalWithId = (calendarId: string) => ({ setApplicationState, getState }:WithApplicationState) => {
    const applicationState = getState();
    const newState = { ...applicationState, meta: { ...applicationState.meta, isModalOpen: true, reservationWorkoutId: calendarId } } as ApplicationState;
    setApplicationState(newState);
    return getState();
};

export interface SendReservationResponse extends CreateReservationSuccessResponse {
    calendarId: string;
}

export const sendReservation = (formData: FormData) => async ({ setApplicationState, getState }: WithApplicationState): Promise<SendReservationResponse> => {
    const applicationState = getState();
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
    setApplicationState({ ...getState(), meta: { ...getState().meta, isFetching: true } });
    const response = await createReservation({ serverUrl }, apiProps) as CreateReservationSuccessResponse;
    setApplicationState({ ...getState(), meta: { ...getState().meta, isFetching: false } });
    return { ...response, calendarId: selectedCalendarId };
};

export const reFetchBaseData = () => async ({ setApplicationState, getState }: WithApplicationState) => {
    const state = getState();
    const serverUrl = state.apiConfiguration?.serverUrl;
    const shopId = state.apiConfiguration?.shopId;
    if (serverUrl && shopId) {
        const response = await fetchBase({ applicationState: state, setApplicationState, getState });

        return setApplicationState({ ...state, baseData: response, meta: { ...state.meta } });
    }
};

export const logOut = () => ({ getState, setApplicationState }: WithApplicationState) => {
    logOutCookie();
    setApplicationState({ ...getState(), cookie: {} });
};

const getCustomerCookieObj = (userData: FormData, customerId: string): SignInCookieFormat => {
    const oldCookie = getCookie<SignInCookieFormat>('customerData');

    return ({
        ...oldCookie,
        ...userData,
        customerId,
    });
};

export const setLoginCookie = (formData: FormData, customerId: string) => ({ getState, setApplicationState }: WithApplicationState) => {
    const cookie = getCustomerCookieObj(formData, customerId);
    setCookie('customerData', cookie);
    return setApplicationState({ ...getState(), cookie });
};

export const setWeekDiffFilter = (add: boolean = false) => ({ getState, setApplicationState }: WithApplicationState) => {
    const applicationState = getState();
    const { dateFrom: df, dateTo: dt } = applicationState.filter;
    const { dateFrom, dateTo } = getWeekDiffRange({ dateFrom: df, dateTo: dt }, add);
    setApplicationState({ ...applicationState, meta: { ...applicationState.meta, isFetching: true } });
    fetchBase({ applicationState, setApplicationState, getState }).then((baseData) => {
        setApplicationState({ ...applicationState, baseData, filter: { ...applicationState.filter, dateFrom, dateTo }, meta: { ...applicationState.meta, isFetching: false } });
    });
};

export const changeLanguage = (lng: string) => ({ getState, setApplicationState }: WithApplicationState) => {
    setApplicationState({ ...getState(), selectedLanguage: lng });
    window.localStorage.selectedLanguage = lng;
};
