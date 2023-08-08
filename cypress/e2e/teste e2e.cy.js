

/// <reference types="cypress"/>


var faker = require('faker');

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {

    afterEach(() => {
        cy.screenshot()

    })
})



// Registro e login 


it('teste e2e, login até confirmação da ordem de compra', () => {

    cy.visit('minha-conta')


    let emailFaker = faker.internet.email()

    cy.get('#reg_email').type(emailFaker)
    cy.get('#reg_password').type('!teste@teste$')
    cy.get(':nth-child(4) > .button').click()



    // Deve adicionar quatro produtos ao carrinho usando comandos customizados




    cy.visit('produtos')

    cy.get(':nth-child(3) > .page-numbers').click()

    cy.addProdutos('Cassius Sparring Tank', 'S', 'Blue', 1)


    cy.visit('produtos')

    cy.get(':nth-child(4) > .page-numbers').click()

    cy.addProdutos('Erica Evercool Sports Bra', 'S', 'Blue', 1)

    cy.visit('produtos')

    cy.get(':nth-child(3) > .page-numbers').click()

    cy.addProdutos('Circe Hooded Ice Fleece', 'S', 'Green', 2)

    cy.visit('produtos')

    cy.get(':nth-child(3) > .page-numbers').click()

    cy.addProdutos('Cobalt CoolTech™ Fitness Short', '33', 'Black', 2)


    cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
    cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()


    // Preenchimento do Pedido com comandos customizados

    cy.addPedido('Miguel', 'Frias', 'CIA', 'Av. Brasil 1000', 'casa', 'São Paulo', '01000100', '011999999999')


    cy.get('.wc_payment_method.payment_method_cod > label').click()
    cy.get('#terms').click()


    cy.get('#place_order').click({ force: true })


 
    
    cy.get('.woocommerce-notice').should('contain', 'Obrigado.') 








})

