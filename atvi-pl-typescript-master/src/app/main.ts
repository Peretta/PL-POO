import { clear } from "console";
import Empresa from "../modelo/empresa";
import Entrada from "../io/entrada";
import CadastroCliente from "../negocio/cliente/cadastroCliente";
import ListagemClientes from "../negocio/cliente/listagemClientes";
import EditaCliente from "../negocio/cliente/editaCliente";
import DeletaCliente from "../negocio/cliente/deletaCliente";
import CadastroPets from "../negocio/pet/cadastroPets";
import ListagemPets from "../negocio/pet/listagemPets";
import editarPets from "../negocio/pet/editaPet";
import DeletePet from "../negocio/pet/deletePet";
import CadastroServicos from "../negocio/servicos/cadastroServicos";
import ListagemServicos from "../negocio/servicos/listagemServicos"
import DeletaServicos from "../negocio/servicos/deleteServicos";
import EditaServicos from "../negocio/servicos/editarServicos";
import CadastroProduto from "../negocio/produto/cadastroProduto";
import ListagemProdutos from "../negocio/servicos/listagemServicos";
import EditaProduto from "../negocio/servicos/editarServicos";
import DeletaProduto from "../negocio/produto/deletaProduto";
import ComprarProduto from "../negocio/produto/compraProduto";
import Pet from "../modelo/pet";
import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import RG from "../modelo/rg";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
import Telefone from "../modelo/telefone";
import ContrataServico from "../negocio/servicos/contrataServicos";
import tutorPet from "../negocio/pet/tutorPet";
import { Tendencias } from "../negocio/tendencias/tendencias";

console.log("Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinárias!");


const empresa = new Empresa();
const entrada = new Entrada();

function menuPrincipal(): boolean {
    clear();
    console.log("\nOpções:");
    console.log("1. Clientes");
    console.log("2. Pets");
    console.log("3. Serviços");
    console.log("4. Produtos");
    console.log("5. Tendências");
    console.log("6. Inserir Dados Iniciais"); // Nova opção
    console.log("0. Sair");
  
    const opcao = entrada.receberNumero("Digite sua opção: ");
    switch (opcao) {
      case 1: menuClientes(); break;
      case 2: menuPets(); break;
      case 3: menuServicos(); break;
      case 4: menuProdutos(); break;
      case 5: menuTendencias(); break;
      case 6: inserirDadosIniciais(); break; // Chama a função que insere os dados
      case 0:
        console.log("Até mais!");
        clear();
        return false;
      default:
        console.log("Operação não entendida :(");
    }
    return true;
  }
  

function menuClientes(): void {
  let voltar = true;
  while (voltar) {
    clear();
    console.log("CLIENTES:");
    console.log("1. Cadastrar");
    console.log("2. Listar");
    console.log("3. Alterar");
    console.log("4. Excluir");
    console.log("0. Voltar");

    const opcao = entrada.receberNumero("Digite sua opção: ");
    switch (opcao) {
        case 1: 
            let cadastroClientes = new CadastroCliente(empresa.getClientes);
            cadastroClientes.cadastrar();
            break;
        case 2: 
            let listagemClientes = new ListagemClientes(empresa.getClientes);
            listagemClientes.listar();
            break;
        case 3:
            let editarClientes = new EditaCliente(empresa.getClientes);
            editarClientes.editar();
            break;
        case 4:
            let deletarClientes = new DeletaCliente(empresa.getClientes);
            deletarClientes.deletar();
            break;
      case 0: voltar = false; break;
      default: console.log("Operação não entendida :(");
    }
  }
}

function menuPets(): void {
  let voltar = true;
  while (voltar) {
    clear();
    console.log("PETS:");
    console.log("1. Cadastrar");
    console.log("2. Listar");
    console.log("3. Alterar");
    console.log("4. Excluir");
    console.log("5. Tutoria");
    console.log("0. Voltar");

    const opcao = entrada.receberNumero("Digite sua opção: ");
    switch (opcao) {
        case 1:
            let cadastroPet = new CadastroPets(empresa.getPets);
            cadastroPet.cadastrar();
            break;
        case 2:
            let listagemPets = new ListagemPets(empresa.getPets);
            listagemPets.listar();
            break;
        case 3:
            let editarPet = new editarPets(empresa.getPets);
            editarPet.editar();
            break;
        case 4:
            let deletarPets = new DeletePet(empresa.getPets);
            deletarPets.deletar();
            break;
        case 5:
            let tutorPets = new tutorPet(empresa.getClientes, empresa.getPets);
            tutorPets.tutorPet();
            break;
      case 0: voltar = false; break;
      default: console.log("Operação não entendida :(");
    }
  }
}

function menuServicos(): void {
  let voltar = true;
  while (voltar) {
    clear();
    console.log("SERVIÇOS:");
    console.log("1. Cadastrar");
    console.log("2. Listar");
    console.log("3. Alterar");
    console.log("4. Excluir");
    console.log("5. Contrata Serviços")
    console.log("0. Voltar");

    const opcao = entrada.receberNumero("Digite sua opção: ");
    switch (opcao) {
        case 1:
            let cadastroServicos = new CadastroServicos(empresa.getServicos);
            cadastroServicos.cadastrar();
            break;
        case 2:
            let listagemServicos = new ListagemServicos(empresa.getServicos);
            listagemServicos.listar();
            break;
        case 3:
            let editarServicos = new EditaServicos(empresa.getServicos);
            editarServicos.editar();
            break;
        case 4:
            let deletarServicos = new DeletaServicos(empresa.getServicos);
            deletarServicos.deletar();
            break;
        case 5:
            let contratarServicos = new ContrataServico(empresa.getClientes, empresa.getServicos);
            contratarServicos.ContrataServico();
            break;
      case 0: voltar = false; break;
      default: console.log("Operação não entendida :(");
    }
  }
}

function menuProdutos(): void {
  let voltar = true;
  while (voltar) {
    clear();
    console.log("PRODUTOS:");
    console.log("1. Cadastrar");
    console.log("2. Listar");
    console.log("3. Alterar");
    console.log("4. Excluir");
    console.log("5. Comprar");
    console.log("0. Voltar");

    const opcao = entrada.receberNumero("Digite sua opção: ");
    switch (opcao) {
        case 1:
            let cadastroProdutos = new CadastroProduto(empresa.getProdutos);
            cadastroProdutos.cadastrar();
            break;
        case 2:
            let listagemProdutos = new ListagemProdutos(empresa.getProdutos);
            listagemProdutos.listar();
            break;
        case 3:
            let editarProdutos = new EditaProduto(empresa.getProdutos);
            editarProdutos.editar();
            break;
        case 4:
            let deletarProdutos = new DeletaProduto(empresa.getProdutos);
            deletarProdutos.deletar();
            break;
        case 5:
            let comprarProduto = new ComprarProduto(empresa.getClientes, empresa.getProdutos);
            comprarProduto.CompraProduto();
            break;
      case 0: voltar = false; break;
      default: console.log("Operação não entendida :(");
    }
  }
}

function menuTendencias(): void {
  let voltar = true;
  while (voltar) {
    clear();
    console.log("TENDÊNCIAS:");
    console.log("1. 10 Clientes que Mais Consumiram");
    console.log("2. Produtos/Serviços Mais Consumidos");
    console.log("3. Produtos/Serviços por Tipo e Raça de Pets");
    console.log("4. 5 Clientes que Mais Consumiram em Valor");
    console.log("0. Voltar");

    const opcao = entrada.receberNumero("Digite sua opção: ");
    switch (opcao) {
      case 1: 
        Tendencias.exibirTop10Clientes(empresa.getClientes);
        break;
      case 2: 
        Tendencias.exibirProdutosServicos(empresa.getClientes);
      break;
      case 3: 
        Tendencias.exibirDadosPorTipoRaca(empresa.getPets);
        break;
      case 4: 
        Tendencias.exibirTop5ClientesValor(empresa.getClientes);
        break;
      case 0: voltar = false; break;
      default: console.log("Operação não entendida :(");
    }
  }
}

function executarSistema() {
  let continuar = true;
  while (continuar) {
    continuar = menuPrincipal();
  }
}

function inserirDadosIniciais(): void {
  console.log("Inserindo dados iniciais...");

  // Inserindo clientes
  const cliente1 = new Cliente(
    "Carlos Silva", 
    "Carlão", 
    new CPF("123.456.789-00", new Date()), 
    [new RG("12.345.678-9", new Date())], 
    [new Telefone("11", "987654321")]
  );
  const cliente2 = new Cliente(
    "Ana Paula", 
    "Ana", 
    new CPF("987.654.321-00", new Date()), 
    [new RG("98.765.432-1", new Date())], 
    [new Telefone("21", "999998888")]
  );
  const cliente3 = new Cliente(
    "João Pedro", 
    "JP", 
    new CPF("321.654.987-00", new Date()), 
    [new RG("67.890.123-4", new Date())], 
    [new Telefone("31", "987123456")]
  );

  empresa.adicionarCliente(cliente1);
  empresa.adicionarCliente(cliente2);
  empresa.adicionarCliente(cliente3);

  // Inserindo pets
  const pet1 = new Pet("Rex", "Labrador", "Macho", "Cachorro");
  const pet2 = new Pet("Mimi", "Persa", "Fêmea", "Gato");
  const pet3 = new Pet("Thor", "Golden Retriever", "Macho", "Cachorro");

  cliente1.adicionarPet(pet1);
  cliente2.adicionarPet(pet2);
  cliente3.adicionarPet(pet3);

  // Inserindo produtos
  const produto1 = new Produto("Ração Premium", "150");
  const produto2 = new Produto("Coleira Antipulgas", "80");
  const produto3 = new Produto("Shampoo para Pets", "30");

  empresa.adicionarProduto(produto1);
  empresa.adicionarProduto(produto2);
  empresa.adicionarProduto(produto3);

  // Inserindo serviços
  const servico1 = new Servico("Banho e Tosa", "50");
  const servico2 = new Servico("Consulta Veterinária", "200");
  const servico3 = new Servico("Vacinação", "100");

  empresa.adicionarServico(servico1);
  empresa.adicionarServico(servico2);
  empresa.adicionarServico(servico3);

  // Simulando compras e contratações de serviços
  cliente1.adicionarProdutoConsumido(produto1);
  cliente1.adicionarProdutoConsumido(produto2);
  cliente2.adicionarProdutoConsumido(produto3);
  cliente3.adicionarProdutoConsumido(produto1);
  cliente3.adicionarProdutoConsumido(produto3);

  cliente1.adicionarServicoConsumido(servico1);
  cliente2.adicionarServicoConsumido(servico2);
  cliente3.adicionarServicoConsumido(servico3);
  cliente1.adicionarServicoConsumido(servico3);

  console.log("Dados inseridos com sucesso!");
  entrada.receberTexto("Pressione ENTER para continuar...");
}

  

executarSistema();
clear();


