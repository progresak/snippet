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

export const uniqueArray = <T>(arr: T, key = 'id') => arr.filter((v, i, a) => a.findIndex((t) => (t[key] === v[key])) === i);
