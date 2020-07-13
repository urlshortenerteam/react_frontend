
import {postRequest,getRequest,deleteRequest} from "./ajax";


export const getBatchOneToOne=(data,callback)=>{
    const url = `/getShort?id=1`;
    postRequest(url, data,callback);
    // getRequest(url,callback);
};

export const getBatchManyToOne=(data,callback)=>{
    const url = `/getOneShort?id=1`;
    postRequest(url, data,callback);
    // getRequest(url,callback,{
    //     params:{id:0},
    //     errorCallback:{}
    // });
};
