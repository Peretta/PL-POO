import Entrada from "../../io/entrada"
import Cliente from "../../modelo/cliente"
import CPF from "../../modelo/cpf"
import RG from "../../modelo/rg"
import Telefone from "../../modelo/telefone"
import Cadastro from ".././cadastro"

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        let execucao = true
        console.log(`\nInício do cadastro do cliente`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `)
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)
        let valor_cpf = this.entrada.receberTexto(`Por favor informe o número do cpf: `);
        let dataCpf = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);
        let partesDataCpf = dataCpf.split('/')
        let valor_rg = this.entrada.receberTexto(`Por favor informe o seu rg: `)
        let dataRg = this.entrada.receberTexto(`Por favor informe a data de emissão do RG, no padrão dd/mm/yyyy: `);
        let telefones = []
        while (execucao){
            let ddd = this.entrada.receberTexto(`Por favor informe seu DDD: `);
            let numero = this.entrada.receberTexto(`Por favor informe o seu número: `)
            let telefone = new Telefone(ddd, numero)
            telefones.push(telefone)

            let resposta = this.entrada.receberNumero(`Deseja cadastrar mais números? 0-Não | 1- Sim`)
            
            if (resposta == 0){
                execucao = false
            }
        }
        let partesDataRg = dataRg.split('/')
        let anoCpf = new Number(partesDataCpf[2].valueOf()).valueOf()
        let mesCpf = new Number(partesDataCpf[1].valueOf()).valueOf()
        let diaCpf = new Number(partesDataCpf[0].valueOf()).valueOf()
        let anoRg = new Number(partesDataRg[2].valueOf()).valueOf()
        let mesRg = new Number(partesDataRg[1].valueOf()).valueOf()
        let diaRg = new Number(partesDataRg[0].valueOf()).valueOf()
        let dataEmissaoCpf = new Date(anoCpf, mesCpf, diaCpf)
        let dataEmissaoRg = new Date(anoRg, mesRg, diaRg)
        let cpf = new CPF(valor_cpf, dataEmissaoCpf);
        let rgs = []
        let rg = new RG(valor_rg, dataEmissaoRg)
        rgs.push(rg)
        let cliente = new Cliente(nome, nomeSocial, cpf, rgs, telefones);
        this.clientes.push(cliente)
        console.log(`\nCadastro concluído :)\n`);
    }
}