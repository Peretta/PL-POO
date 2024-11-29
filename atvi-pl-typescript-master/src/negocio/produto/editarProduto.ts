import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto";
import Editar from ".././editar";

export default class EditaProduto extends Editar{
    private produtos: Array<Produto>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public editar(): void {
        console.log(`\nEdição de Produto`);
        this.produtos.forEach((produto, index) => {
            console.log(`${index + 1}. Nome: ${produto.nome} | Preço: R$ ${produto.valor}`);
        });

        let indice = this.entrada.receberNumero(`Por favor, informe o número do produto que deseja editar: `) - 1;
        let produto = this.produtos[indice];

        let novoNome = this.entrada.receberTexto(`Informe o novo nome do produto ou pressione ENTER para manter o nome atual (${produto.nome}): `);
        let novoPreco = this.entrada.receberTexto(`Informe o novo preço ou pressione 0 para manter o preço atual (R$ ${produto.valor}): `);

        if (novoNome) produto.nome = novoNome;
        if (Number(novoPreco) > 0) produto.valor = novoPreco;

        console.log(`\nProduto atualizado com sucesso!\n`);
    }
}
