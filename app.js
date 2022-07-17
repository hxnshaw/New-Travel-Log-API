require("dotenv").config();
require("express-async-errors");

//EXPRESS.
const express = require("express");
const app = express();

//OTHER PACKAGES
const morgan = require("morgan");

//DATABASE.
const connectDB = require("./db/connect");

//ROUTERS

//REQUIRE NOT-FOUND AND ERRORHANDLER MIDDLEWARES

app.use(morgan("tiny"));
app.use(express.json());

//SETUP ROUTERS
app.get("/", (req, res) => {
  res.send("HOMEPAGE");
  return console.log("Home Page");
});

const port = process.env.PORT || 9999;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is up on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
