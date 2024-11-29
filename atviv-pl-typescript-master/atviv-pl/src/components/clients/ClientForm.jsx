import React, { useRef } from 'react';

const ClientForm = ({ form, onSave, setForm }) => {
  const formRef = useRef(null); // Referência para o formulário

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    const formattedData = {
      id: form.id,
      nome: form.nome,
      nomeSocial: form.nomeSocial,
      email: form.email,
      telefones: [
        {
          ddd: form.telefone.substring(0, 2), // Extrai o DDD
          numero: form.telefone.substring(2), // Extrai o número
        },
      ],
      endereco: {
        estado: form.estado,
        cidade: form.cidade,
        bairro: form.bairro,
        rua: form.rua,
        numero: form.numero,
        codigoPostal: form.cep,
        informacoesAdicionais: form.informacoes,
      },
    };

    try {
      await onSave(formattedData); // Aguarda a conclusão do salvamento
      setForm({
        id: '',
        nome: '',
        email: '',
        nomeSocial: '',
        telefone: '',
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        cep: '',
        informacoes: '',
      });

      // Rola a tela para o final após cadastrar
      if (!form.id) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      alert('Erro ao salvar cliente. Tente novamente.');
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>{form.id ? 'Atualizar Cliente' : 'Cadastrar Cliente'}</h2>

      <input
        type="text"
        name="nome"
        value={form.nome}
        onChange={handleInputChange}
        placeholder="Nome Completo"
        required
        style={styles.input}
      />

      <input
        type="text"
        name="nomeSocial"
        value={form.nomeSocial}
        onChange={handleInputChange}
        placeholder="Nome Social"
        style={styles.input}
      />

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleInputChange}
        placeholder="E-mail"
        required
        style={styles.input}
      />

      <input
        type="text"
        name="telefone"
        value={form.telefone}
        onChange={handleInputChange}
        placeholder="Telefone (DDD + Número)"
        required
        style={styles.input}
      />

      <input
        type="text"
        name="estado"
        value={form.estado}
        onChange={handleInputChange}
        placeholder="Estado"
        style={styles.input}
      />

      <input
        type="text"
        name="cidade"
        value={form.cidade}
        onChange={handleInputChange}
        placeholder="Cidade"
        style={styles.input}
      />

      <input
        type="text"
        name="bairro"
        value={form.bairro}
        onChange={handleInputChange}
        placeholder="Bairro"
        style={styles.input}
      />

      <input
        type="text"
        name="rua"
        value={form.rua}
        onChange={handleInputChange}
        placeholder="Rua"
        style={styles.input}
      />

      <input
        type="text"
        name="numero"
        value={form.numero}
        onChange={handleInputChange}
        placeholder="Número"
        style={styles.input}
      />

      <input
        type="text"
        name="cep"
        value={form.cep}
        onChange={handleInputChange}
        placeholder="CEP"
        style={styles.input}
      />

      <textarea
        name="informacoes"
        value={form.informacoes}
        onChange={handleInputChange}
        placeholder="Informações Adicionais"
        rows="3"
        style={styles.textarea}
      />

      <button type="submit" style={styles.button}>
        {form.id ? 'Atualizar' : 'Cadastrar'}
      </button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#0056b3',
  },
  input: {
    width: '90%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  textarea: {
    width: '90%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  button: {
    width: '95%',
    padding: '10px',
    backgroundColor: '#0056b3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default ClientForm;
