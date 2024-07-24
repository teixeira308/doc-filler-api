"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePessoa = exports.updatePessoa = exports.getPessoaById = exports.getPessoas = exports.createPessoa = void 0;
const data_source_1 = require("../data-source");
const Person_1 = require("../entity/Person");
const createPessoa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pessoaRepository = data_source_1.AppDataSource.getRepository(Person_1.Person);
    const { nome, cpf, rg, dataNascimento, numeroCarteiraTrabalho, email, dataAdmissao, nomeMae, nomePai, telefone, estadoCivil, funcao, genero, celular } = req.body;
    const user = req.user;
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const pessoa = new Person_1.Person();
    pessoa.nome = nome;
    pessoa.cpf = cpf;
    pessoa.rg = rg;
    pessoa.dataNascimento = dataNascimento ? new Date(dataNascimento) : undefined;
    pessoa.numeroCarteiraTrabalho = numeroCarteiraTrabalho;
    pessoa.email = email;
    pessoa.dataAdmissao = dataAdmissao ? new Date(dataAdmissao) : undefined;
    pessoa.nomeMae = nomeMae;
    pessoa.nomePai = nomePai;
    pessoa.telefone = telefone;
    pessoa.estadoCivil = estadoCivil;
    pessoa.funcao = funcao;
    pessoa.genero = genero;
    pessoa.celular = celular;
    pessoa.user = user;
    try {
        const savedPessoa = yield pessoaRepository.save(pessoa);
        // Omite a propriedade `user` da resposta
        // Cria um novo objeto com as propriedades na ordem desejada
        const responsePessoa = {
            id: savedPessoa.id,
            nome: savedPessoa.nome,
            cpf: savedPessoa.cpf,
            rg: savedPessoa.rg,
            dataNascimento: savedPessoa.dataNascimento,
            numeroCarteiraTrabalho: savedPessoa.numeroCarteiraTrabalho,
            email: savedPessoa.email,
            dataAdmissao: savedPessoa.dataAdmissao,
            nomeMae: savedPessoa.nomeMae,
            nomePai: savedPessoa.nomePai,
            telefone: savedPessoa.telefone,
            celular: savedPessoa.celular,
            estadoCivil: savedPessoa.estadoCivil,
            funcao: savedPessoa.funcao,
            genero: savedPessoa.genero,
            createdAt: savedPessoa.createdAt,
            updatedAt: savedPessoa.updatedAt,
        };
        res.status(201).json(responsePessoa);
    }
    catch (error) {
        console.error('Error creating pessoa', error);
        res.status(500).json({ message: 'Error creating pessoa', error });
    }
});
exports.createPessoa = createPessoa;
const getPessoas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pessoaRepository = data_source_1.AppDataSource.getRepository(Person_1.Person);
    const user = req.user; // Assumindo que o userId está disponível em req.user
    try {
        const pessoas = yield pessoaRepository.find({ where: { user: user } });
        res.status(200).json(pessoas);
    }
    catch (error) {
        console.error('Error fetching pessoas', error);
        res.status(500).json({ message: 'Error fetching pessoas', error });
    }
});
exports.getPessoas = getPessoas;
const getPessoaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pessoaRepository = data_source_1.AppDataSource.getRepository(Person_1.Person);
    const { id } = req.params;
    const user = req.user; // Assumindo que o userId está disponível em req.user
    try {
        const pessoa = yield pessoaRepository.findOne({ where: { id: Number(id), user: user } });
        if (!pessoa) {
            return res.status(404).json({ message: 'Pessoa not found' });
        }
        res.status(200).json(pessoa);
    }
    catch (error) {
        console.error('Error fetching pessoa', error);
        res.status(500).json({ message: 'Error fetching pessoa', error });
    }
});
exports.getPessoaById = getPessoaById;
const updatePessoa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pessoaRepository = data_source_1.AppDataSource.getRepository(Person_1.Person);
    const { id } = req.params;
    const { nome, cpf, rg, dataNascimento, numeroCarteiraTrabalho, email, dataAdmissao, nomeMae, nomePai, endereco, telefone, estadoCivil, funcao, genero, celular } = req.body;
    const user = req.user; // Assumindo que o userId está disponível em req.user
    try {
        const pessoa = yield pessoaRepository.findOne({ where: { id: Number(id), user: user } });
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
        const updatedPessoa = yield pessoaRepository.save(pessoa);
        res.status(200).json(updatedPessoa);
    }
    catch (error) {
        console.error('Error updating pessoa', error);
        res.status(500).json({ message: 'Error updating pessoa', error });
    }
});
exports.updatePessoa = updatePessoa;
const deletePessoa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pessoaRepository = data_source_1.AppDataSource.getRepository(Person_1.Person);
    const { id } = req.params;
    const user = req.user; // Assumindo que o userId está disponível em req.user
    try {
        const pessoa = yield pessoaRepository.findOne({ where: { id: Number(id), user: user } });
        if (!pessoa) {
            return res.status(404).json({ message: 'Pessoa not found' });
        }
        yield pessoaRepository.remove(pessoa);
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting pessoa', error);
        res.status(500).json({ message: 'Error deleting pessoa', error });
    }
});
exports.deletePessoa = deletePessoa;
