express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const apiKey = '42572ed793451532e1bec6fcb8de077b';

app.get('/trending', (req, res) => {
  const apiUrl = 'https://api.themoviedb.org/3/trending/movie/week';

  axios
    .get(apiUrl, {
      params: {
        api_key: apiKey,
      },
    })
    .then((response) => {
      const movie = response.data.results[0];

      const formattedData = {
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
        overview: movie.overview,
      };

      res.send(formattedData);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error occurred while fetching trending movie information');
    });
});

app.get('/search', (req, res) => {
  const apiUrl = 'https://api.themoviedb.org/3/search/movie';

  const query = req.query.q;

  axios
    .get(apiUrl, {
      params: {
        api_key: apiKey,
        query: query,
      },
    })
    .then((response) => {
      const movie = response.data.results[0];

      const formattedData = {
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
        overview: movie.overview,
      };

      res.send(formattedData);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error occurred while searching for movie');
    });
});

app.get('/popular', (req, res) => {
  const apiUrl = 'https://api.themoviedb.org/3/movie/popular';

  axios
    .get(apiUrl, {
      params: {
        api_key: apiKey,
      },
    })
    .then((response) => {
      const movies = response.data.results.map((movie) => {
        const formattedData = {
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
          overview: movie.overview,
        };

        return formattedData;
      });

      res.send(movies);
    })
    .catch
    ((error) => {
      console.error(error);
      res.status(500).send('Error occurred while fetching popular movies');
      });
      });
      
      app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
      });
      
      
      
      