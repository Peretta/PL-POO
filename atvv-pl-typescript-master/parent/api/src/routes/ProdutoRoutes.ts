import express from 'express';
import ProdutoController from '../controllers/ProdutoController';

const router = express.Router();
const produtoController = new ProdutoController();

// Rota para cadastrar produto
router.post('/', async (req, res) => {
    try {
        await produtoController.cadastrar(req.body);
        res.status(201).send('Produto cadastrado com sucesso');
    } catch (err) {
        console.error('Erro na rota POST /produtos:', err);
        res.status(500).send('Erro ao cadastrar produto');
    }
});

// Rota para listar produtos
router.get('/', async (req, res) => {
    try {
        const produtos = await produtoController.listar();
        res.status(200).json(produtos);
    } catch (err) {
        console.error('Erro na rota GET /produtos:', err);
        res.status(500).send('Erro ao listar produtos');
    }
});

// Rota para editar produto
router.put('/:id', async (req, res) => {
    try {
        await produtoController.editar(parseInt(req.params.id), req.body);
        res.status(200).send('Produto editado com sucesso');
    } catch (err) {
        console.error('Erro na rota PUT /produtos:', err);
        res.status(500).send('Erro ao editar produto');
    }
});

// Rota para deletar produto
router.delete('/:id', async (req, res) => {
    try {
        await produtoController.deletar(parseInt(req.params.id));
        res.status(200).send('Produto deletado com sucesso');
    } catch (err) {
        console.error('Erro na rota DELETE /produtos:', err);
        res.status(500).send('Erro ao deletar produto');
    }
});

router.post('/:produtoId/comprar', async (req, res) => {
    const { produtoId } = req.params;
    const { clienteId } = req.body;

    try {
        await produtoController.comprarProduto(Number(clienteId), Number(produtoId));
        res.status(200).send('Produto comprado com sucesso.');
    } catch (err) {
        console.error('Erro na rota POST /produtos/:produtoId/comprar:', err);
        res.status(500).send('Erro ao registrar compra.');
    }
});

export default router;
