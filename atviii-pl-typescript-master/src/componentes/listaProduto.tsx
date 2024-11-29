import React, { useState } from "react";
import AdotarProdutoModal from "./AdotarProdutoModal";
import EditarProdutoModal from "./EditarProdutoModal";
import ExcluirProdutoModal from "./ExcluirProdutoModal";
import FormularioCadastrarProduto from "./FormularioCadastroProduto";
import FloatingButton from "./FloatingButtonProps";

type Props = {
    tema: string;
};

type Produto = {
    id: number;
    nome: string;
    preco: number;
};

const ListaProdutos: React.FC<Props> = ({ tema }) => {
    // Hooks para gerenciar o estado do modal e produto selecionado
    const [modalAberto, setModalAberto] = useState<"adotar" | "editar" | "excluir" | "cadastrar" | null>(null);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | undefined>();

    // Lista de produtos
    const produtos: Produto[] = [
        { id: 1, nome: "Banho", preco: 50 },
        { id: 2, nome: "Tosa", preco: 70 },
    ];

    // Abrir modal
    const abrirModal = (modal: "adotar" | "editar" | "excluir" | "cadastrar", produto?: Produto) => {
        setModalAberto(modal);
        setProdutoSelecionado(produto);
    };

    // Fechar modal
    const fecharModal = () => {
        setModalAberto(null);
        setProdutoSelecionado(undefined);
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
                    {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.nome}</td>
                            <td>R${produto.preco.toFixed(2)}</td>
                            <td>
                                <button
                                    className="btn btn-outline-dark btn-sm me-2"
                                    onClick={() => abrirModal("adotar", produto)}
                                >
                                    <i className="bi bi-cart"></i> Contratar
                                </button>
                                <button
                                    className="btn btn-outline-dark btn-sm me-2"
                                    onClick={() => abrirModal("editar", produto)}
                                >
                                    <i className="bi bi-pencil"></i> Editar
                                </button>
                                <button
                                    className="btn btn-outline-dark btn-sm"
                                    onClick={() => abrirModal("excluir", produto)}
                                >
                                    <i className="bi bi-trash"></i> Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modais */}
            {modalAberto === "adotar" && produtoSelecionado && (
                <AdotarProdutoModal produtoNome={produtoSelecionado.nome} onClose={fecharModal} />
            )}
            {modalAberto === "editar" && produtoSelecionado && (
                <EditarProdutoModal produtoNome={produtoSelecionado.nome} onClose={fecharModal} />
            )}
            {modalAberto === "excluir" && produtoSelecionado && (
                <ExcluirProdutoModal produtoNome={produtoSelecionado.nome} onClose={fecharModal} />
            )}
            {modalAberto === "cadastrar" && (
                <FormularioCadastrarProduto tema={tema} onClose={fecharModal} />
            )}

            {/* Botão Flutuante */}
            <FloatingButton onClick={() => abrirModal("cadastrar")} />
        </div>
    );
};

export default ListaProdutos;
