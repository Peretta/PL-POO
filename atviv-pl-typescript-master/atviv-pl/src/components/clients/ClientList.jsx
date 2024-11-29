import React, { useEffect, useState } from 'react';
import { getClients, deleteClient } from '../../services/api';

const ClientList = ({ onEdit }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (err) {
      setError('Erro ao carregar os clientes.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await deleteClient(id);
        setClients(clients.filter(client => client.id !== id));
      } catch (err) {
        alert('Erro ao excluir cliente.');
      }
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  if (loading) return <p style={styles.loading}>Carregando clientes...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Lista de Clientes</h2>
      {clients.length === 0 ? (
        <p style={styles.noClients}>Nenhum cliente encontrado.</p>
      ) : (
        <ul style={styles.list}>
          {clients.map(client => (
            <li key={client.id} style={styles.card}>
              <h3 style={styles.cardTitle}>{client.nome}</h3>
              <p><strong>Nome Social:</strong> {client.nomeSocial}</p>
              <p><strong>Email:</strong> {client.email}</p>
              {client.endereco ? (
                <>
                  <p><strong>Endereço:</strong> {client.endereco.rua}, {client.endereco.numero}, {client.endereco.bairro}, {client.endereco.cidade} - {client.endereco.estado}</p>
                  <p><strong>CEP:</strong> {client.endereco.codigoPostal}</p>
                  <p><strong>Informações Adicionais:</strong> {client.endereco.informacoes || 'Nenhuma'}</p>
                </>
              ) : (
                <p><strong>Endereço:</strong> Não disponível</p>
              )}
              {client.telefones.length > 0 ? (
                <p><strong>Telefones:</strong> {client.telefones.map(tel => `(${tel.ddd}) ${tel.numero}`).join(', ')}</p>
              ) : (
                <p><strong>Telefones:</strong> Não disponível</p>
              )}
              <div style={styles.actions}>
              <button
  style={styles.editButton}
  onClick={() => {
    const telefone = client.telefones?.[0] || { ddd: '', numero: '' }; // Primeiro telefone, ou vazio
    onEdit({
      id: client.id || '',
      nome: client.nome || '',
      nomeSocial: client.nomeSocial || '',
      email: client.email || '',
      telefone: `${telefone.ddd}${telefone.numero}`, // Concatena DDD e número
      estado: client.endereco?.estado || '',
      cidade: client.endereco?.cidade || '',
      bairro: client.endereco?.bairro || '',
      rua: client.endereco?.rua || '',
      numero: client.endereco?.numero || '',
      cep: client.endereco?.codigoPostal || '',
      informacoes: client.endereco?.informacoesAdicionais || '',
    });

    // Rola para o formulário
    document.querySelector('form').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }}
>
  Editar
</button>

                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(client.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    margin: '0 0 10px 0',
    color: '#0056b3',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
  },
  error: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#e74c3c',
  },
  noClients: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#666',
  },
  actions: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default ClientList;
