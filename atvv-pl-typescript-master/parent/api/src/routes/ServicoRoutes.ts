import express from 'express';
import ServicoController from '../controllers/ServicoController';

const router = express.Router();
const servicoController = new ServicoController();

// Rota para cadastrar serviço
router.post('/', async (req, res) => {
    try {
        await servicoController.cadastrar(req.body);
        res.status(201).send('Serviço cadastrado com sucesso');
    } catch (err) {
        console.error('Erro na rota POST /servicos:', err);
        res.status(500).send('Erro ao cadastrar serviço');
    }
});

// Rota para listar serviços
router.get('/', async (req, res) => {
    try {
        const servicos = await servicoController.listar();
        res.status(200).json(servicos);
    } catch (err) {
        console.error('Erro na rota GET /servicos:', err);
        res.status(500).send('Erro ao listar serviços');
    }
});

// Rota para editar serviço
router.put('/:id', async (req, res) => {
    try {
        await servicoController.editar(parseInt(req.params.id), req.body);
        res.status(200).send('Serviço editado com sucesso');
    } catch (err) {
        console.error('Erro na rota PUT /servicos:', err);
        res.status(500).send('Erro ao editar serviço');
    }
});

// Rota para deletar serviço
router.delete('/:id', async (req, res) => {
    try {
        await servicoController.deletar(parseInt(req.params.id));
        res.status(200).send('Serviço deletado com sucesso');
    } catch (err) {
        console.error('Erro na rota DELETE /servicos:', err);
        res.status(500).send('Erro ao deletar serviço');
    }
});

router.post('/:servicoId/contratar', async (req, res) => {
    const { servicoId } = req.params;
    const { clienteId } = req.body;

    try {
        await servicoController.contratar(Number(servicoId), Number(clienteId));
        res.status(200).send('Serviço contratado com sucesso');
    } catch (err) {
        console.error('Erro na rota POST /servicos/:id/contratar:', err);
        res.status(500).send('Erro ao contratar serviço');
    }
});




export default router;
