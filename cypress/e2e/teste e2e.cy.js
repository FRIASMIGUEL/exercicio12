     
    
    /// <reference types="cypress"/>

import enderecoPage from "../support/page-objects/endereco.page"

var faker = require('faker');


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {

afterEach(() => {
cy.screenshot()

})
})

it('teste e2e desde cadastro até confirmação da ordem de compra', () => {
       
 

//Pre-cadastro usando comandos customizados 

cy.visit('minha-conta')
let emailFaker = faker.internet.email()
            
cy.preCadastro(emailFaker, 'senha!@#fortenome', 'Miguel', 'Frias')

cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
cy.get('.woocommerce-MyAccount-navigation-link--customer-logout > a').click()


// teste login usando fixture 

cy.visit('minha-conta')

cy.fixture('perfil').then(dados => {

cy.get('.woocommerce-form > :nth-child(1) > label').type(dados.usuario)
cy.get('#password').type(dados.senha, { log: false })
cy.get('.woocommerce-form > .button').click()
cy.get('.page-title').should('contain', 'Minha conta')
cy.get('.woocommerce-MyAccount-navigation-link--customer-logout > a').click()

         
// Deve adicionar quatro produtos ao carrinho usando comandos mistos



cy.visit('produtos')

let nomeFaker2 = faker.name.firstName()

        let sobrenomeFaker2 = faker.name.lastName()

        let emailFaker2 = faker.internet.email() 



var quantidade = 1

    cy.get('[class="product-block grid"]')
    .contains('Abominable Hoodie').click()
    cy.get('.button-variable-item-M').click()
    cy.get('.button-variable-item-Green').click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()
    cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
    cy.get('.woocommerce-message').should('contain', 'Abominable Hoodie” foi adicionado no seu carrinho.')
    cy.get('#primary-menu > .menu-item-629 > a').click()

   cy.visit('produtos')

    cy.get(':nth-child(3) > .page-numbers').click ()

    cy.addProdutos('Cassius Sparring Tank', 'S', 'Blue',1)
    cy.get('.woocommerce-message').should('contain','“Cassius Sparring Tank” foi adicionado no seu carrinho.')
    cy.get('#primary-menu > .menu-item-629 > a').click()

    cy.visit('produtos')

    cy.get(':nth-child(4) > .page-numbers').click ()
    cy.addProdutos('Erica Evercool Sports Bra', 'S', 'Blue', 1)
    cy.get('.woocommerce-message').should('contain','“Erica Evercool Sports Bra” foi adicionado no seu carrinho.')
    cy.get('#primary-menu > .menu-item-629 > a').click()
    
    cy.visit('produtos')

    cy.get(':nth-child(3) > .page-numbers').click ()
    cy.addProdutos('Cassia Funnel Sweatshirt', 'S', 'Orange', 2)
    cy.get('.woocommerce-message').should('contain', ' 2 × “Cassia Funnel Sweatshirt” foram adicionados no seu carrinho.')
    

    cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 5)

    cy.get('.dropdown-toggle > .text-skin > .icon-basket').click ()
    cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
   

   // Preenchimento do Pedido

    cy.get('#billing_first_name_field > label').type(nomeFaker2)
    cy.get('#billing_last_name_field > label').type(sobrenomeFaker2)

    cy.get('#select2-billing_country-container').click().type('Brasil').click()
    cy.get('#billing_address_1').type('Avenida Brasil 3100')

    cy.get('#billing_address_2').type('Casa')

    
    cy.get('#billing_city').type('São Paulo')
    
    cy.get('#select2-billing_state-container').click().type('São Paulo').click()


    cy.get('#billing_postcode_field > label').type('01000100')

    cy.get('#billing_phone_field > label').type('011999999999') 


    cy.get('#billing_email').type(emailFaker2)


    cy.get('#createaccount').click()
    cy.get('#account_password').type('ebac/senha1235')

    cy.get('.wc_payment_method.payment_method_cod > label').click()
    cy.get('#terms').click()
    cy.wait(7000)

    cy.get('#place_order').click()

    cy.wait(8000)
    
    cy.get('.woocommerce-notice').should('contain', 'Obrigado.') 

            }) })
    
        
 


    






   
 





