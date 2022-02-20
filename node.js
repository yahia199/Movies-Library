"use strict";

const express = require("express");

const data = require("./data.json");

const app = express();

function needData(title, poster_path, overview) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
}

app.get("/", endPointHandler);
app.get("/favorite", favoritePointHandler);

// app.get("/data", dataHandler);

// function endPointHandler(req, res) {
//   res.send("data");
//   //   console.log(data);
//}
function favoritePointHandler(req, res) {
  return res.send("Welcome to Favorite Page");
}

function endPointHandler(request, response) {
  let result = [];
  needData.data.forEach((value) => {
    let newData = new needData(value.title, value.poster_path, value.overview);
    result.push(needData);
    // console.log(value);
  });

  //   console.log(data);
  return response.json(result);
  //   return response.send("Hello World");
}

app.listen(3000, () => {
  console.log("listen to 3000");
});
