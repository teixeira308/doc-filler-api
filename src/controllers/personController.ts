// src/controllers/pessoaController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Person } from '../entity/Person';

export const createPessoa = async (req: Request, res: Response) => {
  const pessoaRepository = AppDataSource.getRepository(Person);
  const {
    nome, cpf, rg, dataNascimento, numeroCarteiraTrabalho, email, dataAdmissao,
    nomeMae, nomePai, endereco, telefone, estadoCivil, funcao, genero, celular
  } = req.body;

  const pessoa = new Person();
  pessoa.nome = nome;
  pessoa.cpf = cpf;
  pessoa.rg = rg;
  pessoa.dataNascimento = new Date(dataNascimento);
  pessoa.numeroCarteiraTrabalho = numeroCarteiraTrabalho;
  pessoa.email = email;
  pessoa.dataAdmissao = new Date(dataAdmissao);
  pessoa.nomeMae = nomeMae;
  pessoa.nomePai = nomePai;
  pessoa.endereco = endereco;
  pessoa.telefone = telefone;
  pessoa.estadoCivil = estadoCivil;
  pessoa.funcao = funcao;
  pessoa.genero = genero;
  pessoa.celular = celular;

  try {
    const savedPessoa = await pessoaRepository.save(pessoa);
    res.status(201).json(savedPessoa);
  } catch (error) {
    console.error('Error creating pessoa', error);
    res.status(500).json({ message: 'Error creating pessoa', error });
  }
};

export const getPessoas = async (_req: Request, res: Response) => {
  const pessoaRepository = AppDataSource.getRepository(Person);

  try {
    const pessoas = await pessoaRepository.find();
    res.status(200).json(pessoas);
  } catch (error) {
    console.error('Error fetching pessoas', error);
    res.status(500).json({ message: 'Error fetching pessoas', error });
  }
};

export const getPessoaById = async (req: Request, res: Response) => {
  const pessoaRepository = AppDataSource.getRepository(Person);
  const { id } = req.params;

  try {
    const pessoa = await pessoaRepository.findOneBy({ id: Number(id) });

    if (!pessoa) {
      return res.status(404).json({ message: 'Pessoa not found' });
    }

    res.status(200).json(pessoa);
  } catch (error) {
    console.error('Error fetching pessoa', error);
    res.status(500).json({ message: 'Error fetching pessoa', error });
  }
};

export const updatePessoa = async (req: Request, res: Response) => {
  const pessoaRepository = AppDataSource.getRepository(Person);
  const { id } = req.params;
  const {
    nome, cpf, rg, dataNascimento, numeroCarteiraTrabalho, email, dataAdmissao,
    nomeMae, nomePai, endereco, telefone, estadoCivil, funcao, genero, celular
  } = req.body;

  try {
    const pessoa = await pessoaRepository.findOneBy({ id: Number(id) });

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
    pessoa.endereco = endereco || pessoa.endereco;
    pessoa.telefone = telefone || pessoa.telefone;
    pessoa.estadoCivil = estadoCivil || pessoa.estadoCivil;
    pessoa.funcao = funcao || pessoa.funcao;
    pessoa.genero = genero || pessoa.genero;
    pessoa.celular = celular || pessoa.celular;

    const updatedPessoa = await pessoaRepository.save(pessoa);
    res.status(200).json(updatedPessoa);
  } catch (error) {
    console.error('Error updating pessoa', error);
    res.status(500).json({ message: 'Error updating pessoa', error });
  }
};

export const deletePessoa = async (req: Request, res: Response) => {
  const pessoaRepository = AppDataSource.getRepository(Person);
  const { id } = req.params;

  try {
    const pessoa = await pessoaRepository.findOneBy({ id: Number(id) });

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
