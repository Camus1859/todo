const express = require('express');
const router = new express.Router();
const pool = require('../db/config');
require('dotenv').config();


router.post('/todo', (req, res) => {
    console.log(req.body)
  const { title, list, description, date, priority, notes, daysuntil } = req.body;

  pool.query(
    'INSERT INTO todo_items (title, list, description, date, priority, notes, daysuntil) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
    [title, list, description, date, priority, notes, daysuntil],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(400);
      }
      res.status(201).send(JSON.stringify(results.rows[0].id));
      console.log(results.rows);
    }
  );
});

router.get('/allTodos', async (req, res) => {
  pool.query('SELECT * FROM todo_items', (error, results) => {
    if (error) {
      console.log(error);
      res.status(400);
    }

    res.status(200).send(results.rows);
  });
});

router.delete('/todo/:id', async (req, res) => {
  const id = req.params.id;


  pool.query('DELETE FROM todo_items WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(400);
    }
    res.status(200).end();
  });
});

router.patch('/todo/:id', async (req, res) => {
  const id = req.params.id;
  const { title, description, date, priority, notes, daysuntil } = req.body;

  pool.query(
    'UPDATE todo_items SET title = $1, description = $2, date = $3, priority = $4, notes = $5, daysuntil = $6 WHERE id = $7 RETURNING title, description, date, priority, notes, daysuntil, id',
    [title, description, date, priority, notes, daysuntil, id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(400);
      }
      res.status(201).send(results.rows[0]);
    }
  );
});

module.exports = router;
