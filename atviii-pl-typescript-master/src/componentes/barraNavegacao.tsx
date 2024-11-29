/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

type Props = {
    tema: string;
    botoes: string[];
    seletorView: (valor: string, evento: React.MouseEvent<HTMLAnchorElement>) => void;
};

const BarraNavegacao: React.FC<Props> = ({ tema, botoes, seletorView }) => {
    // Função para gerar os botões da navegação
    const gerarListaBotoes = () => {
        return botoes.map((valor) => (
            <li key={valor} className="nav-item">
                <a
                    className="nav-link"
                    href="#"
                    onClick={(e) => seletorView(valor, e)}
                >
                    {valor}
                </a>
            </li>
        ));
    };

    return (
        <nav
            className="navbar navbar-expand-lg"
            data-bs-theme="light"
            style={{ backgroundColor: tema, marginBottom: 10 }}
        >
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">PetLovers</span>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                    style={{ flex: "1", flexDirection: "row-reverse" }}
                >
                    <ul className="navbar-nav">{gerarListaBotoes()}</ul>
                </div>
            </div>
        </nav>
    );
};

export default BarraNavegacao;
