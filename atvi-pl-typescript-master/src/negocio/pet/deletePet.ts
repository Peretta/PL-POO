import Entrada from "../../io/entrada";
import Pet from "../../modelo/pet";
import Produto from "../../modelo/produto";
import Delete from "./../delete";

export default class DeletePet extends Delete{
    private pets: Array<Pet>;
    private entrada: Entrada;

    constructor(pets: Array<Pet>) {
        super()
        this.pets = pets;
        this.entrada = new Entrada();
    }

    public deletar(): void {
        console.log(`\nExclusão de Produto`);
        this.pets.forEach((pet, index) => {
            console.log(`${index + 1}. Nome: ${pet.getNome} | Raça: R$ ${pet.getRaca}`);
        });

        let indice = this.entrada.receberNumero(`Por favor, informe o número do produto que deseja excluir: `) - 1;
        
        if (indice >= 0 && indice < this.pets.length) {
            let petRemovido = this.pets.splice(indice, 1);
            console.log(`\nProduto "${petRemovido[0].getNome}" removido com sucesso!\n`);
        } else {
            console.log(`\nProduto inválido. Nenhuma alteração foi feita.\n`);
        }
    }
}
