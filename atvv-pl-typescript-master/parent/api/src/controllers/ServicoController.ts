import pool from "../config/db";

export default class ServicoController {
    // Método para cadastrar um serviço
    public async cadastrar(servico: any): Promise<void> {
        const { nome, valor } = servico;
        const client = await pool.connect();
        try {
            await client.query(
                'INSERT INTO servico (nome, valor) VALUES ($1, $2)',
                [nome, valor]
            );
        } catch (err) {
            console.error('Erro ao cadastrar serviço:', err);
            throw err;
        } finally {
            client.release();
        }
    }

    // Método para listar todos os serviços
    public async listar(): Promise<any[]> {
        const client = await pool.connect();
        try {
            const res = await client.query('SELECT * FROM servico');
            return res.rows;
        } catch (err) {
            console.error('Erro ao listar serviços:', err);
            throw err;
        } finally {
            client.release();
        }
    }

    // Método para editar um serviço
    public async editar(id: number, novosDados: any): Promise<void> {
        const { nome, valor } = novosDados;
        const client = await pool.connect();
        try {
            await client.query(
                'UPDATE servico SET nome = $1, valor = $2 WHERE id = $3',
                [nome, valor, id]
            );
        } catch (err) {
            console.error('Erro ao editar serviço:', err);
            throw err;
        } finally {
            client.release();
        }
    }

    // Método para deletar um serviço
    public async deletar(id: number): Promise<void> {
        const client = await pool.connect();
        try {
            await client.query('DELETE FROM servico WHERE id = $1', [id]);
        } catch (err) {
            console.error('Erro ao deletar serviço:', err);
            throw err;
        } finally {
            client.release();
        }
    }

    public async contratar(servicoId: number, clienteId: number): Promise<void> {
        const client = await pool.connect();
        try {
            await client.query(
                'INSERT INTO cliente_servico (cliente_id, servico_id) VALUES ($1, $2)',
                [clienteId, servicoId]
            );
        } catch (err) {
            console.error('Erro ao contratar serviço:', err);
            throw err;
        } finally {
            client.release();
        }
    }
}
