import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIcon from '@mui/icons-material/Assignment';

const ServicoPage = () => {
  const [servicos, setServicos] = useState([]);
  const [formData, setFormData] = useState({ nome: '', valor: '' });
  const [editMode, setEditMode] = useState(false);
  const [editServicoId, setEditServicoId] = useState<number | null>(null);
  const [contractDialogOpen, setContractDialogOpen] = useState(false);
  const [selectedServico, setSelectedServico] = useState<number | null>(null);
  const [clienteId, setClienteId] = useState<string>('');

  useEffect(() => {
    fetchServicos();
  }, []);

  // Buscar serviços
  const fetchServicos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/servicos');
      setServicos(response.data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  // Deletar serviço
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/servicos/${id}`);
      fetchServicos();
    } catch (error) {
      console.error('Erro ao deletar serviço:', error);
    }
  };

  // Submeter formulário (cadastrar ou editar)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && editServicoId !== null) {
        await axios.put(`http://localhost:3000/servicos/${editServicoId}`, formData);
        setEditMode(false);
        setEditServicoId(null);
      } else {
        await axios.post('http://localhost:3000/servicos', formData);
      }
      setFormData({ nome: '', valor: '' });
      fetchServicos();
    } catch (error) {
      console.error('Erro ao cadastrar ou editar serviço:', error);
    }
  };

  // Editar serviço
  const handleEdit = (servico: any) => {
    setEditMode(true);
    setEditServicoId(servico.id);
    setFormData({ nome: servico.nome, valor: servico.valor });
  };

  // Contratar serviço
  const handleContract = async () => {
    try {
      if (selectedServico && clienteId) {
        await axios.post(`http://localhost:3000/servicos/${selectedServico}/contratar`, {
          clienteId: Number(clienteId),
        });
        setContractDialogOpen(false);
        setSelectedServico(null);
        setClienteId('');
        fetchServicos();
      } else {
        console.error('Por favor, insira o ID do cliente.');
      }
    } catch (error) {
      console.error('Erro ao contratar serviço:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Serviços
      </Typography>

      <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          {editMode ? 'Editar Serviço' : 'Cadastrar Novo Serviço'}
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <TextField
            label="Nome"
            variant="outlined"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
            sx={{ flex: '1 1 calc(50% - 10px)' }}
          />
          <TextField
            label="Valor"
            variant="outlined"
            value={formData.valor}
            onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
            required
            sx={{ flex: '1 1 calc(50% - 10px)' }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ flex: '1 1 100px' }}>
            {editMode ? 'Salvar Alterações' : 'Cadastrar'}
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Lista de Serviços
        </Typography>
        <List>
          {servicos.map((servico: any) => (
            <ListItem
              key={servico.id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="contract"
                    onClick={() => {
                      setSelectedServico(servico.id);
                      setContractDialogOpen(true);
                    }}
                  >
                    <AssignmentIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(servico)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(servico.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={servico.nome}
                secondary={`Valor: R$ ${servico.valor}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={contractDialogOpen} onClose={() => setContractDialogOpen(false)}>
        <DialogTitle>Contratar Serviço</DialogTitle>
        <DialogContent>
          <TextField
            label="ID do Cliente"
            variant="outlined"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setContractDialogOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleContract} color="primary">
            Contratar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ServicoPage;
