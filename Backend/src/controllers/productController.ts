import { Request, Response } from "express";
import { pool } from "../config/db.js";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id"
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, category, image } = req.body;

    const result = await pool.query(
      `INSERT INTO products (name, price, category, image)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, price, category, image]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Insert failed" });
  }
};
