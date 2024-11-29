import express from 'express';
import ClienteController from '../controllers/ClienteController';

const router = express.Router();
const clienteController = new ClienteController();

// Rota para cadastrar cliente
router.post('/', async (req, res) => {
    try {
        await clienteController.cadastrar(req.body);
        res.status(201).send('Cliente cadastrado com sucesso');
    } catch (err) {
        res.status(500).send('Erro ao cadastrar cliente: ');
    }
});

// Rota para listar clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await clienteController.listar();
        res.status(200).json(clientes);
    } catch (err) {
        res.status(500).send('Erro ao listar clientes: ');
    }
});

// Rota para editar cliente
router.put('/:cpf', async (req, res) => {
    try {
        await clienteController.editar(req.params.cpf, req.body);
        res.status(200).send('Cliente editado com sucesso');
    } catch (err) {
        res.status(500).send('Erro ao editar cliente: ');
    }
});

// Rota para deletar cliente
router.delete('/:cpf', async (req, res) => {
    try {
        await clienteController.deletar(req.params.cpf);
        res.status(200).send('Cliente deletado com sucesso');
    } catch (err) {
        res.status(500).send('Erro ao deletar cliente: ');
    }
});



export default router;
