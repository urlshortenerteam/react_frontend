/**
 * hostUrl
 * @constant
 * @type string
 * @default http://localhost:4000
 * */
export const hostUrl = "http://localhost:4000";

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
            Authorization: JSON.parse(sessionStorage.getItem("token")),
        },
    };
    fetch(_url, opts)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            errorCallback(error);
            console.log(error);
        });
};

let getRequest = (url, callback, { errorCallback, params }) => {
    let _url = new URL(hostUrl + url);
    _url.search = new URLSearchParams(params).toString();
    fetch(_url)
        .then((response) => {
            return response.json();
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

export { postRequest, getRequest, deleteRequest };
