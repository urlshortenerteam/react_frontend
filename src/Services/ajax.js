export const hostUrl = "http://localhost:4000";
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
