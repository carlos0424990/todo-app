import config from "../config/config";
import jwt from 'jsonwebtoken'

export const authMiddleware = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader){
      res.status(401).json({ message: 'No token provided' });
      return
  } 
  try {
    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, config.SECRET);
    req.user_id = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};