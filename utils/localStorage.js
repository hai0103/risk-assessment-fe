
export function storeData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getDataLocal(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
}

export function removeDataLocal(key) {
    if (typeof localStorage !== 'undefined') {
        return localStorage.removeItem(key);
    }
}
