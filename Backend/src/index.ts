import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";




dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);


app.get("/", (req, res) => {
  res.send("Supermarket API running");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
