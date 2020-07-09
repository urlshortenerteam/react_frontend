
import {postRequest,getRequest,deleteRequest} from "./ajax";


export const getBatchOneToOne=(data,callback)=>{
    const url = `http://localhost:4000/getShort`;
    postRequest(url, data,callback);
    // getRequest(url,callback);
};

export const getBatchManyToOne=(data,callback)=>{
    const url = `http://localhost:4000/getOneShort`;
    postRequest(url, data,callback);
    // getRequest(url,callback,{
    //     params:{id:0},
    //     errorCallback:{}
    // });
};
