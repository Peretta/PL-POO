import axios from 'axios';

const API_BASE_URL = 'http://localhost:32831/cliente';

export async function getClients() {
  try {
    const response = await axios.get(`${API_BASE_URL}/clientes`, { validateStatus: false });

    return response.data.map((cliente) => ({
      id: cliente.id,
      nome: cliente.nome || 'Nome não disponível',
      nomeSocial: cliente.nomeSocial || '',
      email: cliente.email || 'Email não fornecido',
      endereco: cliente.endereco
        ? {
            estado: cliente.endereco.estado || '',
            cidade: cliente.endereco.cidade || '',
            bairro: cliente.endereco.bairro || '',
            rua: cliente.endereco.rua || '',
            numero: cliente.endereco.numero || '',
            codigoPostal: cliente.endereco.codigoPostal || '',
            informacoes: cliente.endereco.informacoesAdicionais || '',
          }
        : null,
      telefones: cliente.telefones?.length > 0
        ? cliente.telefones.map((telefone) => ({
            id: telefone.id,
            numero: telefone.numero,
            ddd: telefone.ddd,
          }))
        : [], // Retorna um array vazio se não houver telefones
    }));
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    return [];
  }
}

export const getClientById = (id) => axios.get(`${API_BASE_URL}/${id}`);
export const createClient = (client) =>
  axios.post(`${API_BASE_URL}/cadastrar`, client);
export const updateClient = (client) =>
  axios.put(`${API_BASE_URL}/atualizar`, client);
export const deleteClient = (id) =>
  axios.delete(`${API_BASE_URL}/excluir`, { data: { id } });
