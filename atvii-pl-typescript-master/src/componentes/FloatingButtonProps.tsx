type FloatingButtonProps = {
    onClick: () => void;
    icon?: React.ReactNode; // Permite customizar o ícone
    label?: string; // Texto opcional
};

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, icon, label }) => {
    return (
        <button
            className="btn btn-primary rounded-circle"
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                width: "60px",
                height: "60px",
                fontSize: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onClick={onClick}
        >
            {icon || "+"} {/* Ícone ou sinal padrão */}
            {label && <span style={{ marginLeft: "8px" }}>{label}</span>}
        </button>
    );
};

export default FloatingButton;
