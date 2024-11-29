import { Component, ChangeEvent, FormEvent } from "react";

type EditarProdutoModalProps = {
    produtoNome: string;
    onClose: () => void;
};

type EditarProdutoState = {
    novoNome: string;
};

export default class EditarProdutoModal extends Component<EditarProdutoModalProps, EditarProdutoState> {
    state: EditarProdutoState = { novoNome: this.props.produtoNome };

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ novoNome: e.target.value });
    };

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert(`Produto renomeado para: ${this.state.novoNome}`);
        this.props.onClose();
    };

    render() {
        const { onClose } = this.props;
        return (
            <div className="modal show d-block" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Produto</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.novoNome}
                                    onChange={this.handleChange}
                                />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>
                                Cancelar
                            </button>
                            <button className="btn btn-primary" onClick={this.handleSubmit}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
