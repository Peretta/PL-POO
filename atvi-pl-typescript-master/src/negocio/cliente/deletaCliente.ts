import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Delete from ".././delete";
import { clear } from "console";
let entrada = new Entrada();

export default class DeletaCliente extends Delete {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
    }

    public deletar(): void {
        clear();
        console.log(`\nExcluir Cliente`);
        let cpf = entrada.receberTexto("Digite o CPF do cliente a ser deletado: ");
        
        // Procurar o cliente pelo CPF
        let index = this.clientes.findIndex(cliente => cliente.getCpf.getValor === cpf);
        
        if (index !== -1) {
            let cliente = this.clientes[index];
            console.log(`Cliente encontrado: ${cliente.nome} - CPF: ${cliente.getCpf.getValor}`);
            
            // Confirmação antes de excluir
            let confirmacao = entrada.receberTexto("Tem certeza que deseja excluir este cliente? (s/n): ");
            
            if (confirmacao.toLowerCase() === 's') {
                // Remove o cliente do array
                this.clientes.splice(index, 1);
                console.log("Cliente excluído com sucesso!");
            } else {
                console.log("Operação cancelada.");
            }
        } else {
            console.log("Cliente não encontrado.");
        }
    }
}
