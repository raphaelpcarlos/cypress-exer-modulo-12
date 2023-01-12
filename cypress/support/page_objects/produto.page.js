class ComprarProdutos {

    adicionarProduto(page, produto, quantidade, tamanho, cor) {

        cy.visit("/produtos/")

        cy.get(`:nth-child(${page}) > .page-numbers`).click()
        cy.get('[class="product-block grid"]')
            .contains(produto)
            .click()
        cy.get('.button-variable-item-' + tamanho).click()
        cy.get('.button-variable-item-' + cor).click()
        cy.get('.input-text')
            .clear()
            .type(quantidade)
        cy.get('.single_add_to_cart_button').click()

    }

    editarCheckout(nome, sobrenome, empresa,  endereco, cidade,  cep) {

        cy.visit("/checkout/")

        cy.get('#billing_first_name').clear().type(nome)
        cy.get('#billing_last_name').clear().type(sobrenome)
        cy.get('#billing_company').clear().type(empresa)
        cy.get('#billing_address_1').clear().type(endereco)
        cy.get('#billing_city').clear().type(cidade)
        cy.get('#billing_postcode').clear().type(cep)
        cy.get('#payment_method_cod').check()
        cy.get('#terms').check()
        cy.get('#terms')
    }

    validarCompraProduto(produto){
        cy.visit("/checkout/")
        cy.get('.cart_item').children().contains(produto)

    }
}

export default new ComprarProdutos()