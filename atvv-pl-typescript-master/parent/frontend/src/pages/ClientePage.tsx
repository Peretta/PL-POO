import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Grid,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ClientePage = () => {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    nomeSocial: '',
    cpf: { valor: '', dataEmissao: '' },
    telefones: [{ ddd: '', numero: '' }],
    rgs: [{ valor: '', dataEmissao: '' }],
  });
  const [editMode, setEditMode] = useState(false);
  const [editCpf, setEditCpf] = useState('');

  useEffect(() => {
    fetchClientes();
  }, []);

  // Buscar clientes
  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  // Deletar cliente
  const handleDelete = async (cpf: string) => {
    try {
      await axios.delete(`http://localhost:3000/clientes/${cpf}`);
      fetchClientes();
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  };

  // Submeter formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:3000/clientes/${editCpf}`, formData);
        setEditMode(false);
        setEditCpf('');
      } else {
        await axios.post('http://localhost:3000/clientes', formData);
      }
      setFormData({
        nome: '',
        nomeSocial: '',
        cpf: { valor: '', dataEmissao: '' },
        telefones: [{ ddd: '', numero: '' }],
        rgs: [{ valor: '', dataEmissao: '' }],
      });
      fetchClientes();
    } catch (error) {
      console.error('Erro ao cadastrar ou editar cliente:', error);
    }
  };

  // Editar cliente
  const handleEdit = (cliente: any) => {
    setEditMode(true);
    setEditCpf(cliente.cpf_valor);
    setFormData({
      nome: cliente.nome,
      nomeSocial: cliente.nome_social,
      cpf: { valor: cliente.cpf_valor, dataEmissao: cliente.cpf_data_emissao },
      telefones: [{ ddd: cliente.telefone_ddd, numero: cliente.telefone_numero }],
      rgs: cliente.rgs || [{ valor: '', dataEmissao: '' }],
    });
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Gerenciar Clientes
      </Typography>

      <Paper sx={{ padding: '20px', marginBottom: '20px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <TextField
            label="Nome"
            variant="outlined"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
          />
          <TextField
            label="Nome Social"
            variant="outlined"
            value={formData.nomeSocial}
            onChange={(e) => setFormData({ ...formData, nomeSocial: e.target.value })}
            required
          />
          <Typography variant="h6">CPF</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Número do CPF"
                variant="outlined"
                value={formData.cpf.valor}
                onChange={(e) =>
                  setFormData({ ...formData, cpf: { ...formData.cpf, valor: e.target.value } })
                }
                required
                disabled={editMode} // CPF não pode ser alterado durante edição
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Data de Emissão"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.cpf.dataEmissao}
                onChange={(e) =>
                  setFormData({ ...formData, cpf: { ...formData.cpf, dataEmissao: e.target.value } })
                }
                required
              />
            </Grid>
          </Grid>
          <Typography variant="h6">Telefone</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="DDD"
                variant="outlined"
                value={formData.telefones[0].ddd}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    telefones: [{ ...formData.telefones[0], ddd: e.target.value }],
                  })
                }
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Número"
                variant="outlined"
                value={formData.telefones[0].numero}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    telefones: [{ ...formData.telefones[0], numero: e.target.value }],
                  })
                }
                required
              />
            </Grid>
          </Grid>
          <Typography variant="h6">RG</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Número do RG"
                variant="outlined"
                value={formData.rgs[0]?.valor || ''}
                onChange={(e) =>
                  setFormData({ ...formData, rgs: [{ ...formData.rgs[0], valor: e.target.value }] })
                }
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Data de Emissão"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.rgs[0]?.dataEmissao || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rgs: [{ ...formData.rgs[0], dataEmissao: e.target.value }],
                  })
                }
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            {editMode ? 'Salvar Alterações' : 'Cadastrar'}
          </Button>
        </form>
      </Paper>

      <Paper sx={{ padding: '20px' }}>
        <Typography variant="h6">Lista de Clientes</Typography>
        <List>
          {clientes.map((cliente: any) => (
            <ListItem
              key={cliente.cliente_id}
              sx={{ borderBottom: '1px solid #ddd', marginBottom: '10px' }}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(cliente)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(cliente.cpf_valor || '')}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={`Nome: ${cliente.nome || 'N/A'} (Nome Social: ${cliente.nome_social || 'N/A'})`}
                secondary={
                  <>
                    <Typography variant="body2">
                      <strong>CPF:</strong> {cliente.cpf_valor || 'N/A'} - Emissão: {cliente.cpf_data_emissao || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Telefone:</strong> ({cliente.telefone_ddd || 'N/A'}) {cliente.telefone_numero || 'N/A'}
                    </Typography>
                    {cliente.rgs && cliente.rgs.length > 0 ? (
                      <Typography variant="body2">
                        <strong>RGs:</strong>{' '}
                        {cliente.rgs
                          .map((rg: any) => `${rg.valor || 'N/A'} (Emissão: ${rg.data_emissao || 'N/A'})`)
                          .join(', ')}
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        <strong>RGs:</strong> Nenhum registrado
                      </Typography>
                    )}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ClientePage;
