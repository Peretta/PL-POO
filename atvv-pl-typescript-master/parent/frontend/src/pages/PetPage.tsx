import React, { useState, useEffect } from "react";
import axios from "axios";
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PetsIcon from "@mui/icons-material/Pets";

const PetPage = () => {
  const [pets, setPets] = useState([]); // Lista de pets
  const [usuarios, setUsuarios] = useState([]); // Lista de clientes
  const [formData, setFormData] = useState({ nome: "", raca: "", genero: "", tipo: "" }); // Dados do pet
  const [editMode, setEditMode] = useState(false); // Modo de edição
  const [editPetId, setEditPetId] = useState<number | null>(null); // ID do pet a ser editado
  const [adoptDialogOpen, setAdoptDialogOpen] = useState(false); // Controle do diálogo de adoção
  const [selectedPet, setSelectedPet] = useState<number | null>(null); // Pet selecionado para adoção
  const [selectedUsuario, setSelectedUsuario] = useState<string>(""); // Cliente selecionado para adoção

  // Carregar lista de pets e clientes
  useEffect(() => {
    fetchPets();
    fetchUsuarios();
  }, []);

  // Buscar pets
  const fetchPets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/pets");
      setPets(response.data);
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
    }
  };

  // Buscar usuários
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/clientes");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // Deletar pet
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/pets/${id}`);
      fetchPets();
    } catch (error) {
      console.error("Erro ao deletar pet:", error);
    }
  };

  // Submeter formulário (cadastrar ou editar)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:3000/pets/${editPetId}`, formData);
        setEditMode(false);
        setEditPetId(null);
      } else {
        await axios.post("http://localhost:3000/pets", formData);
      }
      setFormData({ nome: "", raca: "", genero: "", tipo: "" });
      fetchPets();
    } catch (error) {
      console.error("Erro ao cadastrar ou editar pet:", error);
    }
  };

  // Editar pet
  const handleEdit = (pet: any) => {
    setEditMode(true);
    setEditPetId(pet.id);
    setFormData({
      nome: pet.nome,
      raca: pet.raca,
      genero: pet.genero,
      tipo: pet.tipo,
    });
  };

  // Adotar pet
  const handleAdopt = async () => {
    try {
      if (selectedPet && selectedUsuario) {
        await axios.post(`http://localhost:3000/pets/${selectedPet}/adotar`, {
          clienteId: Number(selectedUsuario),
        });
        setAdoptDialogOpen(false);
        setSelectedPet(null);
        setSelectedUsuario("");
        fetchPets();
      } else {
        console.error("Selecione um cliente para adotar.");
      }
    } catch (error) {
      console.error("Erro ao adotar pet:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Pets
      </Typography>

      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>
          {editMode ? "Editar Pet" : "Cadastrar Novo Pet"}
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <TextField
            label="Nome"
            variant="outlined"
            value={formData.nome || ""}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
            sx={{ flex: "1 1 calc(50% - 10px)" }}
          />
          <TextField
            label="Raça"
            variant="outlined"
            value={formData.raca || ""}
            onChange={(e) => setFormData({ ...formData, raca: e.target.value })}
            required
            sx={{ flex: "1 1 calc(50% - 10px)" }}
          />
          <TextField
            label="Gênero"
            variant="outlined"
            value={formData.genero || ""}
            onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
            required
            sx={{ flex: "1 1 calc(50% - 10px)" }}
          />
          <TextField
            label="Tipo"
            variant="outlined"
            value={formData.tipo || ""}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
            required
            sx={{ flex: "1 1 calc(50% - 10px)" }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ flex: "1 1 100px" }}>
            {editMode ? "Salvar Alterações" : "Cadastrar"}
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Lista de Pets
        </Typography>
        <List>
          {pets.map((pet: any) => (
            <ListItem
              key={pet.id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="adopt"
                    onClick={() => {
                      setSelectedPet(pet.id);
                      setAdoptDialogOpen(true);
                    }}
                  >
                    <PetsIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(pet)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(pet.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={`Nome: ${pet.nome}`}
                secondary={`Raça: ${pet.raca} - Gênero: ${pet.genero} - Tipo: ${pet.tipo} - Tutor: ${
                  pet.tutores?.length > 0 ? pet.tutores[0].nome : "Sem tutor"
                }`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={adoptDialogOpen} onClose={() => setAdoptDialogOpen(false)}>
        <DialogTitle>Selecionar Cliente</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Cliente</InputLabel>
            <Select
              value={selectedUsuario}
              onChange={(e) => setSelectedUsuario(e.target.value)}
            >
              {usuarios.map((usuario: any) => (
                <MenuItem key={usuario.id} value={usuario.id}>
                  {usuario.nome} ({usuario.nomeSocial})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdoptDialogOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAdopt} color="primary">
            Adotar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PetPage;
