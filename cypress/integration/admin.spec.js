describe("AdminManage", () => {
    beforeEach(() => {
        fakeLogin();
        stubData();
        cy.visit("/adminManage");
    });

    it("display tabs",()=>{
        cy.get('#rc-tabs-0-tab-1 > :nth-child(1)')
            .contains("短链接管理");
        cy.get('#rc-tabs-0-tab-2 > :nth-child(1)')
            .contains("用户管理");
        cy.get('#rc-tabs-0-tab-3 > :nth-child(1)')
            .contains("统计");
    });

    it("url manage : display",()=>{
        cy.get('.ant-table-thead > tr > :nth-child(2)')
            .contains("短链接");
        cy.get('.ant-table-thead > tr > :nth-child(3)')
            .contains("访问量");
        cy.get('.ant-table-thead > tr > :nth-child(4)')
            .contains("创建用户");
        cy.get('.ant-table-thead > tr > :nth-child(5)')
            .contains("创建日期");
        cy.get('.ant-table-thead > tr > :nth-child(6)')
            .contains("禁用/启用");
    });

    it("url manage : expand and collapse",()=>{
        cy.get('[data-row-key="1XK6lw"] > .ant-table-row-expand-icon-cell > .ant-table-row-expand-icon')
            .click()
            .get('.ant-table-expanded-row > .ant-table-cell');
        cy.get('[data-row-key="1XK6lw"] > .ant-table-row-expand-icon-cell > .ant-table-row-expand-icon')
            .click()
            .get('.ant-table-expanded-row > .ant-table-cell')
            .should('not.be.visible');
    });

    it("url manage : ban and lift",()=>{
        cy.get('[data-row-key="1XK6lw"] > :nth-child(6) > .ant-btn')
            .click()
            .get('.ant-popover-buttons > :nth-child(1) > span')
            .click()
            .get('.ant-popover-inner-content');
            // .should('not.be.visible');

        cy.get('[data-row-key="1XK6lw"] > :nth-child(6) > .ant-btn')
            .click()
            .get('.ant-popover-buttons > .ant-btn-primary')
            .click()
            .get('[data-row-key="1XK6lw"] > :nth-child(6) > .ant-btn > span')
            .contains("启 用");

        cy.get('[data-row-key="1XK6lw"] > :nth-child(6) > .ant-btn')
            .click()
            .get('.ant-popover-buttons > .ant-btn-primary')
            .click()
            .get('[data-row-key="1XK6lw"] > :nth-child(6) > .ant-btn > span')
            .contains("禁 用")
    });

    it("user manage : display",()=>{
        cy.get('#rc-tabs-0-tab-2 > :nth-child(1)')
            .click();
        cy.get(':nth-child(1) > .ant-table-filter-column > .ant-table-filter-column-title')
            .contains("用户名");
        cy.get('.ant-table-column-sorters > :nth-child(1)')
            .contains("访问次数");
        cy.get(':nth-child(2) > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(3)')
            .contains("用户类型");
        cy.get(':nth-child(2) > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(4)')
            .contains("禁用/启用");

    });

    // it("user manage: ban and lift",()=>{
    //     cy.get('#rc-tabs-0-tab-2 > :nth-child(1)')
    //         .click();
    //     cy.get('[data-row-key="3"] > :nth-child(4) > .ant-btn')
    //         .click()
    //         .get('.ant-popover-buttons > .ant-btn-primary')
    //         .click()
    //         .get('[data-row-key="1"] > :nth-child(4) > .ant-btn')
    //         .contains("解 除");
    //     cy.get('[data-row-key="1"] > :nth-child(4) > .ant-btn')
    //         .click();
    //     cy.get(':nth-child(10) > :nth-child(1) > .ant-popover > .ant-popover-content > .ant-popover-inner > .ant-popover-inner-content > .ant-popover-buttons > .ant-btn-primary')
    //         .click();
    //     cy.get('[data-row-key="1"] > :nth-child(4) > .ant-btn > span')
    //         .contains("禁 用");
    //     cy.get('[data-row-key="4"] > :nth-child(4) > .ant-btn')
    //         .click();
    //     cy.get(':nth-child(11) > :nth-child(1) > .ant-popover > .ant-popover-content > .ant-popover-inner > .ant-popover-inner-content > .ant-popover-buttons > .ant-btn-primary')
    //         .click()
    //         .get('.move-up-enter > .ant-message-notice-content')
    //         .contains("管理员")
    // });

    it("statistic : display",()=>{
        cy.get('#rc-tabs-0-tab-3 > :nth-child(1)')
            .click();
        cy.get('.ant-row > :nth-child(1) > .ant-card > .ant-card-body')
            .contains("用户数");
        cy.get(':nth-child(2) > .ant-card > .ant-card-body')
            .contains("总短链接数");
        cy.get(':nth-child(3) > .ant-card > .ant-card-body')
            .contains("总访问量");
        cy.get(':nth-child(4) > .ant-card > .ant-card-body')
            .contains("最受欢迎短链接");
        cy.get('.topRank > :nth-child(1)')
            .contains("访问量排行榜")
    })

});
const stubData = () => {
    cy.route({
        method: "POST",
        url: "**/editUrl",
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
        url: "**/getShortStat?**",
        response: {
            status: 200,
            msg: "查询成功",
            data: {
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

        }
    });
    cy.route({
        method: "GET",
        url: "**/banUser?**",
        response: {
            status: 200,
            msg: "查询成功",
            data: {
                status: true
            },
            not_administrator: false,
        }
    });
    cy.route({
        method: "GET",
        url: "**/getUserStat",
        response: {
            status: 200,
            msg: "查询成功",
            data:
                [
                    {
                        id: "1",
                        name: "dcx",
                        role:2,
                        visit_count:34567
                    },
                    {
                        id: "3",
                        name: "345",
                        role:1,
                        visit_count:32876
                    },
                    {
                        id: "4",
                        name: "df",
                        role:0,
                        visit_count:9678
                    },
                ],
            not_administrator:false

        }
    });
    cy.route({
        method: "GET",
        url: "**/getTopTen",
        response: {
            status: 200,
            msg: "查询成功",
            data: [
                {
                    shortUrl: "1XK6lw",
                    longUrl: [
                        { url: "https://www.baidu.com", },
                        { url:  "https://www.taobao.com",},
                        { url:  "https://mockjs.com/examples.html", },

                    ],
                    count: 98765,
                },
                {
                    shortUrl: "NI3DW1",
                    longUrl: [
                        { url: "https://www.baidu.com", },
                        { url:  "https://www.taobao.com",},
                    ],
                    count: 9095,
                },
                {
                    shortUrl: "2B56jT",
                    longUrl: [
                        { url: "https://www.baidu.com", },
                    ],
                    count: 465,
                }
            ],
            not_administrator: false
        }
    });
    cy.route({
        method: "GET",
        url: "**/getAllUrls",
        response: {
            status: 200,
            msg: "查询成功",
            data: [
                {
                    shortUrl: "1XK6lw",
                    longUrl: [
                        { url: "https://www.baidu.com", },
                        { url:  "https://www.taobao.com",},
                        { url:  "https://mockjs.com/examples.html", },

                    ],
                    count: 98765,
                    creatorName: "568gh",
                    createTime: "2020-01-02",
                },
                {
                    shortUrl: "NI3DW1",
                    longUrl: [
                        { url: "https://www.baidu.com", },
                        { url:  "https://www.taobao.com",},

                    ],
                    count: 9095,
                    creatorName: "765h",
                    createTime: "2020-09-02",
                },
                {
                    shortUrl: "2B56jT",
                    longUrl: [
                        { url: "https://www.baidu.com", },


                    ],
                    count: 465,
                    creatorName: "jhge",
                    createTime: "2020-11-02",
                }
            ],
            not_administrator: false
        }
    });
    cy.route({
        method: "GET",
        url: "**/getNumberCount",
        response: {
            status: 200,
            msg: "查询成功",
            data:{
                userCount: 654321,
                shortUrlCount: 945678,
                visitCountTotal: 345678,
                shortUrl:"4iopoi",
            },
            not_administrator: false
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
