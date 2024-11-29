import React from "react";

type Props = {
    tema: string;
    onClose: () => void;
};

const FormularioCadastroProduto: React.FC<Props> = ({ tema, onClose }) => {
    return (
        <div
            className="modal-overlay"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            <div
                className="modal-content"
                style={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    padding: "20px",
                    maxWidth: "400px",
                    width: "90%",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    position: "relative",
                }}
            >
                <div className="modal-header">
                    <h5 className="modal-title">Cadastrar Produto</h5>
                    <button
                        type="button"
                        className="btn-close"
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "transparent",
                            border: "none",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                        }}
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nome"
                                aria-label="Nome"
                                aria-describedby="basic-addon1"
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Valor"
                                aria-label="Valor"
                                aria-describedby="basic-addon1"
                            />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn btn-outline-secondary"
                        style={{ backgroundColor: tema }}
                        type="button"
                    >
                        Cadastrar
                    </button>
                    <button
                        className="btn btn-outline-danger ms-2"
                        type="button"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormularioCadastroProduto;
