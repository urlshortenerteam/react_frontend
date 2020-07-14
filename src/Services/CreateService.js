import { postRequest, getRequest, deleteRequest } from "./ajax";


export const getBatchOneToOne=(data,callback)=>{
    const url = `/getShort?id=1`;
    postRequest(url, data,callback);
};

export const getBatchManyToOne=(data,callback)=>{
    const url = `/getOneShort?id=1`;
    postRequest(url, data,callback);
};
