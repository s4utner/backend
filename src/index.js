const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const logger = require("./middlewares/logger");

dotenv.config();

const {
  PORT = 3005,
  API_URL = "http://127.0.0.1",
  NONGO_URL = "mongodb://127.0.0.1:27017/backend",
} = process.env;

mongoose
  .connect(NONGO_URL)
  .then(() => {
    console.log(`Connected to MongoDb: ${NONGO_URL}`);
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(cors());

app.use(logger);

app.use(bodyParser.json());

app.use(userRouter);
app.use(bookRouter);

app.listen(PORT, () =>
  console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`)
);
