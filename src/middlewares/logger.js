const { request, response } = require("express");

const { PORT = 3005, API_URL = "http://127.0.0.1" } = process.env;

const logger = (request, response, next) => {
  console.log(
    `Запрос пришел по адресу: ${API_URL}:${PORT}${request.originalUrl}`
  );
  next();
};

module.exports = logger;
