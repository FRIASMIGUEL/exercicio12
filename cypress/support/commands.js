// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (usuario, senha) => {
cy.get('.woocommerce-form > :nth-child(1) > label').type(usuario)
cy.get('#password').type(senha)
cy.get('.woocommerce-form > .button').click()

})


Cypress.Commands.add('addPedido', (Nome, Sobrenome,compania,endereço1,endereço2, Cidade,CEP, Telefone, ) =>{

    cy.get('#billing_first_name').type(Nome)

    cy.get('#billing_last_name').type(Sobrenome)
        
    cy.get('#billing_company').clear().type(compania)

    cy.get('#billing_address_1').type(endereço1)
    
    cy.get('#billing_address_2').type(endereço2)
    
    cy.get('#billing_city').type(Cidade)

  
        cy.get('#billing_postcode').type(CEP)
    
        cy.get('#billing_phone').type(Telefone)
        
        



})

Cypress.Commands.add('addProdutos', (produto, tamanho, cor, quantidade) => {
    
    cy.get('[class="product-block grid"]')
    .contains(produto).click()
    cy.get('.button-variable-item-'+ tamanho).click()
    cy.get('.button-variable-item-'+ cor).click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()
    



    }) 

