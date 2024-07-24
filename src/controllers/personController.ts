// src/controllers/pessoaController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Person } from '../entity/Person';
import { User } from '../entity/User';

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const createPessoa = async (req: AuthenticatedRequest, res: Response) => {
  const pessoaRepository = AppDataSource.getRepository(Person);
  const user = req.user; // Assumindo que o user está disponível em req.user

  if (!user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const {
    nome, cpf, rg, dataNascimento, numeroCarteiraTrabalho, email, dataAdmissao,
    nomeMae, nomePai, endereco, telefone, estadoCivil, funcao, genero, celular
  } = req.body;

  const pessoa = new Person();
  pessoa.nome = nome;
  pessoa.cpf = cpf;
  pessoa.rg = rg;
  pessoa.dataNascimento = dataNascimento ? new Date(dataNascimento) : undefined;
  pessoa.numeroCarteiraTrabalho = numeroCarteiraTrabalho;
  pessoa.email = email;
  pessoa.dataAdmissao = dataAdmissao ? new Date(dataAdmissao) : undefined;
  pessoa.nomeMae = nomeMae;
  pessoa.nomePai = nomePai;
  pessoa.endereco = endereco;
  pessoa.telefone = telefone;
  pessoa.estadoCivil = estadoCivil;
  pessoa.funcao = funcao;
  pessoa.genero = genero;
  pessoa.celular = celular;
  pessoa.userId = user.id; // Defina o userId diretamente

  try {
    const savedPessoa = await pessoaRepository.save(pessoa);
    res.status(201).json({ id: savedPessoa.id }); // Retorna apenas o ID
  } catch (error) {
    console.error('Error creating pessoa', error);
    res.status(500).json({ message: 'Error creating pessoa', error });
  }
};


export const getPessoas = async (req: AuthenticatedRequest, res: Response) => {
  const pessoaRepository = AppDataSource.getRepository(Person);
  const user = req.user; // Assumindo que o user está disponível em req.user

  if (!user || !user.id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const pessoas = await pessoaRepository.find({ where: { userId: user.id } });

    // Remove userId de cada pessoa antes de enviar a resposta
    const pessoasWithoutUserId = pessoas.map(({ userId, ...rest }) => rest);

    res.status(200).json(pessoasWithoutUserId);
  } catch (error) {
    console.error('Error fetching pessoas', error);
    res.status(500).json({ message: 'Error fetching pessoas', error });
  }
};



export const getPessoaById = async (req: AuthenticatedRequest, res: Response) => {
  const pessoaRepository = AppDataSource.getRepository(Person);
  const { id } = req.params;
  const user = req.user; // Assumindo que o userId está disponível em req.user

  if (!user || !user.id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const pessoa = await pessoaRepository.findOne({
      where: { id: Number(id), userId: user.id }
    });

    if (!pessoa) {
      return res.status(404).json({ message: 'Pessoa not found' });
    }

    // Remove userId antes de enviar a resposta
    const { userId, ...pessoaWithoutUserId } = pessoa;

    res.status(200).json(pessoaWithoutUserId);
  } catch (error) {
    console.error('Error fetching pessoa', error);
    res.status(500).json({ message: 'Error fetching pessoa', error });
  }
};

export const updatePessoa = async (req: AuthenticatedRequest, res: Response) => {
  const pessoaRepository = AppDataSource.getRepository(Person);
  const { id } = req.params;
  const {
    nome, cpf, rg, dataNascimento, numeroCarteiraTrabalho, email, dataAdmissao,
    nomeMae, nomePai, endereco, telefone, estadoCivil, funcao, genero, celular
  } = req.body;
  const user = req.user; // Assumindo que o userId está disponível em req.user

  if (!user || !user.id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const pessoa = await pessoaRepository.findOne({
      where: { id: Number(id), userId: user.id }
    });

    if (!pessoa) {
      return res.status(404).json({ message: 'Pessoa not found' });
    }

    pessoa.nome = nome || pessoa.nome;
    pessoa.cpf = cpf || pessoa.cpf;
    pessoa.rg = rg || pessoa.rg;
    pessoa.dataNascimento = dataNascimento ? new Date(dataNascimento) : pessoa.dataNascimento;
    pessoa.numeroCarteiraTrabalho = numeroCarteiraTrabalho || pessoa.numeroCarteiraTrabalho;
    pessoa.email = email || pessoa.email;
    pessoa.dataAdmissao = dataAdmissao ? new Date(dataAdmissao) : pessoa.dataAdmissao;
    pessoa.nomeMae = nomeMae || pessoa.nomeMae;
    pessoa.nomePai = nomePai || pessoa.nomePai;
    pessoa.telefone = telefone || pessoa.telefone;
    pessoa.estadoCivil = estadoCivil || pessoa.estadoCivil;
    pessoa.funcao = funcao || pessoa.funcao;
    pessoa.genero = genero || pessoa.genero;
    pessoa.celular = celular || pessoa.celular;

    const updatedPessoa = await pessoaRepository.save(pessoa);

    // Remove userId antes de enviar a resposta
    const { userId, ...updatedPessoaWithoutUserId } = updatedPessoa;

    res.status(200).json(updatedPessoaWithoutUserId);
  } catch (error) {
    console.error('Error updating pessoa', error);
    res.status(500).json({ message: 'Error updating pessoa', error });
  }
};


export const deletePessoa = async (req: AuthenticatedRequest, res: Response) => {
  const pessoaRepository = AppDataSource.getRepository(Person);
  const { id } = req.params;
  const user = req.user; // Assumindo que o userId está disponível em req.user

  if (!user || !user.id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const pessoa = await pessoaRepository.findOne({
      where: { id: Number(id), userId: user.id } // Utilize userId para filtrar
    });

    if (!pessoa) {
      return res.status(404).json({ message: 'Pessoa not found' });
    }

    await pessoaRepository.remove(pessoa);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting pessoa', error);
    res.status(500).json({ message: 'Error deleting pessoa', error });
  }
};