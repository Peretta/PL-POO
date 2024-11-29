import React, { useState, useEffect } from 'react';
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from '../services/api';

const ClientManager = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', email: '' });

  // Carregar lista de clientes ao montar o componente
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await updateClient(form);
      } else {
        await createClient(form);
      }
      loadClients();
      setForm({ id: '', name: '', email: '' });
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
    <div>
      <h1>Gerenciamento de Clientes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Nome"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
          placeholder="E-mail"
          required
        />
        <button type="submit">{form.id ? 'Atualizar' : 'Cadastrar'}</button>
      </form>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.name} - {client.email}
            <button onClick={() => handleEdit(client)}>Editar</button>
            <button onClick={() => handleDelete(client.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientManager;
