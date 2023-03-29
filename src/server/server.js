// Setup empty JS object to act as endpoint for all routes
projectData = [];
/* const dotenv = require("dotenv");
dotenv.config(); */

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
//app.use(cors());
app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

// Initialize the main project folder
app.use(express.static("dist"));

// Setup Server
app.listen(8081, () => {
  console.log("server is up on 8081!");
});

// Add a GET route that returns the projectData object in your server code
app.get("/all", (req, res) => {
  res.send(projectData[projectData.length - 1]);
});

//add a POST route that fetching data from api
/* app.post("/search", (req, res) => {
  const { imgs, weathers, place, countryName, date, userResponse } = req.body;
  data = {};
  data.countryName = countryName;
  data.date = date;
  data.userResponse = userResponse;
  data.weathers = weathers;
  data.place = place;
  data.imgs = imgs;
  projectData.push(data);
}); */

//add a POST route that adds the data to incoming data
app.post("/add", (req, res) => {
  const { imgs, weathers, place, countryName, date, userResponse } = req.body;
  data = {};
  data.countryName = countryName;
  data.date = date;
  data.userResponse = userResponse;
  data.weathers = weathers;
  data.place = place;
  data.imgs = imgs;

  projectData.push(data);
  res.send(projectData);
});
