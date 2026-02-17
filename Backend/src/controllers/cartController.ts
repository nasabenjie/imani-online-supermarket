import { Request, Response } from "express";
import { pool } from "../db.js";


export const addToCart = async (req: Request, res: Response) => {
  const { product_id, quantity } = req.body;

  const result = await pool.query(
    "INSERT INTO cart (product_id, quantity) VALUES ($1, $2) RETURNING *",
    [product_id, quantity]
  );

  res.json(result.rows[0]);
};

export const getCart = async (req: Request, res: Response) => {
  const result = await pool.query(`
    SELECT cart.id, products.name, products.price, cart.quantity
    FROM cart
    JOIN products ON cart.product_id = products.id
  `);

  res.json(result.rows);
};
