import Entrada from "../../io/entrada";
import Servico from "../../modelo/servico";
import Delete from ".././delete";

export default class DeletaServico extends Delete{
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public deletar(): void {
        console.log(`\nExclusão de Produto`);
        this.servicos.forEach((servico, index) => {
            console.log(`${index + 1}. Nome: ${servico.nome} | Preço: R$ ${servico.valor}`);
        });

        let indice = this.entrada.receberNumero(`Por favor, informe o número do produto que deseja excluir: `) - 1;
        
        if (indice >= 0 && indice < this.servicos.length) {
            let servicoRemovido = this.servicos.splice(indice, 1);
            console.log(`\nServico "${servicoRemovido[0].nome}" removido com sucesso!\n`);
        } else {
            console.log(`\nServico inválido. Nenhuma alteração foi feita.\n`);
        }
    }
}
