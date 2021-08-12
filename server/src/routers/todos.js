const express = require('express');
const router = new express.Router();
const pool = require('../db/queries');
require('dotenv').config();
const fetch = require('node-fetch');

router.post('/todo', (req, res) => {
  const { title, list, description, date, priority, notes } = req.body;

  pool.query(
    'INSERT INTO todo_items (title, list, description, date, priority, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    [title, list, description, date, priority, notes],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(400);
      }
      res.status(201).send(JSON.stringify(results.rows[0].id));
      console.log(results.rows[0].id);
    }
  );
});




router.get('/allTodos', async(req, res)=> {

  pool.query('SELECT * FROM todo_items', (error, results)=> {
    if (error){
      console.log(error)
      res.status(400)
    }
    console.log(results.rows)
    console.log('rannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')

    res.status(201).send(results.rows)
  })


})








router.delete('/todo/:id', async (req, res) => {
  const id = req.params.id

  console.log(id)

  pool.query('DELETE FROM todo_items WHERE id = $1', [id], (error, results)=> {
    if (error){
      console.log(error)
      results.status(400)
    }
    res.status(201)

  })
});

module.exports = router;
