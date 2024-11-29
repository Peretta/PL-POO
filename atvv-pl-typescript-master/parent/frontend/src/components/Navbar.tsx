import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ marginBottom: '20px' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Gerenciamento
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/clientes')}>
            Clientes
          </Button>
          <Button color="inherit" onClick={() => navigate('/pets')}>
            Pets
          </Button>
          <Button color="inherit" onClick={() => navigate('/produtos')}>
            Produtos
          </Button>
          <Button color="inherit" onClick={() => navigate('/servicos')}>
            Serviços
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
