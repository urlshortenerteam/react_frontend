import { postRequest, getRequest_checkSession } from "./ajax";
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
    postRequest("/register", data, callback, {
        errorCallback: errorHandler,
    });
};

/**
 * login
 * @author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
 * @date July 10th 2020
 * @description login request to get the token , and set the sessionStorage
 * @param data - { name: String , password: String }
 * @param callback
 * */
export const login = (data, callback) => {
    console.log(data);

    postRequest("/loginReq", data, callback, {
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
    if (sessionStorage.getItem("user")) {
        sessionStorage.removeItem("user");
    }

    // sessionStorage.removeItem("loginStatus");
    // sessionStorage.removeItem("type");
    // sessionStorage.removeItem("token");
    message.success("成功登出");
    window.location.href = "/";

    //used for mock
    // postRequest("/logoutReq", {}, {}, { errorCallback: {} });
};

/**
 * checkSession
 * @author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
 * @date July 10th 2020
 * @description checkSession when checkout
 * */
export const checkSession = (callback, errorCallback) => {
    const url = `/checkSession`;
    getRequest_checkSession(url, callback, {
        errorCallback: errorCallback,
        params: {},
    });
};
