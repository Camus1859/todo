const express = require('express');
const router = new express.Router();
const pool = require('../db/queries');
require('dotenv').config();
const fetch = require('node-fetch');

router.post('/todo', (req, res) => {
  const { title, list, description, dueDate, priority, notes } = req.body;

  pool.query(
    'INSERT INTO todo_items (task_name, list_type, description, date, priority, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING todo_id',
    [title, list, description, dueDate, priority, notes],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(400);
      }
      res.status(201).send(JSON.stringify(results.rows[0].todo_id));
      console.log(results.rows[0].todo_id)
    }
  );









});

router.delete('/todo/:id', async (req, res)=> {



  console.log(req.params.id)
})


module.exports = router;
