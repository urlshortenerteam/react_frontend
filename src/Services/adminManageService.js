import { getRequest } from "./ajax";

export const getAllUser = (callback) => {
    const url = `/getAllUser`;
    getRequest(url, callback);
};