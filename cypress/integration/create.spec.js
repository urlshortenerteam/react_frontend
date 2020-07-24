describe("Create", () => {
    beforeEach(() => {
        fakeLogin();
        stubData();
        cy.visit("/create");
    });
    it("display the tabs", () => {
        cy.get(".ant-tabs-nav-wrap")
            .should("be.visible");
        cy.get(".ant-tabs-nav-wrap")
            .contains("多对一");

        cy.get(".ant-tabs-nav-wrap")
            .contains("一对一");

    });

    it("display manyToOne and oneToOne", () => {
        cy.get("#rc-tabs-0-tab-1 > :nth-child(1)")
            .contains("多对一")
            .click()    //display the table
            .get(".ant-spin-container")
            .get(".ant-table-thead > tr > .ant-table-cell-ellipsis")
            .contains("长链接")
            .get(".ant-table-thead > tr > :nth-child(2)")
            .contains("短链接");
        cy.get('#rc-tabs-0-tab-2 > :nth-child(1)')
            .contains("一对一")
            .click()    //display the table
            .get(".ant-spin-container")
            .get(".ant-table-thead > tr > .ant-table-cell-ellipsis")
            .contains("长链接")
            .get(".ant-table-thead > tr > :nth-child(2)")
            .contains("短链接");
    });

    it("manyToOne: test add btn",()=>{
        cy.get(".ant-row > :nth-child(1) > div > .ant-btn ")
            .contains("添 加")
            .click()
            .get('[data-row-key="2"] > .ant-table-cell')
    });

    it("manyToOne: test input and delete",()=>{
        cy.get('[data-row-key="1"] > .ant-table-cell-ellipsis > .editable-cell-value-wrap > span')
            .click()
            .get('#long')
            .get('.ant-input-group-addon > .ant-btn')
            .click()
            .get('.ant-empty')
    });

    it("manyToOne: test split urls",()=>{
        cy.get('[data-row-key="1"] > .ant-table-cell-ellipsis > .editable-cell-value-wrap > span')
            .click()
            .get('#long')
            .type('{selectall}{del}http://i.sjtu.edu.cn   https://baidu.com{enter}');
        cy.get('[data-row-key="3"] > .ant-table-cell')
            .should('be.visible')
    });

    it("manyToOne: test create btn -- wrong format",()=>{
        cy.get(':nth-child(2) > div > .ant-btn')
            .contains("生 成")
            .click()
            .get('.ant-message-notice-content')
            .contains("格式不正确");
    });

    it("manyToOne: test create btn -- right format",()=>{
        cy.get('[data-row-key="1"] > .ant-table-cell-ellipsis > .editable-cell-value-wrap > span')
            .click()
            .get('#long')
            .type('{selectall}{del}http://i.sjtu.edu.cn')
            .blur();
        cy.get(':nth-child(2) > div > .ant-btn')
            .click()
            .get('.ant-table-row > :nth-child(2)')
            .get('.ant-row > :nth-child(1) > div > .ant-btn')
            // .should('be.disabled')
            .get(':nth-child(2) > div > .ant-btn')
            // .should('be.disabled')
            .get('.ant-table-cell-ellipsis > span')
            .click()
            // .should('not.be.focused')
    });

    it("manyToOne: test reset btn -- before create",()=>{
        cy.get(".ant-row > :nth-child(1) > div > .ant-btn ")
                .contains("添 加")
                .click();
        cy.get(':nth-child(3) > div > .ant-btn')
            .click()
            .get('[data-row-key="2"] > .ant-table-cell')
            .should('not.be.visible')
    });

    it("manyToOne: test reset btn -- after create",()=>{
        cy.get('[data-row-key="1"] > .ant-table-cell-ellipsis > .editable-cell-value-wrap > span')
            .click()
            .get('#long')
            .type('{selectall}{del}http://i.sjtu.edu.cn')
            .blur();
        cy.get(':nth-child(3) > div > .ant-btn')
            .click()
            .get('.ant-table-row > :nth-child(2)')
            .should('not.have.value')
    });

    it("oneToOne: test add btn",()=>{
        cy.get('#rc-tabs-0-tab-2 > :nth-child(1)')
            .click();    //display the table
        cy.get('#rc-tabs-0-panel-2 > :nth-child(2) > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-footer > .ant-row > :nth-child(1) > div > .ant-btn')
            .contains("添 加")
            .click()
            .get('[data-row-key="2"] > .ant-table-cell');
    });

    it("oneToOne: test input and delete",()=>{
        cy.get('#rc-tabs-0-tab-2 > :nth-child(1)')
            .click();    //display the table
        cy.get('#rc-tabs-0-panel-2 > :nth-child(2) > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > .ant-table-cell-ellipsis > .editable-cell-value-wrap > span')
            .click()
            .get('#long')
            .get('.ant-input-group-addon > .ant-btn')
            .click()
            .get('.ant-empty')
    });

    it("oneToOne: test split urls",()=>{
        cy.get('#rc-tabs-0-tab-2 > :nth-child(1)')
            .click();    //display the table
        cy.get('#rc-tabs-0-panel-2 > :nth-child(2) > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > .ant-table-cell-ellipsis > .editable-cell-value-wrap > span')
            .click()
            .get('#long')
            .type('{selectall}{del}http://i.sjtu.edu.cn   https://baidu.com{enter}');
        cy.get('[data-row-key="2"] > .ant-table-cell-ellipsis > .editable-cell-value-wrap > span')
            .should('be.visible')
    });

    it("oneToOne: test create btn -- wrong format",()=>{
        cy.get('#rc-tabs-0-tab-2 > :nth-child(1)')
            .click();    //display the table
        cy.get('#rc-tabs-0-panel-2 > :nth-child(2) > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-footer > .ant-row > :nth-child(2) > div > .ant-btn')
            .contains("生 成")
            .click()
            .get('.ant-message-notice-content')
            .contains("格式不正确");
    });

    it("oneToOne: test create btn -- right format",()=>{
        cy.get('#rc-tabs-0-tab-2 > :nth-child(1)')
            .click();    //display the table
        cy.get('#rc-tabs-0-panel-2 > :nth-child(2) > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > .ant-table-cell-ellipsis > .editable-cell-value-wrap > span')
            .click()
            .get('#long')
            .type('{selectall}{del}http://i.sjtu.edu.cn')
            .blur();
        cy.get('#rc-tabs-0-panel-2 > :nth-child(2) > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-footer > .ant-row > :nth-child(2) > div > .ant-btn')
            .click()
            .get('.ant-table-row > :nth-child(2)')
            .get('.ant-row > :nth-child(1) > div > .ant-btn')
            .should('be.disabled')
            .get(':nth-child(2) > div > .ant-btn')
            .should('be.disabled')
            .get('.ant-table-cell-ellipsis > span')
            .click()
            .should('not.be.focused')
    });

    it("oneToOne: test reset btn -- before create",()=>{
        cy.get('#rc-tabs-0-tab-2 > :nth-child(1)')
            .click();    //display the table
        cy.get('#rc-tabs-0-panel-2 > :nth-child(2) > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-footer > .ant-row > :nth-child(1) > div > .ant-btn')
            .contains("添 加")
            .click();
        cy.get('#rc-tabs-0-panel-2 > :nth-child(2) > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-footer > .ant-row > :nth-child(3) > div > .ant-btn > span')
            .click()
            .get('[data-row-key="2"] > .ant-table-cell')
            .should('not.be.visible')
    });

    it("oneToOne: test reset btn -- after create",()=>{
        cy.get('#rc-tabs-0-tab-2 > :nth-child(1)')
            .click();    //display the table
        cy.get('#rc-tabs-0-panel-2 > :nth-child(2) > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > .ant-table-cell-ellipsis > .editable-cell-value-wrap > span')
            .click()
            .get('#long')
            .type('{selectall}{del}http://i.sjtu.edu.cn')
            .blur();
        cy.get('#rc-tabs-0-panel-2 > :nth-child(2) > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-footer > .ant-row > :nth-child(3) > div > .ant-btn > span')
            .click()
            .get('.ant-table-row > :nth-child(2)')
            .should('not.have.value')
    })
});
const stubData = () => {
    cy.route({
        method: "POST",
        url: "**/getShort?**",
        response: {
            status: 200,
            msg: "查询成功",
            data: [
                "dfg89s",
                "678skw",
                "yj9wos"
            ]
        }
    });
    cy.route({
        method: "POST",
        url: "**/getOneShort?**",
        response: {
            status: 200,
            msg: "查询成功",
            data:  "dfg89s"

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
