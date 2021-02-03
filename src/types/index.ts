import { CalendarState } from '../enums';

export interface ApplicationState {
    apiConfiguration?: SnippetConfiguration;
    meta?: {
        isInitialized: boolean;
        isModalOpen: boolean;
        isFetching: boolean;
        reservationWorkoutId?: string;
    }
    filter: {
        selectedWorkoutId: string | undefined,
        selectedLectorId: string | undefined,
    }
    baseData: FetchBaseResponse;
    subjectData: FetchSubjectDataResponse;
}
export interface FormData {
    name: string;
    surname: string;
    phone: string;
    email: string;
}
export interface WithApplicationState {
    applicationState: ApplicationState;
    setApplicationState: (t:any) => void;
}

export interface Address {
    id: string;
    city: string;
    street: string;
    zip: string;
}

export interface Cart {
    name: string;
    note: string;
    pictureUrl: string;
    priceVat: number;
}

export interface MyFoxUser {
    id: string;
    name: string;
    pictureUrl: string;
    surname: string;
}

export interface Employee {
    id: string;
    receiptName: string;
    userMyFox: MyFoxUser;
}

export interface Calendar {
    id: string;
    from: string;
    to: string;
    capacity: number;
    capacityBooked: number;
    carts: Array<Cart>;
    customers: Array<unknown>
    duration: number; // in minutes
    employees: Array<Employee>;
    note: string;
    priceVatTotal: number;
    state: CalendarState; // could be ENUM
}

interface MyFoxShop {
    id: string;
    name: string;
    snippetBookFrom: number;
    snippetBookTo: number;
}

interface MyFoxSubjectToShop {
    id: string;
    shop: MyFoxShop;
}
interface MyFoxSubject {
    id: string;
    subjectsToShops: Array<MyFoxSubjectToShop>
}
export interface MyFoxInstance {
    subjects: Array<MyFoxSubject>;
}

interface SnippetLogo {
    secret: string;
    url: string;
}
export interface MyFoxMicroSite {
    id: string;
    publishSnippet: boolean;
    snippetBackground: string | null;
    snippetButtonColor: string; // hex
    snippetButtonLink: string;
    snippetButtonText: string;
    snippetColor: string;
    snippetLogo: SnippetLogo;
    snippetNoteLabel: string | null;
    snippetNotePlaceholder: string | null;
    snippetNoteRequired: boolean;
    snippetStaffSelect: boolean;
}

export interface SnippetConfiguration {
    shopId: string;
    serverUrl: string;
    subjectAlias: string;
}

export interface FetchSubjectDataResponse {
    currency: string;
    locale: string;
    marketingName: string;
    name: string;
    mfInstance: MyFoxInstance;
    microsite: MyFoxMicroSite;
}

export interface FetchBaseResponse {
    id: string;
    name: string;
    openOnHoliday: boolean;
    phone: string;
    timezone: string;
    currency: string;
    displayPrices: boolean;
    address: Address;
    calendars: Calendar[];
}

export interface WithId {
    id: string;
}
