// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Pega o token depois de "Bearer"

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Access token is invalid or expired' });
    }
    req.user = user;
    next();
  });
};
