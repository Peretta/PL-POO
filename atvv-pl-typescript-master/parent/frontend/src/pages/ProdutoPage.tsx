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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProdutoPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({ nome: '', valor: '' });
  const [editMode, setEditMode] = useState(false);
  const [editProdutoId, setEditProdutoId] = useState<number | null>(null);
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<number | null>(null);
  const [clienteId, setClienteId] = useState<string>(''); // Campo para ID do cliente

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Buscar produtos
  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  // Deletar produto
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/produtos/${id}`);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  // Submeter formulário (cadastrar ou editar)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && editProdutoId !== null) {
        await axios.put(`http://localhost:3000/produtos/${editProdutoId}`, formData);
        setEditMode(false);
        setEditProdutoId(null);
      } else {
        await axios.post('http://localhost:3000/produtos', formData);
      }
      setFormData({ nome: '', valor: '' });
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao cadastrar ou editar produto:', error);
    }
  };

  // Editar produto
  const handleEdit = (produto: any) => {
    setEditMode(true);
    setEditProdutoId(produto.id);
    setFormData({ nome: produto.nome, valor: produto.valor });
  };

  // Comprar produto
  const handleBuy = async () => {
    try {
      if (selectedProduto && clienteId) {
        await axios.post(`http://localhost:3000/produtos/${selectedProduto}/comprar`, {
          clienteId: Number(clienteId),
        });
        setBuyDialogOpen(false);
        setSelectedProduto(null);
        setClienteId(''); // Limpar o campo após a compra
        fetchProdutos();
      } else {
        console.error('Por favor, insira o ID do cliente.');
      }
    } catch (error) {
      console.error('Erro ao registrar compra:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Produtos
      </Typography>

      <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          {editMode ? 'Editar Produto' : 'Cadastrar Novo Produto'}
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
          Lista de Produtos
        </Typography>
        <List>
          {produtos.map((produto: any) => (
            <ListItem
              key={produto.id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="buy"
                    onClick={() => {
                      setSelectedProduto(produto.id);
                      setBuyDialogOpen(true);
                    }}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(produto)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(produto.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={produto.nome}
                secondary={`Valor: R$ ${produto.valor}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={buyDialogOpen} onClose={() => setBuyDialogOpen(false)}>
        <DialogTitle>Registrar Compra</DialogTitle>
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
          <Button onClick={() => setBuyDialogOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleBuy} color="primary">
            Confirmar Compra
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProdutoPage;
