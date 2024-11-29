import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import { clear } from "console";

export default class EditaCliente {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
    }

    public editar(): void {
        clear();
        console.log(`\nEditar Cliente`);
        let entrada = new Entrada();
        let cpf = entrada.receberTexto("Digite o CPF do cliente a ser editado: ");

        // Procurar o cliente pelo CPF
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf);

        if (cliente) {
            console.log(`Cliente encontrado: ${cliente.nome} - CPF: ${cliente.getCpf.getValor}`);


            let editarNome = entrada.receberTexto("Deseja alterar o nome? (s/n): ");
            if (editarNome.toLowerCase() === 's') {
                let novoNome = entrada.receberTexto("Digite o novo nome: ");
                cliente.nome = novoNome;
            }

            let editarNomeSocial = entrada.receberTexto("Deseja alterar o nome social? (s/n): ");
            if (editarNomeSocial.toLowerCase() === 's') {
                let novoNomeSocial = entrada.receberTexto("Digite o novo nome social: ");
                cliente.nomeSocial = novoNomeSocial;
            }
            console.log("Cliente editado com sucesso!");


        } else {
            console.log("Cliente não encontrado.");
        }
    }
}
