import Entrada from "../../io/entrada";
import Pet from "../../modelo/pet";
import pet from "../../modelo/pet";
import Cadastro from ".././cadastro";

export default class CadastroPets extends Cadastro {
    private pets: Array<pet>;
    private entrada: Entrada;

    constructor(pets: Array<pet>) {
        super();
        this.pets = pets;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro de Pet`);

        let nome = this.entrada.receberTexto(`Por favor informe o nome do pet: `);
        let raca = this.entrada.receberTexto(`Por favor informe o raça do pet: `);
        let genero = this.entrada.receberTexto(`Por favor informe o genero do pet: `);
        let tipo = this.entrada.receberTexto(`Por favor informe o tipo do pet: `);

        let pet = new Pet(nome, raca, genero, tipo);
        this.pets.push(pet);

        console.log(`\nProduto cadastrado com sucesso!\n`);
    }
}