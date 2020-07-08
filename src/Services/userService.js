import {postRequest,getRequest,deleteRequest} from "./ajax";

export const register=(data,callback)=>{
    const url = `http://localhost:8080/register`;
    postRequest(url, data, callback);
};
