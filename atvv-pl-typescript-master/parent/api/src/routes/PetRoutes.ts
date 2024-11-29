import express from 'express';
import PetController from '../controllers/PetController';

const router = express.Router();
const petController = new PetController();

// Rota para cadastrar pet
router.post('/', async (req, res) => {
    try {
        await petController.cadastrar(req.body);
        res.status(201).send('Pet cadastrado com sucesso');
    } catch (err) {
        console.error('Erro na rota POST /pets:', err);
        res.status(500).send('Erro ao cadastrar pet');
    }
});

// Rota para listar pets
router.get('/', async (req, res) => {
    try {
        const pets = await petController.listar();
        res.status(200).json(pets);
    } catch (err) {
        console.error('Erro na rota GET /pets:', err);
        res.status(500).send('Erro ao listar pets');
    }
});

// Rota para editar pet
router.put('/:id', async (req, res) => {
    try {
        await petController.editar(parseInt(req.params.id), req.body);
        res.status(200).send('Pet editado com sucesso');
    } catch (err) {
        console.error('Erro na rota PUT /pets:', err);
        res.status(500).send('Erro ao editar pet');
    }
});

// Rota para deletar pet
router.delete('/:id', async (req, res) => {
    try {
        await petController.deletar(parseInt(req.params.id));
        res.status(200).send('Pet deletado com sucesso');
    } catch (err) {
        console.error('Erro na rota DELETE /pets:', err);
        res.status(500).send('Erro ao deletar pet');
    }
});


router.post('/:petId/adotar', async (req, res) => {
    const { petId } = req.params;
    const { clienteId } = req.body;

    try {
        await petController.adotarPet(Number(petId), Number(clienteId));
        res.status(200).send('Pet adotado com sucesso.');
    } catch (error) {
        res.status(400).send('Erro ao adotar pet.');
    }
});

export default router;
