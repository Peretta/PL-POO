import pool from "../config/db";

export default class PetController {
    // Método para cadastrar um pet
    public async cadastrar(pet: any): Promise<void> {
        const { nome, raca, genero, tipo } = pet;
        const client = await pool.connect();
        try {
            await client.query(
                'INSERT INTO pet (nome, raca, genero, tipo) VALUES ($1, $2, $3, $4)',
                [nome, raca, genero, tipo]
            );
        } catch (err) {
            console.error('Erro ao cadastrar pet:', err);
            throw err;
        } finally {
            client.release();
        }
    }

    // Método para listar todos os pets
    public async listar(): Promise<any[]> {
        const client = await pool.connect();
        try {
            const res = await client.query(`
                SELECT pet.*, 
                       json_agg(json_build_object('id', c.id, 'nome', c.nome, 'nome_social', c.nome_social)) AS tutores 
                FROM pet
                LEFT JOIN cliente_pet cp ON pet.id = cp.pet_id
                LEFT JOIN cliente c ON cp.cliente_id = c.id
                GROUP BY pet.id
            `);
            return res.rows;
        } catch (err) {
            console.error('Erro ao listar pets:', err);
            throw err;
        } finally {
            client.release();
        }
    }

    // Método para editar um pet
    public async editar(id: number, novosDados: any): Promise<void> {
        const { nome, raca, genero, tipo } = novosDados;
        const client = await pool.connect();
        try {
            await client.query(
                'UPDATE pet SET nome = $1, raca = $2, genero = $3, tipo = $4 WHERE id = $5',
                [nome, raca, genero, tipo, id]
            );
        } catch (err) {
            console.error('Erro ao editar pet:', err);
            throw err;
        } finally {
            client.release();
        }
    }

    // Método para deletar um pet
    public async deletar(id: number): Promise<void> {
        const client = await pool.connect();
        try {
            await client.query('DELETE FROM pet WHERE id = $1', [id]);
        } catch (err) {
            console.error('Erro ao deletar pet:', err);
            throw err;
        } finally {
            client.release();
        }
    }
    
    public async adotarPet(petId: number, clienteId: number): Promise<void> {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            
            // Verificar se o pet já foi adotado
            const adoptionCheck = await client.query(
                'SELECT * FROM cliente_pet WHERE pet_id = $1',
                [petId]
            );

            if (adoptionCheck.rows.length > 0) {
                throw new Error('Este pet já foi adotado.');
            }

            // Inserir na tabela cliente_pet
            await client.query(
                'INSERT INTO cliente_pet (cliente_id, pet_id) VALUES ($1, $2)',
                [clienteId, petId]
            );

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Erro ao adotar pet:', error);
            throw error;
        } finally {
            client.release();
        }
    }
}
