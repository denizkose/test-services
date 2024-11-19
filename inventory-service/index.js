const express = require("express");
const cors = require("cors");

const pool = require("./db");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/api/status", (req, res) => {
  res.send("Inventory Service Running");
});

app.post("/api/products", async (req, res) => {
  const { plu, name } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO products (plu, name) VALUES ($1, $2) RETURNING *`,
      [plu, name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ error: "Error creating product", body: req.originalUrl });
  }
});

app.post("/api/stocks", async (req, res) => {
  const { product_id, shop_id, shelf_quantity, order_quantity } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO stocks (product_id, shop_id, shelf_quantity, order_quantity) 
          VALUES ($1, $2, $3, $4) RETURNING *`,
      [product_id, shop_id, shelf_quantity, order_quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating stock entry:", error);
    res.status(500).json({ error: "Error creating stock entry", body: error });
  }
});

app.put("/api/stocks/increase_shelf", async (req, res) => {
  const { amount, stock_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE stocks 
          SET shelf_quantity = shelf_quantity + $1 
          WHERE id = $2
          RETURNING *`,
      [amount, stock_id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error increasing stock shelf quantity:", error);
    res.status(500).json({ error: "Error increasing stock shelf quantity" });
  }
});

app.put("/api/stocks/decrease_shelf", async (req, res) => {
  const { amount, stock_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE stocks 
          SET shelf_quantity = shelf_quantity - $1 
          WHERE id = $2
          RETURNING *`,
      [amount, stock_id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error increasing stock shelf quantity:", error);
    res.status(500).json({ error: "Error increasing stock shelf quantity" });
  }
});

app.put("/api/stocks/increase_order", async (req, res) => {
  const { amount, stock_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE stocks 
          SET order_quantity = order_quantity + $1 
          WHERE id = $2
          RETURNING *`,
      [amount, stock_id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error increasing stock order quantity:", error);
    res.status(500).json({ error: "Error increasing stock order quantity" });
  }
});

app.put("/api/stocks/decrease_order", async (req, res) => {
  const { amount, stock_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE stocks 
          SET order_quantity = order_quantity - $1 
          WHERE id = $2
          RETURNING *`,
      [amount, stock_id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error increasing stock order quantity:", error);
    res.status(500).json({ error: "Error increasing stock order quantity" });
  }
});

app.get("/api/shops", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM shops");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting shops:", error);
    res.status(500).json({ error: "Error getting shops" });
  }
});

app.get("/api/stocks", async (req, res) => {
  const { plu, shop_id, min_shelf, max_shelf, min_order, max_order } =
    req.query;
  const queryParts = [];
  const values = [];

  if (plu) {
    queryParts.push(`products.plu = $${values.length + 1}`);
    values.push(plu);
  }
  if (shop_id) {
    queryParts.push(`stocks.shop_id = $${values.length + 1}`);
    values.push(shop_id);
  }
  if (min_shelf) {
    queryParts.push(`stocks.shelf_quantity >= $${values.length + 1}`);
    values.push(min_shelf);
  }
  if (max_shelf) {
    queryParts.push(`stocks.shelf_quantity <= $${values.length + 1}`);
    values.push(max_shelf);
  }
  if (min_order) {
    queryParts.push(`stocks.order_quantity >= $${values.length + 1}`);
    values.push(min_order);
  }
  if (max_order) {
    queryParts.push(`stocks.order_quantity <= $${values.length + 1}`);
    values.push(max_order);
  }

  const query = `
      SELECT stocks.id, products.plu as product_plu, products.name as product_name, stocks.shelf_quantity, stocks.order_quantity, shops.name as shop_name 
      FROM stocks
      JOIN products ON stocks.product_id = products.id join shops ON stocks.shop_id = shops.id
      ${queryParts.length > 0 ? "WHERE " + queryParts.join(" AND ") : ""}
  `;

  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error filtering stocks:", error);
    res.status(500).json({ error: "Error filtering stocks", body: error });
  }
});

app.get("/api/products", async (req, res) => {
  const { plu, name } = req.query;
  const queryParts = [];
  const values = [];

  if (plu) {
    queryParts.push(`plu ILIKE $${values.length + 1}`);
    values.push(`%${plu}%`);
  }
  if (name) {
    queryParts.push(`name ILIKE $${values.length + 1}`);
    values.push(`%${name}%`);
  }
  const query = `
      SELECT * 
      FROM products
      ${queryParts.length > 0 ? "WHERE " + queryParts.join(" AND ") : ""}
  `;

  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).json({ error: "Error filtering products", body: error });
  }
});

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ text: "It's working!" });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).send("Database connection failed");
  }
});

app.listen(3001, () => {
  console.log("Stocks service is running on port 3001");
});
