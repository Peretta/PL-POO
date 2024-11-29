import { Component } from "react";

type AdotarServicoModalProps = {
    servicoNome: string;
    onClose: () => void;
};


export default class AdotarServicoModal extends Component<AdotarServicoModalProps> {
    render() {
        const { servicoNome, onClose } = this.props;
        return (
            <div className="modal show d-block" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Contratar Serviço</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>Tem certeza que deseja contratar o serviço de {servicoNome}?</p>
                            <label>Usuário que irá contratar: </label> <br/> <br/>
                            <select name="Usuario" id="cars" className="form-select">
                                <option value="Vinicius" className="">Vinicius</option>
                                <option value="Assis">Assis</option>
                                <option value="Peretta">Peretta</option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>
                                Cancelar
                            </button>
                            <button className="btn btn-success" onClick={onClose}>
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
