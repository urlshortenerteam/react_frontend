import { getRequest } from "./ajax";

export const getAllUser = (callback) => {
    const url = `/getUserStat`;
    getRequest(url, callback, {
        errorCallback: (error) => {
            console.log(error);
        },
        params: {},
    });
};

export const banUser = (ban, ban_id, callback) => {
    const url = `/banUser`;
    getRequest(url, callback, {
        errorCallback: (error) => {
            console.log(error);
        },
        params: {
            id: JSON.parse(sessionStorage.getItem("userId")),
            ban_id: ban_id,
            ban: ban,
        },
    });
};

export const getTopTen = (callBack, errorHandler) => {
    getRequest("/getTopTen", callBack, {
        params: {},
        errorCallback: errorHandler,
    });
};

export const getAllUrls = (callBack, errorHandler) => {
    getRequest("/getAllUrls", callBack, {
        params: {},
        errorCallback: errorHandler,
    });
};

export const getNumberCount = (callBack, errorHandler) => {
    getRequest("/getNumberCount", callBack, {
        params: {},
        errorCallback: errorHandler,
    });
};
