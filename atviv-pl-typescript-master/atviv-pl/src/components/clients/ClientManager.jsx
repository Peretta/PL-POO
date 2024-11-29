import React, { useState, useEffect } from 'react';
import ClientForm from './ClientForm';
import ClientList from './ClientList';
import { getClients, createClient, updateClient, deleteClient } from '../../services/api';

const ClientManager = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', email: '' });

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const response = await getClients();
      setClients(response.data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };

  const handleSave = async (client) => {
    try {
      if (client.id) {
        await updateClient(client);
      } else {
        await createClient(client);
      }
      loadClients();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      loadClients();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  const handleEdit = (client) => {
    setForm(client);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <ClientForm form={form} onSave={handleSave} setForm={setForm} />
      </div>
      <div style={styles.listContainer}>
        <div style={styles.listHeader}>
          <h2>Clientes</h2>
          <button style={styles.refreshButton} onClick={loadClients}>
            Atualizar
          </button>
        </div>
        <ClientList clients={clients} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: 'calc(100vh - 60px)', // Subtrai a altura do menu
    overflow: 'hidden',
  },
  formContainer: {
    flex: '0 0 30%', // Largura fixa de 30% para o formulário
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    backgroundColor: '#f8f9fa',
    overflowY: 'auto', // Habilita o scroll vertical
  },
  listContainer: {
    flex: '1', // Ocupa o restante do espaço
    padding: '20px',
    overflowY: 'auto', // Habilita o scroll vertical
    backgroundColor: '#ffffff',
  },
  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  refreshButton: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  refreshButtonHover: {
    backgroundColor: '#0056b3',
  },
};

export default ClientManager;
