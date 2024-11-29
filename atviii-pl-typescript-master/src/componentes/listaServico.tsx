import React, { useState } from "react";
import AdotarServicoModal from "./AdotarServicoModal";
import EditarServicoModal from "./EditarServicoModal";
import ExcluirServicoModal from "./ExcluirServicoModal";
import FormularioCadastrarServico from "./FormularioCadastroServico";
import FloatingButton from "./FloatingButtonProps";

type Props = {
    tema: string;
};

type Servico = {
    id: number;
    nome: string;
    preco: number;
};

const ListaServicos: React.FC<Props> = () => {
    const [modalAberto, setModalAberto] = useState<"adotar" | "editar" | "excluir" | "cadastrar" | null>(null);
    const [servicoSelecionado, setServicoSelecionado] = useState<Servico | undefined>();

    const servicos: Servico[] = [
        { id: 1, nome: "Banho", preco: 50 },
        { id: 2, nome: "Tosa", preco: 70 },
    ];

    const abrirModal = (modal: "adotar" | "editar" | "excluir" | "cadastrar", servico?: Servico) => {
        setModalAberto(modal);
        setServicoSelecionado(servico);
    };

    const fecharModal = () => {
        setModalAberto(null);
        setServicoSelecionado(undefined);
    };

    return (
        <div className="container-fluid text-center">
            <table className="table table-light table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {servicos.map((servico) => (
                        <tr key={servico.id}>
                            <td>{servico.id}</td>
                            <td>{servico.nome}</td>
                            <td>R${servico.preco.toFixed(2)}</td>
                            <td>
                                <button
                                    className="btn btn-outline-dark btn-sm me-2"
                                    onClick={() => abrirModal("adotar", servico)}
                                >
                                    <i className="bi bi-cart"></i> Contratar
                                </button>
                                <button
                                    className="btn btn-outline-dark btn-sm me-2"
                                    onClick={() => abrirModal("editar", servico)}
                                >
                                    <i className="bi bi-pencil"></i> Editar
                                </button>
                                <button
                                    className="btn btn-outline-dark btn-sm"
                                    onClick={() => abrirModal("excluir", servico)}
                                >
                                    <i className="bi bi-trash"></i> Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalAberto === "adotar" && servicoSelecionado && (
                <AdotarServicoModal servicoNome={servicoSelecionado.nome} onClose={fecharModal} />
            )}
            {modalAberto === "editar" && servicoSelecionado && (
                <EditarServicoModal servicoNome={servicoSelecionado.nome} onClose={fecharModal} />
            )}
            {modalAberto === "excluir" && servicoSelecionado && (
                <ExcluirServicoModal servicoNome={servicoSelecionado.nome} onClose={fecharModal} />
            )}
            {modalAberto === "cadastrar" && (
                <FormularioCadastrarServico tema="" onClose={fecharModal} />
            )}
            {/* Botão Flutuante */}
            <FloatingButton onClick={() => abrirModal("cadastrar")} />
        </div>
    );
};

export default ListaServicos;
