import express, { Request, Response } from 'express';
import pool from './db';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/history/stock', async (req: Request, res: Response) => {
    const { plu, shop_id, action, min_action_date, max_action_date, page, limit } = req.query;
    const p = parseInt(page as string) || 1
    const l = parseInt(limit as string) || 10;
    const startIndex = (p - 1) * l;
    const total = (await pool.query('SELECT count(*) FROM history')).rows[0]['count']
    const queryParts = [];
    const values = [];
    if (plu) {
        queryParts.push(`p.plu = $${values.length + 1}`);
        values.push(plu);
    }
    if (shop_id) {
        queryParts.push(`s.shop_id = $${values.length + 1}`);
        values.push(shop_id);
    }
    if (action) {
        queryParts.push(`h.action = $${values.length + 1}`);
        values.push(action);
    }
    if (min_action_date) {
        queryParts.push(`h.action_date >= $${values.length + 1}`);
        values.push(min_action_date);
    }
    if (max_action_date) {
        queryParts.push(`h.action_date <= $${values.length + 1}`);
        values.push(max_action_date);
    }

    const query = `
     SELECT h.id, h.stock_id, h.action, h.action_date, s.shop_id, p.plu
      FROM history h
      JOIN stocks s on h.stock_id = s.id
      JOIN products p on s.product_id = p.id
      ${queryParts.length > 0 ? "WHERE " + queryParts.join(" AND ") : ""}
      LIMIT ${l} OFFSET ${startIndex}
  `;

    console.log(p, l, total)
    try {
        const result = await pool.query(query, values);
        const data = {
            page: p,
            limit: l,
            total: total,
            pages: Math.ceil(total / l),
        }
        res.status(200).json({ items: result.rows, data: data });
    } catch (error) {
        console.error("Error filtering history entries:", error);
        res.status(500).json({ error: "Error filtering history entries", body: error });
    }
});

app.post("/api/history/stock", async (req: Request, res: Response) => {
    const { stock_id, action } = req.body;
    console.log(stock_id, action)

    try {
        const date = new Date().toISOString();
        const result = await pool.query(
            `INSERT INTO history (stock_id, action, action_date) VALUES ($1, $2, $3) RETURNING *`,
            [stock_id, action, date]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating history entry:", error);
        res
            .status(500)
            .json({ error: "Error creating history entry", body: error });
    }
});

app.get('/api/health', async (req: Request, res: Response) => {
    try {
        await pool.query('SELECT 1'); // Basic query to test the connection
        res.send('Database connection is working');
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).send('Database connection failed');
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send('History Service Running');
});

app.listen(3002, () => {
    console.log('History service is running on port 3002');
});
