import { postRequest } from "./ajax";

export const getBatchOneToOne = (data, callback) => {
    const url = `/getShort`;
    postRequest(url, data, callback, {
        errorCallback: () => {},
        params: { id: 1 },
    });
};

export const getBatchManyToOne = (data, callback) => {
    const url = `/getOneShort`;
    postRequest(url, data, callback, {
        errorCallback: () => {},
        params: { id: 1 },
    });
};
