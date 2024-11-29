import { Component } from "react";
import AdotarProdutoModal from "./AdotarProdutoModal";
import EditarProdutoModal from "./EditarProdutoModal";
import ExcluirProdutoModal from "./ExcluirProdutoModal";
import FormularioCadastrarProduto from "./FormularioCadastroProduto";
import FloatingButton from "./FloatingButtonProps"

type Props = {
    tema: string;
};

type Produto = {
    id: number;
    nome: string;
    preco: number;
};

type State = {
    produtoSelecionado?: Produto;
    modalAberto: "adotar" | "editar" | "excluir" | "cadastrar" | null;
};

export default class ListaProdutos extends Component<Props, State> {
    state: State = { modalAberto: null };

    produtos: Produto[] = [
        { id: 1, nome: "Banho", preco: 50 },
        { id: 2, nome: "Tosa", preco: 70 },
    ];

    abrirModal = (modal: "adotar" | "editar" | "excluir" | "cadastrar", produto?: Produto) => {
        this.setState({ modalAberto: modal, produtoSelecionado: produto });
    };

    fecharModal = () => {
        this.setState({ modalAberto: null, produtoSelecionado: undefined });
    };

    render() {
        const { produtoSelecionado, modalAberto } = this.state;

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
                        {this.produtos.map((produto) => (
                            <tr key={produto.id}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>R${produto.preco.toFixed(2)}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-dark btn-sm me-2"
                                        onClick={() => this.abrirModal("adotar", produto)}
                                    >
                                        <i className="bi bi-cart"></i> Contratar
                                    </button>
                                    <button
                                        className="btn btn-outline-dark btn-sm me-2"
                                        onClick={() => this.abrirModal("editar", produto)}
                                    >
                                        <i className="bi bi-pencil"></i> Editar
                                    </button>
                                    <button
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={() => this.abrirModal("excluir", produto)}
                                    >
                                        <i className="bi bi-trash"></i> Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {modalAberto === "adotar" && produtoSelecionado && (
                    <AdotarProdutoModal produtoNome={produtoSelecionado.nome} onClose={this.fecharModal} />
                )}
                {modalAberto === "editar" && produtoSelecionado && (
                    <EditarProdutoModal produtoNome={produtoSelecionado.nome} onClose={this.fecharModal} />
                )}
                {modalAberto === "excluir" && produtoSelecionado && (
                    <ExcluirProdutoModal produtoNome={produtoSelecionado.nome} onClose={this.fecharModal} />
                )}
                {modalAberto === "cadastrar" && (
                    <FormularioCadastrarProduto tema={this.props.tema} onClose={this.fecharModal} />
                )}
                <FloatingButton onClick={() => this.abrirModal("cadastrar")} />
            </div>
        );
    }
}
