import React from "react";

type AdotarProdutoModalProps = {
    produtoNome: string;
    onClose: () => void;
};

const AdotarProdutoModal: React.FC<AdotarProdutoModalProps> = ({ produtoNome, onClose }) => {
    return (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Comprar Produto</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Fechar modal"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>Tem certeza que deseja comprar o produto {produtoNome}?</p>
                        <label htmlFor="usuario-select">Usuário que irá comprar:</label>
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

export default AdotarProdutoModal;
