import React, { useState, ChangeEvent, FormEvent } from "react";

type Cliente = {
    id: number;
    nome: string;
    cpf: string;
    rg: string;
    dataCadastro: string;
    telefones: string[];
    produtosConsumidos: string[];
    servicosConsumidos: string[];
    pets: string[];
};

const ListaClientes: React.FC = () => {
    // Estados com React Hooks
    const [clientes, setClientes] = useState<Cliente[]>([
        {
            id: 1,
            nome: "João Silva",
            cpf: "123.456.789-00",
            rg: "MG-12.345.678",
            dataCadastro: "2023-01-10",
            telefones: ["(31) 98765-4321"],
            produtosConsumidos: ["Ração Premium", "Coleira"],
            servicosConsumidos: ["Banho", "Tosa"],
            pets: ["Rex", "Mimi"],
        },
        {
            id: 2,
            nome: "Maria Oliveira",
            cpf: "987.654.321-00",
            rg: "SP-98.765.432",
            dataCadastro: "2023-02-15",
            telefones: ["(11) 91234-5678"],
            produtosConsumidos: ["Brinquedo para gatos"],
            servicosConsumidos: ["Consulta veterinária"],
            pets: ["Blue"],
        },
    ]);
    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | undefined>();
    const [pesquisa, setPesquisa] = useState<string>("");
    const [modalAdicionarAberto, setModalAdicionarAberto] = useState<boolean>(false);
    const [modalEditarAberto, setModalEditarAberto] = useState<boolean>(false);
    const [modalExcluirAberto, setModalExcluirAberto] = useState<boolean>(false);
    const [novoCliente, setNovoCliente] = useState<Omit<Cliente, "id">>({
        nome: "",
        cpf: "",
        rg: "",
        dataCadastro: new Date().toISOString().split("T")[0],
        telefones: [],
        produtosConsumidos: [],
        servicosConsumidos: [],
        pets: [],
    });

    // Funções de gerenciamento de estados
    const handlePesquisa = (e: ChangeEvent<HTMLInputElement>) => setPesquisa(e.target.value);

    const selecionarCliente = (cliente: Cliente) => setClienteSelecionado(cliente);

    const fecharDetalhes = () => setClienteSelecionado(undefined);

    const abrirModalAdicionar = () => setModalAdicionarAberto(true);

    const fecharModalAdicionar = () => setModalAdicionarAberto(false);

    const abrirModalEditar = () => setModalEditarAberto(true);

    const fecharModalEditar = () => setModalEditarAberto(false);

    const abrirModalExcluir = () => setModalExcluirAberto(true);

    const fecharModalExcluir = () => setModalExcluirAberto(false);

    const handleNovoClienteChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNovoCliente((prev) => ({ ...prev, [name]: value }));
    };

    const adicionarCliente = (e: FormEvent) => {
        e.preventDefault();
        const novoId = clientes.length + 1;
        const cliente = { id: novoId, ...novoCliente };
        setClientes((prev) => [...prev, cliente]);
        setModalAdicionarAberto(false);
        setNovoCliente({
            nome: "",
            cpf: "",
            rg: "",
            dataCadastro: new Date().toISOString().split("T")[0],
            telefones: [],
            produtosConsumidos: [],
            servicosConsumidos: [],
            pets: [],
        });
    };

    const clientesFiltrados = clientes.filter((cliente) =>
        cliente.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
        <div className="container">
            {/* Campo de Pesquisa */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Pesquisar cliente..."
                value={pesquisa}
                onChange={handlePesquisa}
                style={{ borderColor: "black" }}
            />

            {/* Lista de Clientes */}
            <div className="row">
                {clientesFiltrados.map((cliente) => (
                    <div className="col-md-4 mb-3" key={cliente.id}>
                        <div className="card h-100" style={{ cursor: "pointer" }}>
                            <div className="card-body text-center">
                                <h5 className="card-title" onClick={() => selecionarCliente(cliente)}>
                                    {cliente.nome}
                                </h5>
                                <button
                                    className="btn btn-outline-dark btn-sm me-2"
                                    title="Editar"
                                    onClick={abrirModalEditar}
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                    className="btn btn-outline-dark btn-sm"
                                    title="Excluir"
                                    onClick={abrirModalExcluir}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Detalhes */}
            {clienteSelecionado && (
                <div className="modal show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{ borderColor: "black" }}>
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Detalhes do Cliente: {clienteSelecionado.nome}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={fecharDetalhes}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>CPF:</strong> {clienteSelecionado.cpf}</p>
                                <p><strong>RG:</strong> {clienteSelecionado.rg}</p>
                                <p><strong>Data de Cadastro:</strong> {clienteSelecionado.dataCadastro}</p>
                                <p><strong>Telefones:</strong> {clienteSelecionado.telefones.join(", ")}</p>
                                <p><strong>Produtos Consumidos:</strong> {clienteSelecionado.produtosConsumidos.join(", ")}</p>
                                <p><strong>Serviços Consumidos:</strong> {clienteSelecionado.servicosConsumidos.join(", ")}</p>
                                <p><strong>Pets:</strong> {clienteSelecionado.pets.join(", ")}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={fecharDetalhes}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Adicionar Cliente */}
            {modalAdicionarAberto && (
                <div className="modal show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form onSubmit={adicionarCliente}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Adicionar Cliente</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={fecharModalAdicionar}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <input
                                        type="text"
                                        name="nome"
                                        className="form-control mb-2"
                                        placeholder="Nome"
                                        value={novoCliente.nome}
                                        onChange={handleNovoClienteChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="cpf"
                                        className="form-control mb-2"
                                        placeholder="CPF"
                                        value={novoCliente.cpf}
                                        onChange={handleNovoClienteChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="rg"
                                        className="form-control mb-2"
                                        placeholder="RG"
                                        value={novoCliente.rg}
                                        onChange={handleNovoClienteChange}
                                        required
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">
                                        Adicionar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Botão Flutuante */}
            <button
                className="btn btn-dark rounded-circle"
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    width: "60px",
                    height: "60px",
                }}
                onClick={abrirModalAdicionar}
            >
                <i className="bi bi-plus"></i>
            </button>
        </div>
    );
};

export default ListaClientes;
