import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import ListaPets from "./listaPets";
import ListaServicos from "./listaServico";
import ListaProduto from './listaProduto';
import './FloatingButton.css';


type state = {
    tela: string
}

export default class Roteador extends Component<{}, state>{
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Clientes'
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        console.log(novaTela);
        this.setState({
            tela: novaTela
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="#fff" botoes={['Clientes', 'Pet', 'Servicos', 'Produtos']} />
        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente />
                </>
            )
        } 
        else if (this.state.tela === 'Pet'){
            return(
                <>
                    {barraNavegacao}
                    <center><h3>LISTA DE PETS</h3></center>
                    <br />
                    <ListaPets tema=""/>
                </>
            )
        }
        else if (this.state.tela === 'Servicos'){
            return(
                <>
                    {barraNavegacao}
                    <center><h3>LISTA DE SERVICOS</h3></center>
                    <ListaServicos tema=""/>
                </>
            )
        }
        else {
            return (
                <>
                    {barraNavegacao}
                    <center><h3>LISTA DE PRODUTOS</h3></center>
                    <br />
                    <ListaProduto tema=""/>
                </>
            )
        }
    }
}