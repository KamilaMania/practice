const express = require("express");
const Sequelize = require("sequelize");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

const corsMiddleware = cors();
app.use(corsMiddleware);

const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

const sequelize = new Sequelize(
  "postgres://postgres:123@localhost:5432/postgres"
);

const Movie = sequelize.define("movie", {
  title: Sequelize.TEXT,
  yearOfRelease: Sequelize.INTEGER,
  synopsis: Sequelize.TEXT
});

sequelize
  .sync()
  .then(() => Movie.truncate())
  .then(() =>
    Movie.create({
      title: "Zuzia",
      yearOfRelease: 3333,
      synopsis: "Beer"
    })
  )
  .then(() =>
    Movie.create({
      title: "Mateusz",
      yearOfRelease: 4444,
      synopsis: "Vodka"
    })
  )
  .then(() =>
    Movie.create({
      title: "Kamila",
      yearOfRelease: 5555,
      synopsis: "Whisky"
    })
  )
  .then(movie => {
    console.log(movie.toJSON());
  })
  .catch(console.error);

//Get all movies
app.get("/allmovies", (req, res) => {
  Movie.findAll().then(result => {
    res.send(result);
  });
});

//Get one movie by title
app.get("/allmovies/:title", (req, res) => {
  Movie.findOne({ where: { title: req.params.title } }).then(result => {
    res.send(result);
  });
});

//Create new movie
app.post("/createmovie", (req, res) => {
  Movie.create({
    title: req.body.title,
    yearOfRelease: req.body.yearOfRelease,
    synopsis: req.body.synopsis
  });
  res.json({ message: "movie successfully created" });
});

//updating a movie title by id
app.put("/updatemovie/:id", (req, res) => {
  Movie.findOne({ where: { id: req.params.id } }).then(movie => {
    console.log(movie);
    if (movie) {
      movie
        .update({
          title: req.body.title
        })
        .then(function() {
          res.send("successful updated");
        });
    }
  });
});

// delete movie
app.delete("/deletemovie/:id", (req, res) => {
  Movie.destroy({ where: { id: req.params.id } }).then(() => {
    res.json({ message: "movie successfully deleted" });
  });
});

//Pagination
app.get("/allmoviespag", (req, res) => {
  let limit = req.query.limit || 3;
  let offset = req.query.offset || 1;
  Movie.findAndCountAll({
    offset: offset,
    limit: limit
  }).then(result => {
    let total = result.count;
    let movies = result.rows;
    let response = {
      data: movies,
      total: total
    };

    res.json(response);
  });
});

app.listen(port, () => console.log("listening on port " + port));
