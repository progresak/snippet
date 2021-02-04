export * from './dates';

const getPath = (path: string | string[]): string => {
    const pathArray = Array.isArray(path) ? path : path.split('.').filter((key) => key);
    const pathArrayFlat = pathArray.flatMap((part) => (typeof part === 'string' ? part.split('.') : part));

    return pathArrayFlat;
};
export const getProp = <T extends object>(object: T, path: string | string[], value = undefined) => {
    const pathArrayFlat = getPath(path);

    return pathArrayFlat.reduce((obj, key) => obj && obj[key], object) || value;
};

export const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

export const uniqueArrayOfObjects = <T>(arr: T, key = 'id') => (Array.isArray(arr) ? arr.filter((v, i, a) => a.findIndex((t) => (t[key] === v[key])) === i) : []);

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export const uniqueArray = <T>(arr: T) => (Array.isArray(arr) ? arr.filter(onlyUnique) : []);

export const findByKey = <T, V>(array: T[], value: V, key = 'id') => { // TODO - neresi vice ID, bere jen prvni
    const foundItem = array.filter((obj) => obj[key] === value);
    if (foundItem.length) {
        return foundItem[0];
    }
    return undefined;
};

export const groupBy = (arr, key) => (arr || []).reduce((acc, x = {}) => ({
    ...acc,
    [x[key]]: [...acc[x[key]] || [], x],
}), {});

export const isEmptyObject = <T>(obj:T): boolean => Object.keys(obj).length === 0 && obj.constructor === Object;
