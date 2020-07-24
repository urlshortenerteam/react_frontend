/**
 * hostUrl
 * @constant
 * @type string
 * @default http://localhost:4000
 * */
import { message } from "antd";

// export const hostUrl = "http://3.81.71.37:8080";
export const hostUrl = "http://localhost:4000";
// export const hostUrl = "http://111.186.46.37:4000";
/**
 * postRequest
 * @author Shuchang Liu & Zhuohao Shen <ao7777@sjtu.edu.cn>
 * @description send post request to server
 * @param {string} url - the url in host server
 * @param {JSON} json - the post body
 * @param {function} callback - the callback function for successful returns
 * @param {Object} extra - extra options for request
 * @param {function} extra.errorCallback - the callback function for errors
 * @param {Object} extra.params - the parameters in url
 * */
let postRequest = (url, json, callback, { errorCallback, params }) => {
    let _url = new URL(hostUrl + url);
    _url.search = new URLSearchParams(params).toString();
    let opts = {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(sessionStorage.getItem("user"))
                ? JSON.parse(sessionStorage.getItem("user")).token
                : null,
        },
    };
    fetch(_url, opts)
        .then((response) => {
            // login timeout
            if (response.status === 404) {
                if (
                    sessionStorage.getItem("user") &&
                    JSON.parse(sessionStorage.getItem("user")).id !== null &&
                    JSON.parse(sessionStorage.getItem("user")).loginStatus !==
                        null &&
                    JSON.parse(sessionStorage.getItem("user")).type !== null &&
                    JSON.parse(sessionStorage.getItem("user")).token !== null &&
                    JSON.parse(sessionStorage.getItem("user")).refreshToken !==
                        null
                ) {
                    resetToken(url, json, callback, true, false, {
                        errorCallback: errorCallback,
                        params: params,
                    });
                } else {
                    if (sessionStorage.getItem("user")) {
                        sessionStorage.removeItem("user");
                    }
                    window.location.href = "/login";
                    message.error("非法访问2");
                }
                return response;
            } else {
                return response.json();
            }
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            errorCallback(error);
            console.log(error);
        });
};

/**
 * resetToken
 * @author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
 * @description refresh time and send the request again
 * @param {string} url - the url in host server
 * @param {JSON} json - the post body , if it's a get request ,be { }
 * @param {function} callback - the callback function for successful returns
 * @param {boolean} post - postReq or getReq
 * @param {boolean} session - if it's checkSession
 * @param extra
 * @param {function} extra.errorCallback - the callback function for errors
 * @param {Object} extra.params - the parameters in url
 * */
let resetToken = (
    url,
    json,
    callback,
    post,
    session,
    { errorCallback, params }
) => {
    let _url = new URL(hostUrl + "/refresh");
    _url.search = new URLSearchParams(params).toString();
    let opts = {
        method: "POST",
        body: JSON.stringify({
            refresh: JSON.parse(sessionStorage.getItem("user"))
                ? JSON.parse(sessionStorage.getItem("user")).refreshToken
                : null,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    };
    fetch(_url, opts)
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            console.log(res);

            // successfully renew time
            if (res.success) {
                message.success("续费成功");
                sessionStorage.setItem("user", JSON.stringify(res.data));
                // send post request again
                if (post) {
                    postRequest(url, json, callback, {
                        errorCallback: errorCallback,
                        params: params,
                    });
                }
                //send get request again
                else if (!session) {
                    getRequest(url, callback, {
                        errorCallback: errorCallback,
                        params: params,
                    });
                } else {
                    getRequest_checkSession(url, callback, {
                        errorCallback: errorCallback,
                        params: params,
                    });
                }
            }
            // fail to renew time
            else {
                sessionStorage.removeItem("user");
                window.location.href = "/login";
                message.error("请重新登录");
            }
        })
        .catch((error) => {
            errorCallback(error);
            console.log(error);
        });
};

/**
 * getRequest
 * @author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
 * @description send get request to server
 * @param {string} url - the url in host server
 * @param {function} callback - the callback function for successful returns
 * @param extra
 * @param {function} extra.errorCallback - the callback function for errors
 * @param {Object} extra.params - the parameters in url
 * */
let getRequest = (url, callback, { errorCallback, params }) => {
    let _url = new URL(hostUrl + url);
    _url.search = new URLSearchParams(params).toString();
    let opts = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(sessionStorage.getItem("user"))
                ? JSON.parse(sessionStorage.getItem("user")).token
                : null,
        },
    };

    fetch(_url, opts)
        .then((response) => {
            // login timeout
            if (response.status === 404) {
                // 404 case 2 : timeout
                if (
                    sessionStorage.getItem("user") &&
                    JSON.parse(sessionStorage.getItem("user")).id !== null &&
                    JSON.parse(sessionStorage.getItem("user")).loginStatus !==
                        null &&
                    JSON.parse(sessionStorage.getItem("user")).type !== null &&
                    JSON.parse(sessionStorage.getItem("user")).token !== null &&
                    JSON.parse(sessionStorage.getItem("user")).refreshToken !==
                        null
                ) {
                    resetToken(url, {}, callback, false, false, {
                        errorCallback: errorCallback,
                        params: params,
                    });
                } else {
                    if (sessionStorage.getItem("user")) {
                        sessionStorage.removeItem("user");
                    }
                    window.location.href = "/login";
                    message.error("非法访问1");
                }
                return response;
            } else {
                return response.json();
            }
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            errorCallback(error);
            console.log(error);
        });
};

/**
 * getRequest_checkSession
 * @author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
 * @description send get request to server , used for  checkSession
 * @param {string} url - the url in host server
 * @param {function} callback - the callback function for successful returns
 * @param extra
 * @param {function} extra.errorCallback - the callback function for errors
 * @param {Object} extra.params - the parameters in url
 * */
let getRequest_checkSession = (url, callback, { errorCallback, params }) => {
    let _url = new URL(hostUrl + url);
    _url.search = new URLSearchParams(params).toString();
    let opts = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(sessionStorage.getItem("user"))
                ? JSON.parse(sessionStorage.getItem("user")).token
                : null,
            // "Cache-Control": "no-cache"
        },
    };

    fetch(_url, opts)
        .then((response) => {
            if (response.status !== 200) {
                // 404 case 1 : illegal visit
                if (
                    sessionStorage.getItem("user") &&
                    JSON.parse(sessionStorage.getItem("user")).id !== null &&
                    JSON.parse(sessionStorage.getItem("user")).loginStatus !==
                        null &&
                    JSON.parse(sessionStorage.getItem("user")).type !== null &&
                    JSON.parse(sessionStorage.getItem("user")).token !== null &&
                    JSON.parse(sessionStorage.getItem("user")).refreshToken !==
                        null
                ) {
                    errorCallback();
                }

                // 404 case 2 : timeout
                else {
                    resetToken(url, {}, callback, false, true, {
                        errorCallback: errorCallback,
                        params: params,
                    });
                }
            }
            return response;
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
            errorCallback(error);
        });
};

export { postRequest, getRequest, getRequest_checkSession };
