import React from "react";

type FloatingButtonProps = {
    onClick: () => void;
    icon?: React.ReactNode; // Ícone customizado opcional
    label?: string; // Texto adicional opcional
};

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, icon, label }) => {
    return (
        <button
            className="floating-button btn btn-primary rounded-circle"
            onClick={onClick}
            aria-label={label || "Floating Action Button"} // Melhor acessibilidade
        >
            {icon || "+"} {/* Renderiza o ícone customizado ou "+" como padrão */}
            {label && <span className="floating-button-label">{label}</span>}
        </button>
    );
};

export default FloatingButton;
