export default class Produto {
    private static contadorId: number = 0; // Contador para gerar IDs únicos
    public id: number;  // Novo campo ID
    public nome: string;
    public valor: string;

    constructor(nome: string, valor: string) {
        this.id = ++Produto.contadorId;  // Incrementa o ID a cada novo produto
        this.nome = nome;
        this.valor = valor;
    }

    public get getNome(): string {
        return this.nome;
    }

    public get getValor(): string {
        return this.valor;
    }

    public get getId(): number {
        return this.id;
    }
}
