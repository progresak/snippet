import { WithApplicationState } from '../types';
import { createReservation, CreateReservationProps, fetchBase } from './index';

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

export const sendReservation = (formData: FormData) => ({ applicationState }: WithApplicationState) => {
    const serverUrl = applicationState.apiConfiguration?.serverUrl;
    const selectedCalendarId = applicationState.meta?.reservationWorkoutId;

    if (!selectedCalendarId || !serverUrl) {
        return;
    }
    const apiProps: CreateReservationProps = {
        calendarId: selectedCalendarId,
        note: '',
        capacity: 1,
        ...formData,
    };

    return createReservation({ serverUrl }, apiProps);
};

export const reFetchBaseData = () => async ({ applicationState, setApplicationState }: WithApplicationState) => {
    const serverUrl = applicationState.apiConfiguration?.serverUrl;
    const shopId = applicationState.apiConfiguration?.shopId;
    if (serverUrl && shopId) {
        const response = await fetchBase({ serverUrl, shopId });

        setApplicationState({ ...applicationState, baseData: response, meta: { ...applicationState.meta, isModalOpen: false } });
    }
};
