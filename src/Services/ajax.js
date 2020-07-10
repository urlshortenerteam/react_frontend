let postRequest = (url, json, callback) => {

    let opts = {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
                // 'text/plain'
        //    'application/json'
        },

    };
    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};


let getRequest = (url, callback,{errorCallback,params}) => {
    let _url=new URL(url);
    _url.search=new URLSearchParams(params).toString();
    fetch(_url)
        .then((response) => {
            return response.json()
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

    fetch(url,{method: "DELETE"})
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

export {postRequest,getRequest,deleteRequest};
