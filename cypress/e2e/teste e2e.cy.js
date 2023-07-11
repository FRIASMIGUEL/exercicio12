/// <reference types="cypress"/>

import enderecoPage from "../support/page-objects/endereco.page"

var faker = require('faker');

beforeEach(() => { cy.visit('minha-conta') });

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {


    afterEach(() => {
        cy.screenshot()

    })

    it('Deve fazer login com sucesso', () => {

        cy.get('.woocommerce-form > :nth-child(1) > label').type('aluno_ebac@teste.com')
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá')



    })
    const perfil = require('../fixtures/perfil.json')


    it('Deve fazer login com sucesso - Usando arquivo de dados', () => {

        cy.get('.woocommerce-form > :nth-child(1) > label').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')

    })


    it('Deve fazer login com sucesso - Usando fixture', () => {

        cy.fixture('perfil').then(dados => {

        cy.get('.woocommerce-form > :nth-child(1) > label').type(dados.usuario)
        cy.get('#password').type(dados.senha, { log: false })
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')


        })

        it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {

            cy.get('.woocommerce-form > :nth-child(1) > label').type('@teste.com')
            cy.get('#password').type('teste@teste.com')
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-error > li').should('contain', 'Erro: o usuário @teste.com não está cadastrado neste site')

        })

        it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {

            cy.get('.woocommerce-form > :nth-child(1) > label').type('aluno_ebac@teste.com')
            cy.get('#password').type('teste@teste')
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-error').should('contain', 'Erro: a senha fornecida para o e-mail')


        })
        })



    describe('Funcionalidade Pre Cadastro', () => {
        beforeEach(() => {
            cy.visit('minha-conta')

        })

        it('Deve completar o pre cadastro com sucesso', () => {

            let nomeFaker = faker.name.firstName()
            let sobrenomeFaker = faker.name.lastName()
            let emailFaker = faker.internet.email(nomeFaker)


            cy.get('#reg_email').type(emailFaker)
            cy.get('#reg_password').type('!teste@teste$')
            cy.get(':nth-child(4) > .button').click()


            cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
            cy.get('#account_first_name').type(nomeFaker)
            cy.get('#account_last_name').type(sobrenomeFaker)
            cy.get('.woocommerce-Button').click()

            cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')



        })

        it('Deve completar o pre-cadastro com sucesso usando comandos customizados', () => {
           
            let emailFaker2 = faker.internet.email()
            
            cy.preCadastro(emailFaker2, 'senha!@#fortenome', 'Miguel', 'Frias')
            cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')

        })
        })



    describe('Funcionalidade Endereços - Faturamento e Entrega', () => {
        beforeEach(() => {

            cy.visit('minha-conta')
            cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha)
        })

        })

        it('Deve fazer cadastro de faturamento com sucesso', () => {

            enderecoPage.editarEnderecoFaturamento('Flavio', 'Araujo', 'Google', 'Brasil', 'Avenida Brasil', '3100', 'São Paulo', 'São Paulo', '01000100', '011999999999', 'flavio@teste.com')
            cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')

        });

        it('Deve fazer cadastro de faturamento com sucesso - Usando arquivo de dados', () => {
            const dadosEndereco = require('../fixtures/endereco.json')
            enderecoPage.editarEnderecoFaturamento(

                dadosEndereco[1].nome,
                dadosEndereco[1].sobrenome,
                dadosEndereco[1].empresa,
                dadosEndereco[1].pais,
                dadosEndereco[1].endereco,
                dadosEndereco[1].numero,
                dadosEndereco[1].cidade,
                dadosEndereco[1].estado,
                dadosEndereco[1].cep,
                dadosEndereco[1].telefone,
                dadosEndereco[1].email

            )


            cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')

        })

        })


    })   
       


describe('Funcionalidade Página de Produtos', () => {

   
    beforeEach(() => {

        cy.visit('produtos')
    });


    it('Deve adicionar quatro produtos ao carrinho usando comandos mistos' , () =>  {
 
        

        let nomeFaker2 = faker.name.firstName()

        let sobrenomeFaker2 = faker.name.lastName()

        let emailFaker3 = faker.internet.email() 



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

    cy.get(':nth-child(3) > .page-numbers').click ()
    cy.addProdutos('Cassius Sparring Tank', 'S', 'Blue', 1)
    cy.get('.woocommerce-message').should('contain','“Cassius Sparring Tank” foi adicionado no seu carrinho.')
    cy.get('#primary-menu > .menu-item-629 > a').click()

    cy.get(':nth-child(4) > .page-numbers').click ()
    cy.addProdutos('Erica Evercool Sports Bra', 'S', 'Blue', 1)
    cy.get('.woocommerce-message').should('contain','“Erica Evercool Sports Bra” foi adicionado no seu carrinho.')
    cy.get('#primary-menu > .menu-item-629 > a').click()

        


    cy.get(':nth-child(2) > .page-numbers').click ()
    cy.addProdutos('Augusta Pullover Jacket', 'S', 'Blue', 2)
    cy.get('.woocommerce-message').should('contain', '2 × “Augusta Pullover Jacket” foram adicionados no seu carrinho.')
    

    cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 5)

    cy.get('.dropdown-toggle > .text-skin > .icon-basket').click ()
    cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
   



    

    cy.get('#billing_first_name_field > label').type(nomeFaker2)
    cy.get('#billing_last_name_field > label').type(sobrenomeFaker2)

    cy.get('#select2-billing_country-container').click().type('Brasil').click()
    cy.get('#billing_address_1').type('Avenida Brasil 3100')

    cy.get('#billing_address_2').type('Casa')

    
    cy.get('#billing_city').type('São Paulo')
    
    cy.get('#select2-billing_state-container').click().type('São Paulo').click()


    cy.get('#billing_postcode_field > label').type('01000100')

    cy.get('#billing_phone_field > label').type('011999999999') 


    cy.get('#billing_email').type(emailFaker3)



    cy.get('#createaccount').click()
    cy.get('#account_password').type('ebac/senha1235')

    cy.get('.wc_payment_method.payment_method_cod > label').click()
    cy.get('#terms').click()


    cy.get('#place_order').click()

 
   
    
})


})

   
 




        