import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Pet from "../../modelo/pet";

export class Tendencias {
  // Exibir os 10 clientes que mais consumiram
  public static exibirTop10Clientes(clientes: Array<Cliente>) {
    const topClientes = clientes
      .sort((a, b) => (b.getProdutosConsumidos.length + b.getServicosConsumidos.length) - 
                      (a.getProdutosConsumidos.length + a.getServicosConsumidos.length))
      .slice(0, 10);

    console.log("10 Clientes que Mais Consumiram:");
    topClientes.forEach((cliente, index) =>
      console.log(`${index + 1}. ${cliente.nome} - ${cliente.getProdutosConsumidos.length + cliente.getServicosConsumidos.length} itens`)
    );
    let espera = new Entrada()
    espera.receberNumero("Digite um número para sair: ")
  }

  // Exibir os produtos e serviços mais consumidos
  public static exibirProdutosServicos(clientes: Array<Cliente>) {
    const consumo = new Map<string, number>();

    clientes.forEach(cliente => {
      [...cliente.getProdutosConsumidos, ...cliente.getServicosConsumidos].forEach(item => {
        consumo.set(item.nome, (consumo.get(item.nome) || 0) + 1);
      });
    });

    console.log("Produtos/Serviços Mais Consumidos:");
    Array.from(consumo.entries())
      .sort((a, b) => b[1] - a[1])
      .forEach(([nome, quantidade]) => console.log(`${nome} - ${quantidade} vezes`));
      let espera = new Entrada()
      espera.receberNumero("Digite um número para sair: ")
  }

  // Exibir dados por tipo e raça dos pets
  public static exibirDadosPorTipoRaca(pets: Array<Pet>) {
    const dados = new Map<string, Map<string, number>>();

    pets.forEach(pet => {
      if (!dados.has(pet.getTipo)) dados.set(pet.getTipo, new Map());
      const racas = dados.get(pet.getTipo)!;
      racas.set(pet.getRaca, (racas.get(pet.getRaca) || 0) + 1);
    });

    console.log("Dados por Tipo e Raça de Pets:");
    dados.forEach((racas, tipo) => {
      console.log(`Tipo: ${tipo}`);
      racas.forEach((quantidade, raca) => {
        console.log(`  Raça: ${raca} - ${quantidade} pets`);
      });
    });
    let espera = new Entrada()
    espera.receberNumero("Digite um número para sair: ")
  }

  // Exibir os 5 clientes com maior valor de consumo
  public static exibirTop5ClientesValor(clientes: Array<Cliente>) {
    const topClientes = clientes
      .map(cliente => ({
        nome: cliente.nome,
        valorTotal: cliente.getProdutosConsumidos.reduce((sum, p) => sum + parseFloat(p.valor), 0) +
                    cliente.getProdutosConsumidos.reduce((sum, s) => sum + parseFloat(s.valor), 0)
      }))
      .sort((a, b) => b.valorTotal - a.valorTotal)
      .slice(0, 5);

    console.log("5 Clientes que Mais Consumiram em Valor:");
    topClientes.forEach((cliente, index) =>
      console.log(`${index + 1}. ${cliente.nome} - R$${cliente.valorTotal.toFixed(2)}`)
    );
    let espera = new Entrada()
    espera.receberNumero("Digite um número para sair: ")
  }
}
