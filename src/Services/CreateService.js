
import {postRequest,getRequest,deleteRequest} from "ajax";

export const getBatchOneToOne=(data,callback)=>{
    const url = `http://localhost:8080/getShort?id=1`;
    postRequest(url, data,callback);
};
