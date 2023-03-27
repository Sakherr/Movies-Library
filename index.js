'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const dbSchemaPath = path.join(__dirname, 'schema.sql');
const dbSchema = fs.readFileSync(dbSchemaPath).toString();

const client = new Client(process.env.DATABASE_URL);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




//NEW CODE FOR LAB 14 





app.put('/updateMovie/:id', (req, res) => {
  const { id } = req.params;
  const { comments } = req.body;

  const sql = `UPDATE movies SET comments = $1 WHERE id = $2 RETURNING *`;

  const values = [comments, id];

  client.query(sql, values)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).send(`Movie with id ${id} not found`);
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch((err) => {
      console.error(`Error updating movie with id ${id}`, err);
      res.status(500).send(`Error updating movie with id ${id}`);
    });
});

app.delete('/deleteMovie/:id', (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM movies WHERE id = $1 RETURNING *`;

  const values = [id];

  client.query(sql, values)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).send(`Movie with id ${id} not found`);
      } else {
        res.status(200).send(`Movie with id ${id} deleted`);
      }
    })
    .catch((err) => {
      console.error(`Error deleting movie with id ${id}`, err);
      res.status(500).send(`Error deleting movie with id ${id}`);
    });
});

// Get a specific movie from the database
app.get('/getMovie/:id', (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM movies WHERE id = $1`;

  const values = [id];

  client.query(sql, values)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).send(`Movie with id ${id} not found`);
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch((err) => {
      console.error(`Error getting movie with id ${id}`, err);
      res.status(500).send(`Error getting movie with id ${id}`);
    });
});







client.connect()
  .then(() => {
    console.log('Connected to database');
    client.query(dbSchema)
      .then(() => {
        console.log('Database schema created');
      })
      .catch((err) => {
        console.error('Error creating database schema', err);
      });
  })
  .catch((err) => {
    console.error('Error connecting to database', err);
  });

app.post('/addMovie', (req, res) => {
  const { title, director, year, comments } = req.body;

  const sql = `INSERT INTO movies (title, director, year, comments) 
               VALUES ($1, $2, $3, $4) RETURNING *`;

  const values = [title, director, year, comments];

  client.query(sql, values)
    .then((result) => {
      res.status(201).json(result.rows[0]);
    })
    .catch((err) => {
      console.error('Error adding movie to database', err);
      res.status(500).send('Error adding movie to database');
    });
});

app.get('/getMovies', (req, res) => {
  const sql = 'SELECT * FROM movies';

  client.query(sql)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.error('Error getting movies from database', err);
      res.status(500).send('Error getting movies from database');
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
