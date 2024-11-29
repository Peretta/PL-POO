import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientePage from './pages/ClientePage';
import PetPage from './pages/PetPage';
import ProdutoPage from './pages/ProdutoPage';
import ServicoPage from './pages/ServicoPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/clientes" element={<ClientePage />} />
        <Route path="/pets" element={<PetPage />} />
        <Route path="/produtos" element={<ProdutoPage />} />
        <Route path="/servicos" element={<ServicoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
