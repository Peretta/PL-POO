import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto";
import Delete from ".././delete";

export default class DeletaProduto extends Delete{
    private produtos: Array<Produto>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public deletar(): void {
        console.log(`\nExclusão de Produto`);
        this.produtos.forEach((produto, index) => {
            console.log(`${index + 1}. Nome: ${produto.nome} | Preço: R$ ${produto.valor}`);
        });

        let indice = this.entrada.receberNumero(`Por favor, informe o número do produto que deseja excluir: `) - 1;
        
        if (indice >= 0 && indice < this.produtos.length) {
            let produtoRemovido = this.produtos.splice(indice, 1);
            console.log(`\nProduto "${produtoRemovido[0].nome}" removido com sucesso!\n`);
        } else {
            console.log(`\nProduto inválido. Nenhuma alteração foi feita.\n`);
        }
    }
}
