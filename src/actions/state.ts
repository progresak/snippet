import { WithApplicationState } from '../types';

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
