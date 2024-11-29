import React, { useState } from "react";
import AdotarPetModal from "./AdotarPet";
import EditarPetModal from "./EditarPet";
import ExcluirPetModal from "./ExcluirPet";
import FormularioCadastroPet from "./FormularioCadastroPet";
import FloatingButton from "./FloatingButtonProps"

type Props = {
    tema: string;
};

type Pet = {
    id: number;
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
};

const ListaPets: React.FC<Props> = ({ tema }) => {
    // Estados com React Hooks
    const [modalAberto, setModalAberto] = useState<"adotar" | "editar" | "excluir" | "cadastrar" | null>(null);
    const [petSelecionado, setPetSelecionado] = useState<Pet | undefined>();

    // Lista de pets
    const pets: Pet[] = [
        { id: 1, nome: "Rex", tipo: "Cachorro", raca: "Labrador", genero: "Macho" },
        { id: 2, nome: "Mimi", tipo: "Gato", raca: "Persa", genero: "Fêmea" },
    ];

    // Função para abrir modal
    const abrirModal = (modal: "adotar" | "editar" | "excluir" | "cadastrar", pet?: Pet) => {
        setModalAberto(modal);
        setPetSelecionado(pet);
    };

    // Função para fechar modal
    const fecharModal = () => {
        setModalAberto(null);
        setPetSelecionado(undefined);
    };

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
                    {pets.map((pet) => (
                        <tr key={pet.id}>
                            <td>{pet.id}</td>
                            <td>{pet.nome}</td>
                            <td>{pet.tipo}</td>
                            <td>{pet.raca}</td>
                            <td>{pet.genero}</td>
                            <td>
                                <button
                                    className="btn btn-outline-dark btn-sm me-2"
                                    onClick={() => abrirModal("adotar", pet)}
                                >
                                    <i className="bi bi-heart"></i> Adotar
                                </button>
                                <button
                                    className="btn btn-outline-dark btn-sm me-2"
                                    onClick={() => abrirModal("editar", pet)}
                                >
                                    <i className="bi bi-pencil"></i> Editar
                                </button>
                                <button
                                    className="btn btn-outline-dark btn-sm"
                                    onClick={() => abrirModal("excluir", pet)}
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
                <AdotarPetModal petNome={petSelecionado.nome} onClose={fecharModal} />
            )}
            {modalAberto === "editar" && petSelecionado && (
                <EditarPetModal petNome={petSelecionado.nome} onClose={fecharModal} />
            )}
            {modalAberto === "excluir" && petSelecionado && (
                <ExcluirPetModal petNome={petSelecionado.nome} onClose={fecharModal} />
            )}
            {modalAberto === "cadastrar" && (
                <FormularioCadastroPet tema={tema} onClose={fecharModal} />
            )}

            {/* Botão Flutuante */}
            <FloatingButton onClick={() => abrirModal("cadastrar")} />
        </div>
    );
};

export default ListaPets;
