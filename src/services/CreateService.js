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
            import("antd").then(({ message }) => {
                message.error(error.toString());
            });
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
            import("antd").then(({ message }) => {
                message.error(error.toString());
            });
        },
    });
};
