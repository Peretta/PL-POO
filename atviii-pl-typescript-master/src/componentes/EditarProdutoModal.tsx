import React, { useState, ChangeEvent, FormEvent } from "react";

type EditarProdutoModalProps = {
    produtoNome: string;
    onClose: () => void;
};

const EditarProdutoModal: React.FC<EditarProdutoModalProps> = ({ produtoNome, onClose }) => {
    // Estado para armazenar o novo nome do produto
    const [novoNome, setNovoNome] = useState(produtoNome);

    // Manipulador para mudanças no input
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNovoNome(e.target.value);
    };

    // Manipulador para o envio do formulário
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert(`Produto renomeado para: ${novoNome}`);
        onClose();
    };

    return (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Produto</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Fechar modal"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="form-control"
                                value={novoNome}
                                onChange={handleChange}
                            />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarProdutoModal;
