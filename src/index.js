const http = require("http");
const getUsers = require("./modules/users");

const host = "http://127.0.0.1";
const port = 3003;

const server = http.createServer((request, response) => {
  // Написать обработчик запроса:
  // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
  // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
  // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
  // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
  // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500

  const ipAddress = "http://127.0.0.1";
  const url = new URL(request.url, ipAddress);
  const userName = url.searchParams.get("hello");

  if (userName) {
    response.statusCode = 200;
    response.statusMessage = "ok";
    response.setHeader("Content-Type", "text/plain");
    response.write(`Hello, ${userName}.`);
    response.end();
    return;
  }

  if (request.url === "/?hello") {
    response.statusCode = 400;
    response.statusMessage = "Bad Request";
    response.setHeader("Content-Type", "text/plain");
    response.write(`Enter a name`);
    response.end();
    return;
  }

  if (request.url === `/?users`) {
    response.statusCode = 200;
    response.statusMessage = "ok";
    response.setHeader("Content-Type", "application/json");
    response.write(getUsers());
    response.end();
    return;
  }

  if (request.url === "/") {
    response.statusCode = 200;
    response.statusMessage = "ok";
    response.setHeader("Content-Type", "text/plain");
    response.write(`Hello, World!`);
    response.end();
    return;
  }

  response.statusCode = 500;
  response.statusMessage = "Internal Server Error";
  response.end();
});

server.listen(port, () =>
  console.log(`Сервер запущен по адресу ${host + ":" + port}`)
);
