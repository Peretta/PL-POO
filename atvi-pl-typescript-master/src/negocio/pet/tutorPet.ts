import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Pet from "../../modelo/pet";

export default class ComprarProduto {
    private clientes: Array<Cliente>;
    private entrada: Entrada;
    private pets: Array<Pet>;

    constructor(clientes: Array<Cliente>, pets: Array<Pet>) {
        this.clientes = clientes;
        this.entrada = new Entrada();
        this.pets = pets;
    }

    public tutorPet(): void {
        console.log("\n--- Tutoria Pet ---");

        console
        // Seleciona cliente pelo índice
        console.log("Escolha o cliente:");
        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1}. ${cliente.nome} (${cliente.nomeSocial})`);
        });
        const indiceCliente = this.entrada.receberNumero("Número do cliente: ") - 1;
        const cliente = this.clientes[indiceCliente];

        // Exibe lista de produtos disponíveis
        console.log("\nPets:");
        this.pets.forEach((pet, index) => {
            console.log(`${index + 1}. ${pet.getNome} - ${pet.getRaca}`);
        });

        // Seleciona produto e adiciona ao cliente
        let execucao = true;
        while (execucao) {
            const indicePet = this.entrada.receberNumero("Escolha o pet (ou 0 para sair): ") - 1;
            if (indicePet === -1) {
                execucao = false;
                continue;
            }

            const pet = this.pets[indicePet];
            cliente.adicionarPet(pet);
            console.log(`Pet "${pet.getNome}" adicionado ao cliente "${cliente.nome}".`);
        }

        console.log("\nOperação de tutoria finalizada!");
    }
}
