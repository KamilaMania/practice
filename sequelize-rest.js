const express = require("express");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:123@localhost:5432/postgres"
);
const app = express();
const port = 4000;

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

app.listen(port, () => console.log("listening on port " + port));
