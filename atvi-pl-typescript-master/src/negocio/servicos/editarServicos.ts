import Entrada from "../../io/entrada";
import Servico from "../../modelo/servico";
import Editar from ".././editar";

export default class EditaProduto extends Editar{
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public editar(): void {
        console.log(`\nEdição de Produto`);
        this.servicos.forEach((servico, index) => {
            console.log(`${index + 1}. Nome: ${servico.nome} | Preço: R$ ${servico.valor}`);
        });

        let indice = this.entrada.receberNumero(`Por favor, informe o número do produto que deseja editar: `) - 1;
        let servico = this.servicos[indice];

        let novoNome = this.entrada.receberTexto(`Informe o novo nome do produto ou pressione ENTER para manter o nome atual (${servico.nome}): `);
        let novoPreco = this.entrada.receberTexto(`Informe o novo preço ou pressione 0 para manter o preço atual (R$ ${servico.valor}): `);

        if (novoNome) servico.nome = novoNome;
        if (Number(novoPreco) > 0) servico.valor = novoPreco;

        console.log(`\nProduto atualizado com sucesso!\n`);
    }
}
