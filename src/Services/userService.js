import { getRequest, postRequest } from "./ajax";
import { message } from "antd";

/**
 * register
 * @author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
 * @date July 10th 2020
 * @description register
 * @param data - { name:String , password:String , email:String }
 * @param callback - The callback for successful return
 * @param errorHandler - The callback for errors
 * */
export const register = (data, callback, errorHandler) => {
    const url = `/register`;
    postRequest(url, data, callback, {
        errorCallback: errorHandler,
        params: {},
    });
};

/**
 * login
 * @author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
 * @date July 10th 2020
 * @description login request to get the token , and set the sessionStorage
 * @param data - { name: String , password: String }
 * */
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
            console.log(res.data);

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

/**
 * logout
 * @author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
 * @date July 10th 2020
 * @description logout , and remove the sessionStorage
 * */
export const logout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("loginStatus");
    sessionStorage.removeItem("type");
    sessionStorage.removeItem("token");
    message.success("成功登出");
    window.location.href = "/";

    //used for mock
    postRequest("/logoutReq", {}, {}, { errorCallback: {}, params: {} });
};

/**
 * checkSession
 * @author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
 * @date July 10th 2020
 * @description checkSession when checkout
 * */
export const checkSession = (callback, errorCallback) => {
    const url = `/checkSession`;
    getRequest(url, callback, {
        errorCallback: errorCallback,
        params: {},
    });
};
