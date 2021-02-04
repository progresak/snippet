export const setCookie = (cname: string, cvalue: object, exdays = 7) => {
    const d = new Date();
    const base64obj = btoa(JSON.stringify(cvalue));
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${base64obj};${expires};path=/`;

    return cvalue;
};

export const getCookie = <T>(cname:string): T => {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            const maybeCookie = c.substring(name.length, c.length);
            return JSON.parse(atob(maybeCookie));
        }
    }
    // @ts-ignore
    return {};
};

export const logOutCookie = (cname: string = 'customerData') => {
    document.cookie = `${cname}=;deleted;expires = Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};
