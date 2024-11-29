import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Produto from "../../modelo/produto";

export default class ComprarProduto {
    private clientes: Array<Cliente>;
    private entrada: Entrada;
    private produtos: Array<Produto>;

    constructor(clientes: Array<Cliente>, produtos: Array<Produto>) {
        this.clientes = clientes;
        this.entrada = new Entrada();
        this.produtos = produtos;
    }

    public CompraProduto(): void {
        console.log("\n--- Comprar Produto ---");

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
        this.produtos.forEach((produto, index) => {
            console.log(`${index + 1}. ${produto.nome} - R$ ${produto.valor}`);
        });

        // Seleciona produto e adiciona ao cliente
        let execucao = true;
        while (execucao) {
            const indiceProduto = this.entrada.receberNumero("Escolha o produto (ou 0 para sair): ") - 1;
            if (indiceProduto === -1) {
                execucao = false;
                continue;
            }

            const produto = this.produtos[indiceProduto];
            cliente.adicionarProdutoConsumido(produto);
            console.log(`Produto "${produto.nome}" adicionado ao cliente "${cliente.nome}".`);
        }

        console.log("\nCompra finalizada!");
    }
}
