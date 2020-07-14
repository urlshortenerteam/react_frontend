import { postRequest, getRequest, deleteRequest } from "./ajax";
import {message} from 'antd'
export const register = (data, callback) => {
    const url = `/register`;
    postRequest(url, data, callback);
};

export const login = (data) => {
    console.log(data);
    const url =  "/loginReq";

    const callback = (res) => {
        if(res.data.loginStatus) {
            sessionStorage.setItem('userId', JSON.stringify(res.data.id));
            sessionStorage.setItem('loginStatus',1);
            sessionStorage.setItem('type',JSON.stringify(res.data.type));
            // localStorage.setItem('user', JSON.stringify(data.data));
            console.log( sessionStorage.getItem("userId"));
            console.log( sessionStorage.getItem("loginStatus"));
            // history.push("/");


            message.success("登录成功");

            // message.success(JSON.parse(localStorage.getItem("user")).userId);

            window.location.href="/";
            // +JSON.parse(localStorage.getItem("user")).userId;

        }
        else{
            if(res.data.type===1)
            {
                message.error("用户名或密码错误")
            }
            else if(res.data.type===2)
            {
                message.error("您已被禁用")
            }
            else{
                message.error("登录失败");

            }

        }
    };
    postRequest(url,data,callback);
};


export const logout = () => {
    const url = `/logoutReq`;
     const callback = (res) => {

        if(res.data.status ===true) {
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("loginStatus");
            sessionStorage.removeItem("type");


            window.location.href="/";
            message.success("成功登出");
        }
        else{
            message.error("登出失败");
        }
    };
    postRequest(url, {}, callback);
};
