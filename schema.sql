CREATE TABLE  movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  director VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  comments TEXT
);
