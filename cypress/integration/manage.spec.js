describe("Manage", () => {
    beforeEach(() => {
        fakeLogin();
        stubData();
        cy.visit("/manage");
    });
    it("check if rendered properly", () => {
        cy.get("#rc-tabs-0-tab-1 > :nth-child(1)")
            .contains("我的短链接");
    });
    it("test ban & lift url", () => {
        cy.get(":nth-child(1) > .ant-list-item-main > .ant-list-item-action > :nth-child(1) > [style=\"color: white;\"]")
            .click()
            .get(".ant-btn-primary > span")
            .click()
            .get(".ant-message-custom-content > :nth-child(2)")
            .contains("禁用成功")
            .wait(2000)
            .get(":nth-child(1) > .ant-list-item-main > .ant-list-item-action > :nth-child(1) > [style=\"color: white;\"]")
            .click()
            .get(".ant-btn-primary > span")
            .click()
            .wait(500)
            .get(".ant-message-custom-content > :nth-child(2)")
            .contains("解禁成功");
    });
    it("test edit url", () => {
        cy.get(".ant-list-items > :nth-child(2)")
            .contains("编辑")
            .click()
            // .get("input:nth-child(2)")
            // .type("baidu.com",{force:true})
            // .get(".ant-select-selection-item")
            // .click()
            // .get("[aria-selected=\"false\"] > .ant-select-item-option-content")
            // .click()
            // .get(".ant-btn-primary > span")
            // .click()
            // .get(".ant-message-custom-content > :nth-child(2)")
            // .contains("编辑成功")
            // .get(".ant-list-items > :nth-child(2)")
            // .find("span")
            // .contains("https://baidu.com")
    });
});
const stubData = () => {
    cy.route({
        method: "POST",
        url: "**/editUrl?**",
        response: {
            status: 200,
            msg: "查询成功",
            data: {
                status: true
            }
        }
    });
    cy.route({
        method: "GET",
        url: "**/getStat?**",
        response: {
            status: 200,
            msg: "查询成功",
            data: [
                {
                    shortUrl: "o47Q22",
                    longUrl: [
                        { url: "https://mockjs.com/examples.html" },
                        { url: "https://www.taobao.com" }
                    ],
                    count: 43834,
                    long: "http://xihj.om/smmzh",
                    area_distr: [
                        { name: "云南省", code: 530000, value: 220 },
                        { name: "黑龙江省", code: 230000, value: 2448 },
                        { name: "贵州省", code: 520000, value: 1394 },
                        { name: "北京市", code: 110000, value: 2325 },
                        { name: "河北省", code: 130000, value: 890 },
                        { name: "山西省", code: 140000, value: 1573 },
                        { name: "吉林省", code: 220000, value: 920 },
                        { name: "宁夏回族自治区", code: 640000, value: 2129 },
                        { name: "辽宁省", code: 210000, value: 2139 },
                        { name: "海南省", code: 460000, value: 491 },
                        { name: "内蒙古自治区", code: 150000, value: 29 },
                        { name: "天津市", code: 120000, value: 1011 },
                        { name: "新疆维吾尔自治区", code: 650000, value: 1343 },
                        { name: "上海市", code: 310000, value: 1174 },
                        { name: "陕西省", code: 610000, value: 1223 },
                        { name: "甘肃省", code: 620000, value: 2963 },
                        { name: "安徽省", code: 340000, value: 39 },
                        { name: "香港特别行政区", code: 810000, value: 1248 },
                        { name: "广东省", code: 440000, value: 744 },
                        { name: "河南省", code: 410000, value: 2589 },
                        { name: "湖南省", code: 430000, value: 570 },
                        { name: "江西省", code: 360000, value: 1951 },
                        { name: "四川省", code: 510000, value: 1993 },
                        { name: "广西壮族自治区", code: 450000, value: 726 },
                        { name: "江苏省", code: 320000, value: 1721 },
                        { name: "澳门特别行政区", code: 820000, value: 2671 },
                        { name: "浙江省", code: 330000, value: 1582 },
                        { name: "山东省", code: 370000, value: 1566 },
                        { name: "青海省", code: 630000, value: 539 },
                        { name: "重庆市", code: 500000, value: 611 },
                        { name: "福建省", code: 350000, value: 1281 },
                        { name: "湖北省", code: 420000, value: 2061 },
                        { name: "西藏自治区", code: 540000, value: 955 },
                        { name: "台湾省", code: 710000, value: 2700 }
                    ],
                    time_distr: [
                        { time: "0", value: 2852 },
                        { time: "1", value: 837 },
                        { time: "2", value: 2574 },
                        { time: "3", value: 17 },
                        { time: "4", value: 237 },
                        { time: "5", value: 2234 },
                        { time: "6", value: 2940 },
                        { time: "7", value: 686 },
                        { time: "8", value: 2200 },
                        { time: "9", value: 1530 },
                        { time: "10", value: 1955 },
                        { time: "11", value: 954 },
                        { time: "12", value: 2729 },
                        { time: "13", value: 865 },
                        { time: "14", value: 1463 },
                        { time: "15", value: 2800 },
                        { time: "16", value: 483 },
                        { time: "17", value: 49 },
                        { time: "18", value: 290 },
                        { time: "19", value: 1693 },
                        { time: "20", value: 532 },
                        { time: "21", value: 1681 },
                        { time: "22", value: 2837 },
                        { time: "23", value: 1262 }
                    ]
                },
                {
                    shortUrl: "CUuGX9",
                    longUrl: [{ url: "https://www.taobao.com" }],
                    count: 40503,
                    long: "http://vvyshb.sy/joulvppl",
                    area_distr: [
                        { name: "云南省", code: 530000, value: 1724 },
                        { name: "黑龙江省", code: 230000, value: 1475 },
                        { name: "贵州省", code: 520000, value: 305 },
                        { name: "北京市", code: 110000, value: 1036 },
                        { name: "河北省", code: 130000, value: 1827 },
                        { name: "山西省", code: 140000, value: 2800 },
                        { name: "吉林省", code: 220000, value: 1349 },
                        { name: "宁夏回族自治区", code: 640000, value: 2541 },
                        { name: "辽宁省", code: 210000, value: 64 },
                        { name: "海南省", code: 460000, value: 1041 },
                        { name: "内蒙古自治区", code: 150000, value: 187 },
                        { name: "天津市", code: 120000, value: 539 },
                        { name: "新疆维吾尔自治区", code: 650000, value: 1903 },
                        { name: "上海市", code: 310000, value: 532 },
                        { name: "陕西省", code: 610000, value: 2224 },
                        { name: "甘肃省", code: 620000, value: 2464 },
                        { name: "安徽省", code: 340000, value: 299 },
                        { name: "香港特别行政区", code: 810000, value: 171 },
                        { name: "广东省", code: 440000, value: 911 },
                        { name: "河南省", code: 410000, value: 1460 },
                        { name: "湖南省", code: 430000, value: 1094 },
                        { name: "江西省", code: 360000, value: 805 },
                        { name: "四川省", code: 510000, value: 455 },
                        { name: "广西壮族自治区", code: 450000, value: 271 },
                        { name: "江苏省", code: 320000, value: 1353 },
                        { name: "澳门特别行政区", code: 820000, value: 2579 },
                        { name: "浙江省", code: 330000, value: 694 },
                        { name: "山东省", code: 370000, value: 1336 },
                        { name: "青海省", code: 630000, value: 1690 },
                        { name: "重庆市", code: 500000, value: 1821 },
                        { name: "福建省", code: 350000, value: 1011 },
                        { name: "湖北省", code: 420000, value: 1347 },
                        { name: "西藏自治区", code: 540000, value: 2178 },
                        { name: "台湾省", code: 710000, value: 1885 }
                    ],
                    time_distr: [
                        { time: "0", value: 101 },
                        { time: "1", value: 550 },
                        { time: "2", value: 2696 },
                        { time: "3", value: 809 },
                        { time: "4", value: 889 },
                        { time: "5", value: 1158 },
                        { time: "6", value: 2702 },
                        { time: "7", value: 1578 },
                        { time: "8", value: 400 },
                        { time: "9", value: 1644 },
                        { time: "10", value: 785 },
                        { time: "11", value: 1274 },
                        { time: "12", value: 2752 },
                        { time: "13", value: 772 },
                        { time: "14", value: 1932 },
                        { time: "15", value: 2696 },
                        { time: "16", value: 1850 },
                        { time: "17", value: 2498 },
                        { time: "18", value: 1020 },
                        { time: "19", value: 2491 },
                        { time: "20", value: 1240 },
                        { time: "21", value: 1316 },
                        { time: "22", value: 2605 },
                        { time: "23", value: 854 }
                    ]
                },
                {
                    shortUrl: "9BM1u2",
                    longUrl: [
                        { url: "https://www.taobao.com" },
                        { url: "https://www.taobao.com" },
                        { url: "https://www.taobao.com" },
                        { url: "https://mockjs.com/examples.html" },
                        { url: "https://www.taobao.com" }
                    ],
                    count: 71286,
                    long: "http://gjuhkd.ga/qbtackbyf",
                    area_distr: [
                        { name: "云南省", code: 530000, value: 2485 },
                        { name: "黑龙江省", code: 230000, value: 50 },
                        { name: "贵州省", code: 520000, value: 66 },
                        { name: "北京市", code: 110000, value: 1007 },
                        { name: "河北省", code: 130000, value: 2675 },
                        { name: "山西省", code: 140000, value: 1482 },
                        { name: "吉林省", code: 220000, value: 1435 },
                        { name: "宁夏回族自治区", code: 640000, value: 2996 },
                        { name: "辽宁省", code: 210000, value: 312 },
                        { name: "海南省", code: 460000, value: 1111 },
                        { name: "内蒙古自治区", code: 150000, value: 1567 },
                        { name: "天津市", code: 120000, value: 713 },
                        { name: "新疆维吾尔自治区", code: 650000, value: 1908 },
                        { name: "上海市", code: 310000, value: 105 },
                        { name: "陕西省", code: 610000, value: 1471 },
                        { name: "甘肃省", code: 620000, value: 2676 },
                        { name: "安徽省", code: 340000, value: 104 },
                        { name: "香港特别行政区", code: 810000, value: 2931 },
                        { name: "广东省", code: 440000, value: 2274 },
                        { name: "河南省", code: 410000, value: 2578 },
                        { name: "湖南省", code: 430000, value: 2008 },
                        { name: "江西省", code: 360000, value: 1049 },
                        { name: "四川省", code: 510000, value: 2761 },
                        { name: "广西壮族自治区", code: 450000, value: 1633 },
                        { name: "江苏省", code: 320000, value: 2044 },
                        { name: "澳门特别行政区", code: 820000, value: 913 },
                        { name: "浙江省", code: 330000, value: 1010 },
                        { name: "山东省", code: 370000, value: 1134 },
                        { name: "青海省", code: 630000, value: 2913 },
                        { name: "重庆市", code: 500000, value: 581 },
                        { name: "福建省", code: 350000, value: 2043 },
                        { name: "湖北省", code: 420000, value: 1014 },
                        { name: "西藏自治区", code: 540000, value: 1338 },
                        { name: "台湾省", code: 710000, value: 2333 }
                    ],
                    time_distr: [
                        { time: "0", value: 2601 },
                        { time: "1", value: 768 },
                        { time: "2", value: 2415 },
                        { time: "3", value: 805 },
                        { time: "4", value: 1387 },
                        { time: "5", value: 492 },
                        { time: "6", value: 900 },
                        { time: "7", value: 2354 },
                        { time: "8", value: 2761 },
                        { time: "9", value: 1291 },
                        { time: "10", value: 891 },
                        { time: "11", value: 1490 },
                        { time: "12", value: 1732 },
                        { time: "13", value: 1842 },
                        { time: "14", value: 1873 },
                        { time: "15", value: 2640 },
                        { time: "16", value: 1545 },
                        { time: "17", value: 14 },
                        { time: "18", value: 2894 },
                        { time: "19", value: 1514 },
                        { time: "20", value: 785 },
                        { time: "21", value: 220 },
                        { time: "22", value: 1597 },
                        { time: "23", value: 2516 }
                    ]
                },
                {
                    shortUrl: "c69V5W",
                    longUrl: [
                        { url: "https://www.taobao.com" },
                        { url: "https://www.taobao.com" },
                        { url: "https://www.baidu.com" },
                        { url: "https://www.taobao.com" }
                    ],
                    count: 39269,
                    long: "http://xbimbx.do/devrzujc",
                    area_distr: [
                        { name: "云南省", code: 530000, value: 2182 },
                        { name: "黑龙江省", code: 230000, value: 2859 },
                        { name: "贵州省", code: 520000, value: 2289 },
                        { name: "北京市", code: 110000, value: 176 },
                        { name: "河北省", code: 130000, value: 348 },
                        { name: "山西省", code: 140000, value: 448 },
                        { name: "吉林省", code: 220000, value: 2854 },
                        { name: "宁夏回族自治区", code: 640000, value: 1604 },
                        { name: "辽宁省", code: 210000, value: 2785 },
                        { name: "海南省", code: 460000, value: 243 },
                        { name: "内蒙古自治区", code: 150000, value: 252 },
                        { name: "天津市", code: 120000, value: 1500 },
                        { name: "新疆维吾尔自治区", code: 650000, value: 2889 },
                        { name: "上海市", code: 310000, value: 1045 },
                        { name: "陕西省", code: 610000, value: 2967 },
                        { name: "甘肃省", code: 620000, value: 1776 },
                        { name: "安徽省", code: 340000, value: 1143 },
                        { name: "香港特别行政区", code: 810000, value: 1939 },
                        { name: "广东省", code: 440000, value: 1426 },
                        { name: "河南省", code: 410000, value: 493 },
                        { name: "湖南省", code: 430000, value: 2115 },
                        { name: "江西省", code: 360000, value: 793 },
                        { name: "四川省", code: 510000, value: 2264 },
                        { name: "广西壮族自治区", code: 450000, value: 2711 },
                        { name: "江苏省", code: 320000, value: 1728 },
                        { name: "澳门特别行政区", code: 820000, value: 592 },
                        { name: "浙江省", code: 330000, value: 436 },
                        { name: "山东省", code: 370000, value: 1880 },
                        { name: "青海省", code: 630000, value: 1058 },
                        { name: "重庆市", code: 500000, value: 1689 },
                        { name: "福建省", code: 350000, value: 1606 },
                        { name: "湖北省", code: 420000, value: 194 },
                        { name: "西藏自治区", code: 540000, value: 2374 },
                        { name: "台湾省", code: 710000, value: 767 }
                    ],
                    time_distr: [
                        { time: "0", value: 1196 },
                        { time: "1", value: 2286 },
                        { time: "2", value: 213 },
                        { time: "3", value: 2415 },
                        { time: "4", value: 2027 },
                        { time: "5", value: 1371 },
                        { time: "6", value: 1302 },
                        { time: "7", value: 1987 },
                        { time: "8", value: 1617 },
                        { time: "9", value: 542 },
                        { time: "10", value: 464 },
                        { time: "11", value: 1703 },
                        { time: "12", value: 1285 },
                        { time: "13", value: 2862 },
                        { time: "14", value: 1911 },
                        { time: "15", value: 1856 },
                        { time: "16", value: 1798 },
                        { time: "17", value: 2221 },
                        { time: "18", value: 1871 },
                        { time: "19", value: 4 },
                        { time: "20", value: 1508 },
                        { time: "21", value: 1401 },
                        { time: "22", value: 2732 },
                        { time: "23", value: 823 }
                    ]
                }
            ]
        }
    });
};
const fakeLogin = () => {
    cy.server();
    cy.route({
        method: "GET",
        url: "**/checkSession",
        response: {
            msg: "查询成功",
            status: 200
        }
    });
};