import { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import ListaPets from "./listaPets";
import ListaServicos from "./listaServico";
import ListaProduto from "./listaProduto";
import React from "react";

const Roteador = () => {
  // Hook para gerenciar a tela atual
  const [tela, setTela] = useState("Clientes");

  // Função para selecionar a tela
  const selecionarView = (novaTela: string, evento: React.MouseEvent<HTMLAnchorElement>) => {
    evento.preventDefault(); // Evita o comportamento padrão do link
    console.log(novaTela);
    setTela(novaTela); // Atualiza o estado com a nova tela
  };

  // Barra de navegação
  const barraNavegacao = (
    <BarraNavegacao
      seletorView={selecionarView}
      tema="#fff"
      botoes={["Clientes", "Pet", "Servicos", "Produtos"]}
    />
  );

  // Renderiza a interface de acordo com a tela ativa
  if (tela === "Clientes") {
    return (
      <>
        {barraNavegacao}
        <ListaCliente />
      </>
    );
  } else if (tela === "Pet") {
    return (
      <>
        {barraNavegacao}
        <center>
          <h3>LISTA DE PETS</h3>
        </center>
        <br />
        <ListaPets tema="" />
      </>
    );
  } else if (tela === "Servicos") {
    return (
      <>
        {barraNavegacao}
        <center>
          <h3>LISTA DE SERVICOS</h3>
        </center>
        <ListaServicos tema="" />
      </>
    );
  } else {
    return (
      <>
        {barraNavegacao}
        <center>
          <h3>LISTA DE PRODUTOS</h3>
        </center>
        <br />
        <ListaProduto tema="" />
      </>
    );
  }
};

export default Roteador;
