type ExcluirPetModalProps = {
    petNome: string;
    onClose: () => void;
};

const ExcluirPetModal = ({ petNome, onClose }: ExcluirPetModalProps) => {
    return (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Excluir Pet</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Fechar modal"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>Tem certeza que deseja excluir {petNome}?</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            className="btn btn-danger"
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExcluirPetModal;
