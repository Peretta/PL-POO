import React from "react";

type AdotarServicoModalProps = {
    servicoNome: string;
    onClose: () => void;
};

const AdotarServicoModal: React.FC<AdotarServicoModalProps> = ({ servicoNome, onClose }) => {
    return (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Contratar Serviço</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Fechar modal"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>Tem certeza que deseja contratar o serviço de {servicoNome}?</p>
                        <label htmlFor="usuario-select">Usuário que irá contratar:</label>
                        <br />
                        <br />
                        <select id="usuario-select" name="Usuario" className="form-select">
                            <option value="Vinicius">Vinicius</option>
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
};

export default AdotarServicoModal;
