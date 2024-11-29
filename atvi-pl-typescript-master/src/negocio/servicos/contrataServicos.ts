import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Servico from "../../modelo/servico";

export default class ContrataServico {
    private clientes: Array<Cliente>;
    private entrada: Entrada;
    private servicos: Array<Servico>;

    constructor(clientes: Array<Cliente>, servicos: Array<Servico>) {
        this.clientes = clientes;
        this.entrada = new Entrada();
        this.servicos = servicos;
    }

    public ContrataServico(): void {
        console.log("\n--- Contratar Servicos ---");

        console
        // Seleciona cliente pelo índice
        console.log("Escolha o cliente:");
        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1}. ${cliente.nome} (${cliente.nomeSocial})`);
        });
        const indiceCliente = this.entrada.receberNumero("Número do cliente: ") - 1;
        const cliente = this.clientes[indiceCliente];

        // Exibe lista de produtos disponíveis
        console.log("\nProdutos disponíveis:");
        this.servicos.forEach((servico, index) => {
            console.log(`${index + 1}. ${servico.nome} - R$ ${servico.valor}`);
        });

        // Seleciona produto e adiciona ao cliente
        let execucao = true;
        while (execucao) {
            const indiceProduto = this.entrada.receberNumero("Escolha o produto (ou 0 para sair): ") - 1;
            if (indiceProduto === -1) {
                execucao = false;
                continue;
            }

            const servico = this.servicos[indiceProduto];
            cliente.adicionarServicoConsumido(servico);
            console.log(`Servico "${servico.nome}" adicionado ao cliente "${servico.nome}".`);
        }

        console.log("\n Contrato finalizado!");
        
    }
}
