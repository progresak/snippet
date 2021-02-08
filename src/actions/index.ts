import { ApplicationState, FetchBaseResponse, FetchSubjectDataResponse, WithApplicationState } from '../types';

interface WithFromToCustomerId {
    from: string;
    to: string
    customerId?: string;
}
const getSubjectUrl = ({ serverUrl, subjectAlias }: WithServerUrl & WithSubjectAlias) => `${serverUrl}subject/${subjectAlias}`;
const getLessonsUrl = ({ serverUrl, shopId, from, to, customerId }: WithServerUrl & WithShopId & WithFromToCustomerId) => `${serverUrl}shop/group?shopId=${shopId}${from ? `&from=${from}` : ''}${to ? `&to=${to}` : ''}${customerId ? `&customerId=${customerId}` : ''}`;
const getReserveUrl = ({ serverUrl, customerId }: WithServerUrl & { customerId: string }) => `${serverUrl}group${customerId ? `?customerId=${customerId}` : ''}`;

interface WithServerUrl {
    serverUrl: string;
}
interface WithShopId {
    shopId: string;
}
interface WithSubjectAlias {
    subjectAlias: string;
}
export async function getHttp<T>(request: string, method: 'get' | 'post' = 'get', content = undefined): Promise<T> {
    const response = await fetch(request, { method, body: JSON.stringify(content) });
    return response.json();
}

export const fetchBase = async ({ applicationState: { apiConfiguration, filter, cookie } }: WithApplicationState) => {
    if (!apiConfiguration || !filter) {
        return Promise.reject();
    }
    const to = filter.dateTo.toISOString();
    const from = filter.dateFrom.toISOString();
    const customerId = cookie?.customerId;
    // const to = '2021-02-07T00:00:00.000Z';
    // const from = '2021-02-01T00:00:00.000Z';
    const { shopId, serverUrl }: WithServerUrl & WithShopId = apiConfiguration;
    return getHttp<FetchBaseResponse>(getLessonsUrl({ shopId, serverUrl, from, to, customerId }));
};

export const fetchSubjectData = async ({ applicationState: { apiConfiguration } } : WithApplicationState) => {
    if (!apiConfiguration) {
        return Promise.reject();
    }
    const { serverUrl, subjectAlias }: WithServerUrl & WithSubjectAlias = apiConfiguration;
    return getHttp<FetchSubjectDataResponse>(getSubjectUrl({ serverUrl, subjectAlias }));
};

export interface CreateReservationProps extends FormData {
    calendarId: string;
    customerId?: string;
    capacity: number;
    note: string;
}
export interface CreateReservationSuccessResponse {
    message: string;
    capacity: number;
    customerId: string;
}

export interface CreateReservationErrorResponse {
    error: string;
}

export type CreateReservationResponse = CreateReservationSuccessResponse | CreateReservationErrorResponse;
export const createReservation = async ({ serverUrl }: WithServerUrl, props: CreateReservationProps) => getHttp<CreateReservationResponse>(getReserveUrl({ serverUrl }), 'post', props);
