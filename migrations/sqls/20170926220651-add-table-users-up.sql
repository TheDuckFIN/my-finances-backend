CREATE TABLE users(
  id        serial PRIMARY KEY,
  username  text NOT NULL,
  password  text NOT NULL
);