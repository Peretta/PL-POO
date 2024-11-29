import Cliente from "../../modelo/cliente";
import Listagem from "./../listagem";
import Entrada from "../../io/entrada";

import { clear } from "console";
let entrada = new Entrada();

export default class ListagemClientes extends Listagem {
    
    private clientes: Array<Cliente>

    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    
    public listar(): void {
        clear()
        console.log(`\n Lista de todos os clientes:`);
        this.clientes.forEach(cliente => {
            console.log(`--------------------------------------`);
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            console.log(`Rgs: ` + cliente.getRgs.map(rg => rg.getValor).join(', '))
            console.log(`Telefones: ` + cliente.getTelefones.map(celular => `(${celular.getDdd}) ${celular.getNumero}`).join(', '));
            console.log(`Data de cadastro: ` + cliente.getDataCadastro.toLocaleDateString());
            console.log(`Produtos Consumidos: `+ cliente.getProdutosConsumidos.map(produto => produto.getNome).join(', '))
            console.log(`Servicos Consumidos: `+ cliente.getServicosConsumidos.map(servico => servico.getNome).join(', '))
            console.log(`Pets: `+ cliente.getPets.map(pet => pet.getNome).join(', '))
            console.log(`--------------------------------------`);
        });

        let execucao = true

        while (execucao){
            let opcao = entrada.receberNumero("Tecle enter para sair: ")
            switch(opcao){
                default:
                    execucao = false
                    break;
            }
        }
    }
}