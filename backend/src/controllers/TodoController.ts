import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import pool from '../config/db';

export const createNewTask = asyncHandler(async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const user_id = (req as any).user_id
    const resp = await pool.query('INSERT INTO todos (title,description,user_id) VALUES ($1, $2,$3) RETURNING *', [title, description, user_id])
    res.send(resp.rows[0])
})
export const getTasks = asyncHandler(async (req: Request, res: Response) => {
    const user_id = (req as any).user_id
    const resp = await pool.query('SELECT * FROM todos WHERE user_id = $1', [user_id])
    res.send(resp.rows)
})

export const completedTask = asyncHandler(async (req: Request, res: Response) => {
    const {todo_id}=req.body
    const user_id = (req as any).user_id
    const resp = await pool.query(`
        UPDATE todos
        SET completed = CASE
            WHEN completed = TRUE THEN FALSE
            ELSE TRUE
        END
        WHERE id = $1 and user_id = $2
        `, [todo_id,user_id])
            res.send(resp.rows)
})

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
    const {todo_id}=req.query
    const user_id = (req as any).user_id
    const resp = await pool.query(`DELETE from todos WHERE id = $1 and user_id = $2`, [todo_id,user_id])
    res.send("ok")
})

export const editTask = asyncHandler(async (req: Request, res: Response) => {
    const {todo_id,title,description}=req.body
    const user_id = (req as any).user_id
    const resp = await pool.query(`
        UPDATE todos
        SET 
        title = $1,
        description = $2
        WHERE id = $3 and user_id = $4
        RETURNING *`, [title,description,todo_id,user_id])
    res.send(resp.rows[0])
})