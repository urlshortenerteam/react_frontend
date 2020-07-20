import { getRequest } from "./ajax";

/**
 * getAllUser
 * @author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
 * @date July 10th 2020
 * @description get all user for admin statistic
 * @param callback - The callback for successful return
 * */
export const getAllUser = (callback) => {
    const url = `/getUserStat`;
    getRequest(url, callback, {
        errorCallback: (error) => {
            console.log(error);
        },
        params: {},
    });
};

/**
 * banUser
 * @author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
 * @date July 10th 2020
 * @description ban the user
 * @param ban - boolean - if(ban)ban the user; else lift the ban
 * @param ban_id - the id of the user being banned.
 * @param callback - The callback for successful return
 * */
export const banUser = (ban, ban_id, callback) => {
    const url = `/banUser`;
    getRequest(url, callback, {
        errorCallback: (error) => {
            console.log(error);
        },
        params: {
            id: JSON.parse(sessionStorage.getItem("userId")),
            ban_id: ban_id,
            ban: ban,
        },
    });
};

/**
 * getTopTen
 * @author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
 * @date July 10th 2020
 * @description get the top ten shortUrl's information
 * @param callBack - The callback for successful return
 * @param errorHandler - The callback for errors
 * */
export const getTopTen = (callBack, errorHandler) => {
    getRequest("/getTopTen", callBack, {
        params: {},
        errorCallback: errorHandler,
    });
};

/**
 * getAllUrls
 * @author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
 * @date July 16th 2020
 * @description get all the url info for AdminStatistic
 * @param callBack - The callback for successful return
 * @param errorHandler - The callback for errors
 * */
export const getAllUrls = (callBack, errorHandler) => {
    getRequest("/getAllUrls", callBack, {
        params: {},
        errorCallback: errorHandler,
    });
};

/**
 * getNumberCount
 * @author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
 * @date July 17th 2020
 * @description get  userCount, shortUrlCount, visitCountTotal, shortUrl
 * @param callBack - The callback for successful return
 * @param errorHandler - The callback for errors
 * */
export const getNumberCount = (callBack, errorHandler) => {
    getRequest("/getNumberCount", callBack, {
        params: {},
        errorCallback: errorHandler,
    });
};
