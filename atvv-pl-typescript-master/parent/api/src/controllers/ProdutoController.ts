import pool from "../config/db";

export default class ProdutoController {
    // Método para cadastrar um produto
    public async cadastrar(produto: any): Promise<void> {
        const { nome, valor } = produto;
        const client = await pool.connect();
        try {
            await client.query(
                'INSERT INTO produto (nome, valor) VALUES ($1, $2)',
                [nome, valor]
            );
        } catch (err) {
            console.error('Erro ao cadastrar produto:', err);
            throw err;
        } finally {
            client.release();
        }
    }

    // Método para listar todos os produtos
    public async listar(): Promise<any[]> {
        const client = await pool.connect();
        try {
            const res = await client.query('SELECT * FROM produto');
            return res.rows;
        } catch (err) {
            console.error('Erro ao listar produtos:', err);
            throw err;
        } finally {
            client.release();
        }
    }

    // Método para editar um produto
    public async editar(id: number, novosDados: any): Promise<void> {
        const { nome, valor } = novosDados;
        const client = await pool.connect();
        try {
            await client.query(
                'UPDATE produto SET nome = $1, valor = $2 WHERE id = $3',
                [nome, valor, id]
            );
        } catch (err) {
            console.error('Erro ao editar produto:', err);
            throw err;
        } finally {
            client.release();
        }
    }

    // Método para deletar um produto
    public async deletar(id: number): Promise<void> {
        const client = await pool.connect();
        try {
            await client.query('DELETE FROM produto WHERE id = $1', [id]);
        } catch (err) {
            console.error('Erro ao deletar produto:', err);
            throw err;
        } finally {
            client.release();
        }
    }
    public async comprarProduto(clienteId: number, produtoId: number): Promise<void> {
        const client = await pool.connect();
        try {
            await client.query(
                'INSERT INTO cliente_produto (cliente_id, produto_id) VALUES ($1, $2)',
                [clienteId, produtoId]
            );
        } catch (err) {
            console.error('Erro ao registrar compra:', err);
            throw err;
        } finally {
            client.release();
        }
    }

    
    
}
