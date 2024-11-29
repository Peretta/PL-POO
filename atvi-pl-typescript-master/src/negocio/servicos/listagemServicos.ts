import Servico from "../../modelo/servico";
import Listagem from ".././listagem";
import Entrada from "../../io/entrada";

let entrada = new Entrada();

export default class ListagemProdutos extends Listagem{
    private servicos: Array<Servico>;

    constructor(produtos: Array<Servico>) {
        super()
        this.servicos = produtos;
    }

    public listar(): void {
        console.log(`\nLista de Produtos:`);
        
        this.servicos.forEach((servico, index) => {
            console.log(`${index + 1}. Nome: ${servico.nome} | Preço: R$ : ${servico.valor} `);
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
