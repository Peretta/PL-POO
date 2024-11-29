import pool from "../config/db";

export default class ClienteController {
    // Método para cadastrar um cliente
    public async cadastrar(cliente: any): Promise<void> {
        const { nome, nomeSocial, cpf, telefones, rgs } = cliente;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Inserir CPF
    const cpfRes = await client.query(
      'INSERT INTO cpf (valor, data_emissao) VALUES ($1, $2) RETURNING id',
      [cpf.valor, cpf.dataEmissao]
    );

    // Inserir Telefones
    const telefoneRes = await client.query(
      'INSERT INTO telefone (ddd, numero) VALUES ($1, $2) RETURNING id',
      [telefones[0].ddd, telefones[0].numero]
    );

    // Inserir Cliente
    const clienteRes = await client.query(
      'INSERT INTO cliente (nome, nome_social, cpf_id, telefone_id) VALUES ($1, $2, $3, $4) RETURNING id',
      [nome, nomeSocial, cpfRes.rows[0].id, telefoneRes.rows[0].id]
    );

    // Inserir RGs
    for (const rg of rgs) {
      await client.query(
        'INSERT INTO rg (valor, data_emissao) VALUES ($1, $2)',
        [rg.valor, rg.dataEmissao]
      );

      // Relacionar RG com Cliente
      const rgId = await client.query('SELECT id FROM rg WHERE valor = $1', [rg.valor]);
      await client.query(
        'INSERT INTO cliente_rg (cliente_id, rg_id) VALUES ($1, $2)',
        [clienteRes.rows[0].id, rgId.rows[0].id]
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erro ao cadastrar cliente:', error);
    throw error;
  } finally {
    client.release();
  }
};

    // Método para listar todos os clientes
    public async listar(): Promise<any[]> {
        const client = await pool.connect();
        try {
          const res = await client.query(
            `SELECT 
                c.id AS cliente_id,
                c.nome,
                c.nome_social,
                c.data_cadastro,
                cp.valor AS cpf_valor,
                cp.data_emissao AS cpf_data_emissao,
                t.ddd AS telefone_ddd,
                t.numero AS telefone_numero,
                json_agg(json_build_object('valor', rg.valor, 'data_emissao', rg.data_emissao)) AS rgs
              FROM cliente c
              JOIN cpf cp ON c.cpf_id = cp.id
              JOIN telefone t ON c.telefone_id = t.id
              LEFT JOIN cliente_rg crg ON c.id = crg.cliente_id
              LEFT JOIN rg ON crg.rg_id = rg.id
              GROUP BY c.id, cp.id, t.id`
          );
          return res.rows;
        } finally {
          client.release();
        }
      }
      

    // Método para editar um cliente
    public async editar(cpfValor: string, novosDados: any): Promise<void> {
        const { nome, nomeSocial, telefones } = novosDados;
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const cpfRes = await client.query(
                'SELECT id FROM cpf WHERE valor = $1',
                [cpfValor]
            );

            if (cpfRes.rows.length > 0) {
                const clienteId = cpfRes.rows[0].id;

                await client.query(
                    'UPDATE cliente SET nome = $1, nome_social = $2 WHERE cpf_id = $3',
                    [nome, nomeSocial, clienteId]
                );

                if (telefones && telefones.length > 0) {
                    await client.query(
                        'UPDATE telefone SET ddd = $1, numero = $2 WHERE id = $3',
                        [telefones[0].ddd, telefones[0].numero, clienteId]
                    );
                }
            }

            await client.query('COMMIT');
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    // Método para deletar um cliente
    public async deletar(cpfValor: string): Promise<void> {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const cpfRes = await client.query(
                'SELECT id FROM cpf WHERE valor = $1',
                [cpfValor]
            );

            if (cpfRes.rows.length > 0) {
                const cpfId = cpfRes.rows[0].id;
                await client.query('DELETE FROM cliente WHERE cpf_id = $1', [cpfId]);
                await client.query('DELETE FROM cpf WHERE id = $1', [cpfId]);
            }

            await client.query('COMMIT');
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }
}
