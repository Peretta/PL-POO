import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto";
import Servico from "../../modelo/servico";
import Cadastro from ".././cadastro";

export default class CadastroServico extends Cadastro {
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro de servico`);

        let nome = this.entrada.receberTexto(`Por favor informe o nome do servico: `);
        let valor = this.entrada.receberTexto(`Por favor informe o preço do servico: `);

        let servico = new Produto(nome, valor);
        this.servicos.push(servico);

        console.log(`\n Servico cadastrado com sucesso!\n`);
    }
}