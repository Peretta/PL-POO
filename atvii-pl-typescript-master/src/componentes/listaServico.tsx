import { Component } from "react";
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

type State = {
    servicoSelecionado?: Servico;
    modalAberto: "adotar" | "editar" | "excluir" | "cadastrar" | null;
};

export default class ListaServicos extends Component<Props, State> {
    state: State = { modalAberto: null };

    servicos: Servico[] = [
        { id: 1, nome: "Banho", preco: 50 },
        { id: 2, nome: "Tosa", preco: 70 },
    ];

    abrirModal = (modal: "adotar" | "editar" | "excluir" | "cadastrar", servico?: Servico) => {
        this.setState({ modalAberto: modal, servicoSelecionado: servico });
    };

    fecharModal = () => {
        this.setState({ modalAberto: null, servicoSelecionado: undefined });
    };

    render() {
        const { servicoSelecionado, modalAberto } = this.state;

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
                        {this.servicos.map((servico) => (
                            <tr key={servico.id}>
                                <td>{servico.id}</td>
                                <td>{servico.nome}</td>
                                <td>R${servico.preco.toFixed(2)}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-dark btn-sm me-2"
                                        onClick={() => this.abrirModal("adotar", servico)}
                                    >
                                        <i className="bi bi-cart"></i> Contratar
                                    </button>
                                    <button
                                        className="btn btn-outline-dark btn-sm me-2"
                                        onClick={() => this.abrirModal("editar", servico)}
                                    >
                                        <i className="bi bi-pencil"></i> Editar
                                    </button>
                                    <button
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={() => this.abrirModal("excluir", servico)}
                                    >
                                        <i className="bi bi-trash"></i> Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {modalAberto === "adotar" && servicoSelecionado && (
                    <AdotarServicoModal servicoNome={servicoSelecionado.nome} onClose={this.fecharModal} />
                )}
                {modalAberto === "editar" && servicoSelecionado && (
                    <EditarServicoModal servicoNome={servicoSelecionado.nome} onClose={this.fecharModal} />
                )}
                {modalAberto === "excluir" && servicoSelecionado && (
                    <ExcluirServicoModal servicoNome={servicoSelecionado.nome} onClose={this.fecharModal} />
                )}
                {modalAberto === "cadastrar" && (
                    <FormularioCadastrarServico tema="" onClose={this.fecharModal} />
                )}
                {/* Botão Flutuante */}
                <FloatingButton onClick={() => this.abrirModal("cadastrar")} />
            </div>
        );
    }
}
