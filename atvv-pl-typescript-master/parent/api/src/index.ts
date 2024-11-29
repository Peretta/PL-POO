import express from 'express';
import cors from 'cors'; // Importe o pacote cors
import clienteRoutes from './routes/clienteRoutes';
import produtoRoutes from './routes/ProdutoRoutes';
import servicoRoutes from './routes/ServicoRoutes';
import petRoutes from './routes/PetRoutes';

const app = express();
const PORT = 3000;

// Configuração do CORS
app.use(cors()); // Habilita o CORS para todas as origens

// Middleware para JSON
app.use(express.json());

// Rotas
app.use('/clientes', clienteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/servicos', servicoRoutes);
app.use('/pets', petRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
