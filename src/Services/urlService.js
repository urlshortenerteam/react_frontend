import { getRequest, postRequest } from "./ajax";

/**
 * BanUrl
 * @author Zhuohao Shen <ao7777@sjtu.edu.cn>
 * @date July 15th 2020
 * @description post a ban request of url to server
 * @param {Object} parameters
 * @param {string} parameters.url - The short url being banned
 * @param {function} parameters.callback - The callback for successful return
 * @param {function} parameters.errorCallback - The callback for errors
 * */
let BanUrl = ({ url, callback, errorCallback }) => {
    postRequest("/editUrl", "BANNED", callback, {
        errorCallback: errorCallback,
        params: {
            id:sessionStorage.getItem("user")? JSON.parse(sessionStorage.getItem("user")).id:null,
            shortUrl: url,
        },
    });
};
/**
 * EditUrl
 * @author Zhuohao Shen <ao7777@sjtu.edu.cn>
 * @date July 15th 2020
 * @description post an edit request to server
 * @param {Object} parameters
 * @param {string} parameters.url - The short url
 * @param {string} parameters.newLong - The new long url
 * @param {function} parameters.callback - The callback for successful return
 * @param {function} parameters.errorCallback - The callback for errors
 * */
let EditUrl = ({ url, newLong, callback, errorCallback }) => {
    console.log(newLong);
    console.log(url);
    postRequest("/editUrl", newLong, callback, {
        errorCallback: errorCallback,
        params: {
            id:sessionStorage.getItem("user")? JSON.parse(sessionStorage.getItem("user")).id:null,
            shortUrl: url,
        },
    });
};
/**
 * LiftUrl
 * @author Zhuohao Shen <ao7777@sjtu.edu.cn>
 * @date July 16th 2020
 * @description post a lift request of url to server
 * @param {Object} parameters
 * @param {string} parameters.url - The short url being lifted
 * @param {function} parameters.callback - The callback for successful return
 * @param {function} parameters.errorCallback - The callback for errors
 * */
let LiftUrl = ({ url, callback, errorCallback }) => {
    postRequest("/editUrl", "LIFT", callback, {
        errorCallback: errorCallback,
        params: {
            id:sessionStorage.getItem("user")? JSON.parse(sessionStorage.getItem("user")).id:null,
            shortUrl: url,
        },
    });
};
/**
 * GetUrl
 * @author Zhuohao Shen <ao7777@sjtu.edu.cn>
 * @date July 16th 2020
 * @description get stats of a url from server
 * @param {Object} parameters
 * @param {string} parameters.url - The short url to be gotten
 * @param {function} parameters.callback - The callback for successful return
 * @param {function} parameters.errorCallback - The callback for errors
 * */
let GetUrl = ({ url, callback, errorCallback }) => {
    getRequest("/getShortStat", callback, {
        errorCallback: errorCallback,
        params: {
            id:sessionStorage.getItem("user")? JSON.parse(sessionStorage.getItem("user")).id:null,
            short: url,
        },
    });
};

export { BanUrl, EditUrl, LiftUrl, GetUrl };
