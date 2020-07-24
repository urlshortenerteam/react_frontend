describe('Navigation',()=>{
    beforeEach(()=>{
        cy.visit('/')
    });
    it('home button navigates to right url',()=>{
        cy.get('ul')
            .get('li')
            .get('a')
            .first()
            .click()
            .location('pathname')
            .should('equal','/')
    });
    it('statistics button navigates to right url',()=>{
        cy.get(':nth-child(4) > :nth-child(2) > a')
            .click()
            .url()
            .should('contain','/statistics')
    });
    it('create button navigates to right url',()=>{
        cy.get(':nth-child(6) > :nth-child(2) > a')
            .click()
            .url()
            .should('contain','/create')
    });
    it('manage button navigates to right url',()=>{
        cy.get(':nth-child(8) > :nth-child(2) > a')
            .click()
            .url()
            .should('contain','/manage')
    });
    it('adminManage button navigates to right url',()=>{
        cy.get(':nth-child(10) > :nth-child(2) > a')
            .click({force:true})
            .url()
            .should('contain','/adminManage')
    });
    it('start exploration navigates to right url',()=>{
        cy.get('.centerDesc > .ant-btn')
            .click()
            .url()
            .should('contain','create')
    })
});
