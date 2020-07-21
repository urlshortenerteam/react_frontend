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
            .get('.ant-popover-inner-content')
            .should('not.be.visible');

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

    it("user manage: ban and lift",()=>{
        cy.get('#rc-tabs-0-tab-2 > :nth-child(1)')
            .click();
        cy.get('[data-row-key="3"] > :nth-child(4) > .ant-btn')
            .click()
            .get('.ant-popover-buttons > .ant-btn-primary')
            .click()
            .get('[data-row-key="1"] > :nth-child(4) > .ant-btn')
            .contains("解 除");
        cy.get('[data-row-key="1"] > :nth-child(4) > .ant-btn')
            .click()
            .get(':nth-child(9) > :nth-child(1) > .ant-popover > .ant-popover-content > .ant-popover-inner > .ant-popover-inner-content > .ant-popover-buttons > .ant-btn-primary')
            .click()
            .get('[data-row-key="1"] > :nth-child(4) > .ant-btn')
            .contains("禁 用");
        cy.get('[data-row-key="4"] > :nth-child(4) > .ant-btn')
            .click()
            .get(':nth-child(11) > :nth-child(1) > .ant-popover > .ant-popover-content > .ant-popover-inner > .ant-popover-inner-content > .ant-popover-buttons > .ant-btn-primary')
            .click()
            .get('.move-up-enter > .ant-message-notice-content')
            .contains("管理员")
    });

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
