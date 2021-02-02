import { Address, Calendar, FetchBaseResponse, FetchSubjectDataResponse, MyFoxInstance, MyFoxMicroSite } from '../types';

// const subjectAlias = 'rpsii';
// const shopId = 'ckc8qkw3shoxb0a83yhqp3rsv'; // dynamicly from config
// const serverUrl = 'https://api.myfox.cz/dev-microsite/snippet/';

const getSubjectUrl = ({ serverUrl, subjectAlias }: {serverUrl: string, subjectAlias: string}) => `${serverUrl}subject/${subjectAlias}`;
const getLssonsUrl = ({ serverUrl, shopId }: {serverUrl: string, shopId: string}) => `${serverUrl}shop/group?shopId=${shopId}`;

export async function http<T>(
    request: string,
): Promise<T> {
    const response = await fetch(request);
    const body = await response.json();
    return body;
}

export const fetchBase = async ({ shopId, serverUrl }) => {
    try {
        return await http<FetchBaseResponse>(getLssonsUrl({ shopId, serverUrl }));
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const fetchSubjectData = async ({ serverUrl, subjectAlias }) => http<FetchSubjectDataResponse>(getSubjectUrl({ serverUrl, subjectAlias }));
