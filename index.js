'use strict';
const express = require('express');
const movieData = require('./data.json');

const app = express();
const port = 3001;

function Movie(title, poster_path, overview) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
}

app.get('/', (req, res) => {
  
    const movies = movieData.map(movie =>
         new Movie(movie.title, movie.poster_path, movie.overview));
  
    res.json(movies);
});




app.get('/favorite', (req, res) => {
  
  
  res.send('Welcome to Favorite Page');
});

console.log()


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    responseText: 'Sorry, something went wrong'
  });
});

app.use((req, res, next) => {
  
    res.status(404).send('Sorry, page not found');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
