import { FetchBaseResponse, FetchSubjectDataResponse } from '../types';

const getSubjectUrl = ({ serverUrl, subjectAlias }: WithServerUrl & WithSubjectAlias) => `${serverUrl}subject/${subjectAlias}`;
const getLessonsUrl = ({ serverUrl, shopId }: WithServerUrl & WithShopId) => `${serverUrl}shop/group?shopId=${shopId}`;
const getReserveUrl = ({ serverUrl }: WithServerUrl) => `${serverUrl}group`;

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

export const fetchBase = async ({ shopId, serverUrl }: WithServerUrl & WithShopId) => await getHttp<FetchBaseResponse>(getLessonsUrl({ shopId, serverUrl }));

export const fetchSubjectData = async ({ serverUrl, subjectAlias }: WithServerUrl & WithSubjectAlias) => getHttp<FetchSubjectDataResponse>(getSubjectUrl({ serverUrl, subjectAlias }));

export interface CreateReservationProps extends FormData {
    calendarId: string;
    capacity: number;
    note: string;
}
export interface CreateReservationSuccessResponse {
    message: string;
    capacity: number;
}
export interface CreateReservationErrorResponse {
    error: string;
}
export type CreateReservationResponse = CreateReservationSuccessResponse | CreateReservationErrorResponse;
export const createReservation = async ({ serverUrl }: WithServerUrl, props: CreateReservationProps) => getHttp<CreateReservationResponse>(getReserveUrl({ serverUrl }), 'post', props);
