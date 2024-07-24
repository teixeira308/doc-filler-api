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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserStatus = exports.getUsers = exports.loginUser = exports.createUser = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const { name, email, password, status } = req.body;
    try {
        // Verifica se o e-mail já está em uso
        const existingUser = yield userRepository.findOneBy({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já utilizado' });
        }
        // Criptografa a senha
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Cria um novo usuário
        const user = new User_1.User();
        user.name = name;
        user.email = email;
        user.password = hashedPassword;
        user.status = status || 'active'; // Define status padrão como 'active'
        // Salva o usuário
        const savedUser = yield userRepository.save(user);
        // Remove o campo de senha antes de retornar o usuário
        const { password: _ } = savedUser, userWithoutPassword = __rest(savedUser, ["password"]);
        res.status(201).json(userWithoutPassword);
    }
    catch (error) {
        console.error('Error ao criar user', error);
        res.status(500).json({ message: 'Error ao criar user', error });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const email = req.body.email;
    const passw = req.body.password;
    try {
        const user = yield userRepository.findOneBy({ email });
        if (!user) {
            return res.status(400).json({ message: 'User não encontrado' });
        }
        if (user.status !== 'active') {
            return res.status(403).json({ message: 'User inativo' });
        }
        const validPassword = yield bcrypt_1.default.compare(passw, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Senha inválida' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        // Remove the password field before returning user info
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        res.status(200).json(Object.assign({ token }, userWithoutPassword));
    }
    catch (error) {
        console.error('Error ao logar com user', error);
        res.status(500).json({ message: 'Error  ao logar com user', error });
    }
});
exports.loginUser = loginUser;
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    try {
        const users = yield userRepository.find();
        // Remove the password field from each user
        const usersWithoutPasswords = users.map((_a) => {
            var { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
            return userWithoutPassword;
        });
        res.status(200).json(usersWithoutPasswords);
    }
    catch (error) {
        console.error('Error fetching users', error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
});
exports.getUsers = getUsers;
const updateUserStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const { id, status } = req.body;
    try {
        const user = yield userRepository.findOneBy({ id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.status = status;
        yield userRepository.save(user);
        // Remove the password field before returning the updated user
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        res.status(200).json(userWithoutPassword);
    }
    catch (error) {
        console.error('Error updating user status', error);
        res.status(500).json({ message: 'Error updating user status', error });
    }
});
exports.updateUserStatus = updateUserStatus;
