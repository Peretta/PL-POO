import Listagem from "./../listagem";
import Entrada from "../../io/entrada";

import { clear } from "console";
import Pet from "../../modelo/pet";
let entrada = new Entrada();

export default class ListagemPets extends Listagem {
    private pets: Array<Pet>
    constructor(pets: Array<Pet>) {
        super()
        this.pets = pets
    }
    public listar(): void {
        clear()
        console.log(`\n Lista de todos os clientes:`);
        this.pets.forEach(pet => {
            console.log(`--------------------------------------`);
            console.log(`Nome: ` + pet.getNome);
            console.log(`Genêro: ` + pet.getGenero);
            console.log(`Raça: ` + pet.getRaca);
            console.log(`Tipo: ` + pet.getTipo);
            console.log(`--------------------------------------`);
        });
        let execucao = true

        while (execucao){
            let opcao = entrada.receberNumero("Tecle enter para sair: ")
            switch(opcao){
                default:
                    execucao = false
                    break;
            }
        }
    }
}