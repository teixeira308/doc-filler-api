import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Logger from "../../src/config/logger"

export const createUser = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const { name, email, password, status } = req.body;

  try {
    // Verifica se o e-mail já está em uso
    const existingUser = await userRepository.findOneBy({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já utilizado' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Cria um novo usuário
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.status = status || 'active';  // Define status padrão como 'active'

    // Salva o usuário
    const savedUser = await userRepository.save(user);
   
    // Remove o campo de senha antes de retornar o usuário
    const { password: _, ...userWithoutPassword } = savedUser;
    Logger.info("Created user: "+JSON.stringify(userWithoutPassword))
    res.status(201).json(userWithoutPassword);

  } catch (error) {
     Logger.error('Error ao criar user', error);
    res.status(500).json({ message: 'Error ao criar user', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const email  = req.body.email;
  const passw  = req.body.password;

  try {
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return res.status(400).json({ message: 'User não encontrado' });
    }

    if (user.status !== 'active') {
      return res.status(403).json({ message: 'User inativo' });
    }

    const validPassword = await bcrypt.compare(passw, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Senha inválida' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    // Remove the password field before returning user info
    const { password, ...userWithoutPassword } = user;
    Logger.info("Login user: "+JSON.stringify(userWithoutPassword))
    res.status(200).json({ token, ...userWithoutPassword });
  } catch (error) {
     Logger.error('Error ao logar com user', error);
    res.status(500).json({ message: 'Error  ao logar com user', error });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);

  try {
    const users = await userRepository.find();
    // Remove the password field from each user
    const usersWithoutPasswords = users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
    Logger.info("Get users: "+JSON.stringify(usersWithoutPasswords))
    res.status(200).json(usersWithoutPasswords);
  } catch (error) {
     Logger.error('Error fetching users', error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const { id, status } = req.body;

  try {
    const user = await userRepository.findOneBy({ id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.status = status;
    await userRepository.save(user);

    // Remove the password field before returning the updated user
    const { password, ...userWithoutPassword } = user;
    Logger.info("Update users: "+JSON.stringify(userWithoutPassword))
    res.status(200).json(userWithoutPassword);
  } catch (error) {
     Logger.error('Error updating user status', error);
    res.status(500).json({ message: 'Error updating user status', error });
  }
};
