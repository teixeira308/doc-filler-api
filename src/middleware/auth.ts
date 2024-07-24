import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id: decoded.userId });

      if (user) {
        req.user = user;
        return next();
      } else {
        return res.status(403).json({ message: 'User not found' });
      }
    } catch (error) {
      return res.status(403).json({ message: 'Forbidden' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
