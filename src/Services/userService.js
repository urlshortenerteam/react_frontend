import { postRequest, getRequest } from "./ajax";
import { message } from "antd";

export const register = (data, callback) => {
    const url = `/register`;
    postRequest(url, data, callback);
};

export const login = (data) => {
    console.log(data);
    const url = "/loginReq";

    const callback = (res) => {
        if (res.data.loginStatus) {
            sessionStorage.setItem("userId", JSON.stringify(res.data.id));
            sessionStorage.setItem("loginStatus", 1);
            sessionStorage.setItem("type", JSON.stringify(res.data.type));
            sessionStorage.setItem("token", JSON.stringify(res.data.token));
            // localStorage.setItem('user', JSON.stringify(data.data));
            console.log(sessionStorage.getItem("userId"));
            console.log(sessionStorage.getItem("loginStatus"));
            // history.push("/");

            message.success("登录成功");
            window.location.href = "/";
        } else {
            if (res.data.type === 1) {
                message.error("用户名或密码错误");
            } else if (res.data.type === 2) {
                message.error("您已被禁用");
            } else {
                message.error("登录失败");
            }
        }
    };
    postRequest(url, data, callback, {
        errorCallback: () => {},
    });
};

export const logout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("loginStatus");
    sessionStorage.removeItem("type");
    sessionStorage.removeItem("token");
    message.success("成功登出");
    window.location.href = "/";
};

export const checkSession = (callback, errorCallback) => {
    const url = `/checkSession`;
    getRequest(url, callback, {
        errorCallback: errorCallback,
        params: {},
    });
};
