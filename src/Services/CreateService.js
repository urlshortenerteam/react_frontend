import { postRequest } from "./ajax";
/**
 * getBatchOneToOne
 * @author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
 * @date July 10th 2020
 * @description used in oneToOne creating
 * @param data - { [longUrl1 , longUrl2, longUrl3... ] }
 * @param callback - The callback for successful return
 * */
export const getBatchOneToOne = (data, callback) => {
    const url = `/getShort`;

    postRequest(url, data, callback, {
        errorCallback: (error) => {
            console.log(error);
        },
        params: {
            id: sessionStorage.getItem("user")
                ? JSON.parse(sessionStorage.getItem("user")).id
                : null,
        },
    });
};

/**
 * getBatchManyToOne
 * @author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
 * @date July 10th 2020
 * @description used in oneToOne creating
 * @param data - { [longUrl1 , longUrl2, longUrl3... ] }
 * @param callback - The callback for successful return
 * */
export const getBatchManyToOne = (data, callback) => {
    const url = `/getOneShort`;

    postRequest(url, data, callback, {
        errorCallback: (error) => {
            console.log(error);
        },
        params: {
            id: sessionStorage.getItem("user")
                ? JSON.parse(sessionStorage.getItem("user")).id
                : null,
        },
    });
};
