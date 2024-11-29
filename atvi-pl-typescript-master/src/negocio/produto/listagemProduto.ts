import Produto from "../../modelo/produto";
import Listagem from ".././listagem";
import Entrada from "../../io/entrada";

let entrada = new Entrada();

export default class ListagemProdutos extends Listagem{
    private produtos: Array<Produto>;

    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos;
    }

    public listar(): void {
        console.log(`\nLista de Produtos:`);
        
        this.produtos.forEach((produto, index) => {
            console.log(`${index + 1}. Nome: ${produto.nome} | Preço: R$ : ${produto.valor} `);
        });

        console.log(`\n`);

        let execucao = true

        while (execucao){
            let opcao = entrada.receberNumero("Digite qualquer tecla")
            switch(opcao){
                default:
                    execucao = false
                    break;
            }
        }
    }
    
}
