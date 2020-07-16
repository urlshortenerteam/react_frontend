import { postRequest } from "./ajax";

export const getBatchOneToOne = (data, callback) => {
    const url = `/getShort`;

    postRequest(url, data, callback, {
        errorCallback: (error) => {
            console.log(error);
        },
        params: { id: JSON.parse(sessionStorage.getItem("userId")) },
    });
};

export const getBatchManyToOne = (data, callback) => {
    const url = `/getOneShort`;

    postRequest(url, data, callback, {
        errorCallback: (error) => {
            console.log(error);
        },
        params: { id: JSON.parse(sessionStorage.getItem("userId")) },
    });
};
