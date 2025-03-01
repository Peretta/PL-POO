import Cliente from "./cliente"
import Pet from "./pet"
import Produto from "./produto"
import Servico from "./servico"

export default class Empresa{
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private servicos: Array<Servico>
    private pets: Array<Pet>
    constructor(){
        this.clientes = []
        this.produtos = []
        this.servicos = []
        this.pets = []
    }
    public get getClientes(){
        return this.clientes
    }
    public get getProdutos(){
        return this.produtos
    }
    public get getServicos(){
        return this.servicos
    }
    public get getPets(){
        return this.pets
    }
    adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
      }
    
    adicionarProduto(produto: Produto): void {
        this.produtos.push(produto);
      }
    
    adicionarServico(servico: Servico): void {
        this.servicos.push(servico);
    }
    adicionarPet(pet: Pet): void {
        this.pets.push(pet);
    }

}