import { Request, Response } from "express";
import { pool } from "../db.js";

export const checkout = async (req: Request, res: Response) => {

  try {

    // 1. Create order
    const orderResult = await pool.query(
      "INSERT INTO orders DEFAULT VALUES RETURNING id"
    );

    const orderId = orderResult.rows[0].id;

    // 2. Get cart items
    const cartItems = await pool.query(
      "SELECT * FROM cart"
    );

    // 3. Move cart items to order_items
    for (const item of cartItems.rows) {

      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity)
         VALUES ($1, $2, $3)`,
        [orderId, item.product_id, item.quantity]
      );

    }

    // 4. Clear cart
    await pool.query("DELETE FROM cart");

    res.json({
      message: "Checkout successful",
      orderId: orderId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Checkout failed"
    });

  }

};
