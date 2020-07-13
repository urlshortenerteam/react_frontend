import { postRequest, getRequest, deleteRequest } from "./ajax";

export const register = (data, callback) => {
    const url = `/register`;
    postRequest(url, data, callback);
};
