describe('Navigation',()=>{
    beforeEach(()=>{
        fakeLogin();
        cy.visit('/')
    });
    it('home button navigates to right url',()=>{
        cy.get('ul')
            .get('li')
            .get('a')
            .first()
            .click({force:true})
            .location('pathname')
            .should('equal','/')
    });
    it('statistics button navigates to right url',()=>{
        cy.get(':nth-child(4) > :nth-child(2) > a')
            .click({force:true})
            .url()
            .should('contain','/statistics')
    });
    it('create button navigates to right url',()=>{
        cy.get(':nth-child(6) > :nth-child(2) > a')
            .click({force:true})
            .url()
            .should('contain','/create')
    });
    it('manage button navigates to right url',()=>{
        cy.get(':nth-child(8) > :nth-child(2) > a')
            .click({force:true})
            .url()
            .should('contain','/manage')
    });

    it('start exploration navigates to right url',()=>{
        cy.get('.centerDesc > .ant-btn')
            .click({force:true})
            .url()
            .should('contain','create')
    })
});
const fakeLogin = () => {
    cy.server();
    let user={
        loginStatus: true,
        type: 0,
        id: 100,
        token: "hlduwocoacsffxvunwtghyorueoecijckycmuyprkdcvyngdskdruugxjkdapckmjmiqrmymtwhhjnkece.nsgulqjivzkoeqausrwdymunlomrvpmlyxlcggscfzgiligicjfkmogvenbrooqlhdsbxlqjw.hsficmjojubovhsaphfytcinvsqbkgtqxoyuskgbeesertqiwbaxecryvuvwqfqnigcjqzsvicipgiwpndrmfjcplmcylei",
        refreshToken: "rztwwprjkerepcsoijukwklmwrkurgltxgwfqtiusmafarzlrwrgqxvmfibitdyotyztubjoyhyqhlwzfxntfglxtwk.pncakrtifomdobiqcvufxheycruoqgwficcscjehsquhohttorsdrciuofdimmsocwnzyybffqgvvnj.fydwucxwtdutdmhwtnubwhiysgfoewbnkyeeeuqlyhmeredlqtxxglvqgcmqjuqpftbhryceuvunjdmjcmpjksrzbgjr",
    };
    window.sessionStorage.setItem('user', JSON.stringify(user));
    cy.route({
        method: "GET",
        url: "**/checkSession",
        response: {
            status: 200
        }
    });

};
