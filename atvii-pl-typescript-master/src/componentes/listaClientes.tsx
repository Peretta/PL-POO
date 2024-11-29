import { Component, ChangeEvent, FormEvent } from "react";

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

type State = {
    clientes: Cliente[];
    clienteSelecionado?: Cliente;
    pesquisa: string;
    modalAdicionarAberto: boolean;
    modalExcluirAberto: boolean;
    modalEditarAberto: boolean,
    novoCliente: Omit<Cliente, "id">;
};

export default class ListaClientes extends Component<{}, State> {
    state: State = {
        pesquisa: "",
        modalExcluirAberto: false,
        modalAdicionarAberto: false,
        modalEditarAberto: false,
        novoCliente: {
            nome: "",
            cpf: "",
            rg: "",
            dataCadastro: new Date().toISOString().split("T")[0],
            telefones: [],
            produtosConsumidos: [],
            servicosConsumidos: [],
            pets: [],
        },
        clientes: [
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
        ],
    };

    handlePesquisa = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ pesquisa: e.target.value });
    };

    selecionarCliente = (cliente: Cliente) => {
        this.setState({ clienteSelecionado: cliente });
    };

    fecharDetalhes = () => {
        this.setState({ clienteSelecionado: undefined });
    };

    abrirModalAdicionar = () => {
        this.setState({ modalAdicionarAberto: true });
    };

    fecharModalAdicionar = () => {
        this.setState({ modalAdicionarAberto: false });
    };
    abrirModalExcluir = () => {
        this.setState({ modalExcluirAberto: true });
    };

    fecharModalExcluir = () => {
        this.setState({ modalExcluirAberto: false });
    };
    abrirModalEditar = () => {
        this.setState({ modalEditarAberto: true });
    };

    fecharModalEditar = () => {
        this.setState({ modalEditarAberto: false });
    };

    handleNovoClienteChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            novoCliente: { ...prevState.novoCliente, [name]: value },
        }));
    };

    adicionarCliente = (e: FormEvent) => {
        e.preventDefault();
        const { clientes, novoCliente } = this.state;
        const novoId = clientes.length + 1;
        const cliente = { id: novoId, ...novoCliente };
        this.setState({
            clientes: [...clientes, cliente],
            modalAdicionarAberto: false,
            modalEditarAberto: false,
            modalExcluirAberto: false,
            novoCliente: {
                nome: "",
                cpf: "",
                rg: "",
                dataCadastro: new Date().toISOString().split("T")[0],
                telefones: [],
                produtosConsumidos: [],
                servicosConsumidos: [],
                pets: [],
            },
        });
    };

    render() {
        const { clientes, clienteSelecionado, pesquisa, modalAdicionarAberto, modalEditarAberto, modalExcluirAberto, novoCliente } = this.state;

        const clientesFiltrados = clientes.filter((cliente) =>
            cliente.nome.toLowerCase().includes(pesquisa.toLowerCase())
        );

        return (
            <div className="container">
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Pesquisar cliente..."
                    value={pesquisa}
                    onChange={this.handlePesquisa}
                    style={{borderColor: "black"}}
                />

                <div className="row">
                    {clientesFiltrados.map((cliente) => (
                        <div className="col-md-4 mb-3" key={cliente.id}>
                            <div
                                className="card h-100"
                                
                                style={{ cursor: "pointer" }}
                            >
                                <div className="card-body text-center">
                                    <h5 className="card-title" onClick={() => this.selecionarCliente(cliente)}>{cliente.nome}</h5>
                                    <button
                                        className="btn btn-outline-dark btn-sm me-2"
                                        title="Editar"
                                        onClick={this.abrirModalEditar}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button
                                        className="btn btn-outline-dark btn-sm"
                                        title="Excluir"
                                        onClick={this.abrirModalExcluir}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {clienteSelecionado && (
                    <div className="modal show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content" style={{borderColor: "black"}}>
                                <div className="modal-header" >
                                    <h5 className="modal-title">
                                        Detalhes do Cliente: {clienteSelecionado.nome}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={this.fecharDetalhes}
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
                                        onClick={this.fecharDetalhes}
                                    >
                                        Fechar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {modalAdicionarAberto && (
                    <div className="modal show d-block" tabIndex={-1} role="dialog" style={{backdropFilter: "blur(1px)"}}>
                        <div className="modal-dialog" role="document" style={{backdropFilter: "1px"}}>
                            <div className="modal-content" style={{backdropFilter: "1px"}}>
                                <form onSubmit={this.adicionarCliente}>
                                    <div className="modal-header">
                                        <h5 className="modal-title">Adicionar Cliente</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={this.fecharModalAdicionar}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <input
                                            type="text"
                                            name="nome"
                                            className="form-control mb-2"
                                            placeholder="Nome"
                                            value={novoCliente.nome}
                                            onChange={this.handleNovoClienteChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="cpf"
                                            className="form-control mb-2"
                                            placeholder="CPF"
                                            value={novoCliente.cpf}
                                            onChange={this.handleNovoClienteChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="rg"
                                            className="form-control mb-2"
                                            placeholder="RG"
                                            value={novoCliente.rg}
                                            onChange={this.handleNovoClienteChange}
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
                {modalEditarAberto && (
                    <div className="modal show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content" style={{borderColor: "black"}}>
                                {/*onSubmit*/}
                                <form>
                                    <div className="modal-header">
                                        <h5 className="modal-title">Editar Cliente</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={this.fecharModalEditar}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <input
                                            type="text"
                                            name="nome"
                                            className="form-control mb-2"
                                            placeholder="Nome"
                                            //value={}
                                            //onChange={}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="cpf"
                                            className="form-control mb-2"
                                            placeholder="CPF"
                                            //value={novoCliente.cpf}
                                            //onChange={this.handleNovoClienteChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="rg"
                                            className="form-control mb-2"
                                            placeholder="RG"
                                            //value={novoCliente.rg}
                                            //onChange={this.handleNovoClienteChange}
                                            required
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary">
                                            Editar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                {modalExcluirAberto && (
                    <div className="modal show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content" style={{borderColor: "black"}}>
                                {/*onSubmit*/}
                                <form>
                                    <div className="modal-header">
                                        <h5 className="modal-title">Deseja excluir realmente?</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={this.fecharModalExcluir}
                                        ></button>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-dark">
                                            Fechar
                                        </button>
                                        <button type="submit" className="btn btn-danger">
                                            Excluir
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                <button
                    className="btn btn-dark rounded-circle"
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        width: "60px",
                        height: "60px",
                    }}
                    onClick={this.abrirModalAdicionar}
                >
                    <i className="bi bi-plus"></i>
                </button>
            </div>
        );
    }
}
