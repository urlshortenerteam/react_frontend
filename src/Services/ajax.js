/**
 * hostUrl
 * @constant
 * @type string
 * @default http://localhost:4000
 * */
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
            console.log(response.status === 404);
            if (response.status === 404) {
                if (
                    JSON.parse(sessionStorage.getItem("user")) !== null &&
                    JSON.parse(sessionStorage.getItem("user")).loginStatus
                ) {
                    resetToken(url, json, callback, {
                        errorCallback: errorCallback,
                        params: params,
                    });
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

let resetToken = (url, json, callback, { errorCallback, params }) => {
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
            // login timeout
            return response.json();
        })
        .then((res) => {
            console.log(res);
            if (res.success) {
                sessionStorage.setItem("user", JSON.stringify(res.data));
                console.log(url);
                postRequest(url, json, callback, {
                    errorCallback: errorCallback,
                    params: params,
                });
            } else {
                sessionStorage.removeItem("user");
                window.location.href = "/login";
            }
        })
        .catch((error) => {
            errorCallback(error);
            console.log(error);
        });
};

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
                if (
                    JSON.parse(sessionStorage.getItem("uesr")) !== null &&
                    JSON.parse(sessionStorage.getItem("uesr")).loginStatus
                ) {
                    resetToken(url, json, callback, {
                        errorCallback: errorCallback,
                        params: params,
                    });
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
            console.log(error);
            errorCallback(error);
        });
};

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
        },
    };

    fetch(_url, opts)
        .then((response) => {
            if (response.status !== 200) {
                errorCallback();
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

let deleteRequest = (url, callback) => {
    fetch(hostUrl + url, { method: "DELETE" })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

export { postRequest, getRequest, deleteRequest, getRequest_checkSession };
