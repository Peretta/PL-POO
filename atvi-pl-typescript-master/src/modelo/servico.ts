export default class Servico {
    public nome!: string
    public valor!: string
    
    constructor(nome: string, valor: string){
        this.nome = nome
        this.valor = valor
    }
    public get getNome(): string{
        return this.nome
    }
    public get getValor(): string{
        return this.getValor
    }
}