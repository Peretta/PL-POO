import { Component, ChangeEvent, FormEvent } from "react";

type EditarServicoModalProps = {
    servicoNome: string;
    onClose: () => void;
};

type EditarServicoState = {
    novoNome: string;
};

export default class EditarServicoModal extends Component<EditarServicoModalProps, EditarServicoState> {
    state: EditarServicoState = { novoNome: this.props.servicoNome };

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ novoNome: e.target.value });
    };

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert(`Serviço renomeado para: ${this.state.novoNome}`);
        this.props.onClose();
    };

    render() {
        const { onClose } = this.props;
        return (
            <div className="modal show d-block" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Serviço</h5>
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
