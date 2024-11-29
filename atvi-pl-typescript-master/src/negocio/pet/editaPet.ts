import Entrada from "../../io/entrada";
import Pet from "../../modelo/pet";
import Editar from ".././editar";

export default class editarPets extends Editar{
    private pets: Array<Pet>;
    private entrada: Entrada;

    constructor(pets: Array<Pet>) {
        super()
        this.pets = pets;
        this.entrada = new Entrada();
    }

    public editar(): void {
        console.log(`\nEdição de Pets`);
        this.pets.forEach((pet, index) => {
            console.log(`${index + 1}. Nome: ${pet.getNome} | Raço: ${pet.getRaca}`);
        });

        let indice = this.entrada.receberNumero(`Por favor, informe o número do produto que deseja editar: `) - 1;
        let pet = this.pets[indice];

        let novoNome = this.entrada.receberTexto(`Informe o novo nome do pet ou pressione ENTER para manter o nome atual (${pet.getNome}): `);
        let novaRaca = this.entrada.receberTexto(`Informe a nova raça (${pet.getRaca}): `);

        if (novoNome) pet.setNome = novoNome;
        if (novaRaca) pet.setRaca = novaRaca;

        console.log(`\nProduto atualizado com sucesso!\n`);
    }
}
