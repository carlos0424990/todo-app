import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import pool from '../config/db';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/config';

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await pool.query('SELECT name FROM users WHERE email = $1 LIMIT 1', [email])
    if (user.rowCount && user.rowCount>0) {
        res.status(400).json({ message: "User already exists" })
        return
    }
    pool.query('INSERT INTO users (name,email, password) VALUES ($1, $2,$3)', [name, email, hashed])
    res.send("ok")
})

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) {
        res.status(400).json({ message: 'Invalid credentials' });
        return
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match){
        res.status(400).json({ message: 'Invalid credentials' });
        return
    }
    const token = jwt.sign({ id: user.id }, config.SECRET,{ expiresIn: '1d' });
    res.json({id:user.id,name:user.name,email:user.email, token });
})