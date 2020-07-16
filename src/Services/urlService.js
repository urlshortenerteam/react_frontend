import { postRequest } from "./ajax";

let BanUrl = ({ url, callback, errorCallback }) => {
    postRequest("/editUrl", "BANNED", callback, {
        errorCallback: errorCallback,
        params: { id: 1, shortUrl: url },
    });
};
let EditUrl = ({ url, newLong, callback, errorCallback }) => {
    postRequest("/editUrl", newLong, callback, {
        errorCallback: errorCallback,
        params: { id: 1, shortUrl: url },
    });
};
export { BanUrl, EditUrl };
