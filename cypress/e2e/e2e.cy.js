/// <reference types="cypress" />
import ComprarProdutos from '../support/page_objects/produto.page'
import { faker } from '@faker-js/faker';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/minha-conta/')
        cy.fixture("perfil").then(info => {
            cy.login(info.usuario, info.senha)
        })
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        //Realizar os pedidos
        cy.fixture("pedidos").then(pedido => {

            ComprarProdutos.adicionarProduto(pedido[0].page, pedido[0].produto, pedido[0].quantidade, pedido[0].size, pedido[0].cor)
            ComprarProdutos.adicionarProduto(pedido[1].page, pedido[1].produto, pedido[1].quantidade, pedido[1].size, pedido[1].cor)
            ComprarProdutos.adicionarProduto(pedido[2].page, pedido[2].produto, pedido[2].quantidade, pedido[2].size, pedido[2].cor)


            //Realizar o cadastro do checkout

            ComprarProdutos.editarCheckout(
                faker.name.firstName(),
                faker.name.lastName(),
                faker.name.firstName(),
                faker.address.country(),
                faker.address.streetName(),
                faker.address.city(),
                faker.address.stateAbbr(),
                faker.address.zipCode()
            )

            ComprarProdutos.validarCompraProduto(pedido[0].produto)
            ComprarProdutos.validarCompraProduto(pedido[1].produto)
            ComprarProdutos.validarCompraProduto(pedido[2].produto)
        })
    })

})