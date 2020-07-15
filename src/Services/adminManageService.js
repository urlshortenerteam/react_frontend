import { getRequest } from "./ajax";
import { message } from "antd";

export const getAllUser = (callback) => {
    const url = `/getAllUser`;
    getRequest(url, callback);
};
