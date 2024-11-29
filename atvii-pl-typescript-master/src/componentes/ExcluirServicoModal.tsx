import { Component } from "react";

type ExcluirServicoModalProps = {
    servicoNome: string;
    onClose: () => void;
};

export default class ExcluirServicoModal extends Component<ExcluirServicoModalProps> {
    render() {
        const { servicoNome, onClose } = this.props;
        return (
            <div className="modal show d-block" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Excluir Servico</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>Tem certeza que deseja excluir {servicoNome}?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>
                                Cancelar
                            </button>
                            <button className="btn btn-danger" onClick={onClose}>
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
