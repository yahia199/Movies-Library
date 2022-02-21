"use strict";

const express = require("express");

const data = require("./data.json");

const dotenv = require("dotenv");

const app = express();

const axios = require("axios");

dotenv.config();

const APIKEY = process.env.APIKEY;
console.log(APIKEY);

function needData(title, poster_path, overview) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
}

app.get("/", endPointHandler);
app.get("/favorite", favoritePointHandler);
app.get("/trending", trendingData);
app.get("/search", searchHandler);
app.use("*", notFoundHandler);
app.use(errorHandler);

// app.get("/data", dataHandler);

// function endPointHandler(req, res) {
//   res.send("data");
//   //   console.log(data);
// }
function favoritePointHandler(req, res) {
  return res.send("Welcome to Favorite Page");
}

function endPointHandler(request, response) {
  let result = [];
  data.data.forEach((value) => {
    let newData = new needData(value.title, value.poster_path, value.overview);
    result.push(newData);
    console.log(result);
  });

  //   console.log(data);
  return response.json(data.data);
  //   return response.send("Hello World");
}

function trendingData(req, res) {
  let result = [];
  let trinding = axios
    .get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}&language=en-US `
    )
    .then((apiResponse) => {
      apiResponse.data.results.map((value) => {
        let newData = new needData(
          value.title || "N/A",
          value.poster_path || "N/A",
          value.overview || "N/A"
        );
        result.push(newData);
      });
      return res.status(200).json(result);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

function searchHandler(req, res) {
  console.log(req);
  let result = [];
  axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${search}`
  );
}

function errorHandler(error, req, res) {
  const err = {
    status: 500,
    message: error,
  };
  return res.status(500).send(err);
}

function notFoundHandler(req, res) {
  return res.status(500).send("page not found error");
}

app.listen(4000, () => {
  console.log("listen to 4000");
});
