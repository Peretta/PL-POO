import { Component } from "react";
import AdotarPetModal from "./AdotarPet";
import EditarPetModal from "./EditarPet";
import ExcluirPetModal from "./ExcluirPet";
import FormularioCadastroPet from "./FormularioCadastroPet";
import FloatingButton from "./FloatingButtonProps";

type props = {
    tema: string;
};

type Pet = {
    id: number;
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
};

type State = {
    petSelecionado?: Pet;
    modalAberto: "adotar" | "editar" | "excluir" | "cadastrar" |null;
};

export default class ListaPets extends Component<props, State> {
    state: State = { modalAberto: null };

    pets: Pet[] = [
        { id: 1, nome: "Rex", tipo: "Cachorro", raca: "Labrador", genero: "Macho" },
        { id: 2, nome: "Mimi", tipo: "Gato", raca: "Persa", genero: "Fêmea" },
    ];

    abrirModal = (modal: "adotar" | "editar" | "excluir" | "cadastrar", pet?: Pet) => {
        this.setState({ modalAberto: modal, petSelecionado: pet });
    };

    fecharModal = () => {
        this.setState({ modalAberto: null, petSelecionado: undefined });
    };

    render() {
        const { petSelecionado, modalAberto } = this.state;
    
        return (
            <div className="container-fluid text-center">
                <table className="table table-light table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Raça</th>
                            <th>Gênero</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.pets.map((pet) => (
                            <tr key={pet.id}>
                                <td>{pet.id}</td>
                                <td>{pet.nome}</td>
                                <td>{pet.tipo}</td>
                                <td>{pet.raca}</td>
                                <td>{pet.genero}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-dark btn-sm me-2"
                                        onClick={() => this.abrirModal("adotar", pet)}
                                    >
                                        <i className="bi bi-heart"></i> Adotar
                                    </button>
                                    <button
                                        className="btn btn-outline-dark btn-sm me-2"
                                        onClick={() => this.abrirModal("editar", pet)}
                                    >
                                        <i className="bi bi-pencil"></i> Editar
                                    </button>
                                    <button
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={() => this.abrirModal("excluir", pet)}
                                    >
                                        <i className="bi bi-trash"></i> Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
    
                {/* Modais */}
                {modalAberto === "adotar" && petSelecionado && (
                    <AdotarPetModal petNome={petSelecionado.nome} onClose={this.fecharModal} />
                )}
                {modalAberto === "editar" && petSelecionado && (
                    <EditarPetModal petNome={petSelecionado.nome} onClose={this.fecharModal} />
                )}
                {modalAberto === "excluir" && petSelecionado && (
                    <ExcluirPetModal petNome={petSelecionado.nome} onClose={this.fecharModal} />
                )}
                {modalAberto === "cadastrar" && (
                    <FormularioCadastroPet tema="" onClose={this.fecharModal} />
                )}
                {/* Botão Flutuante */}
                <FloatingButton onClick={() => this.abrirModal("cadastrar")} />
            </div>
        );
    }
}