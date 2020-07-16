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
