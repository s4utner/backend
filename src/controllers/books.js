const { request, response } = require("express");
const Book = require("../models/book");

const getBooks = (request, response) => {
  return Book.find({})
    .then((books) => {
      if (!books) {
        response.statusCode = 404;
        return;
      }

      response.statusCode = 200;
      response.send(books);
    })
    .catch((error) => {
      response.statusCode = 500;
      response.send(error.message);
    });
};

const getBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findById(book_id)
    .then((book) => {
      if (!book) {
        response.statusCode = 404;
        return;
      }

      response.statusCode = 200;
      response.send(book);
    })
    .catch((error) => {
      response.statusCode = 500;
      response.send(error.message);
    });
};

const createBook = (request, response) => {
  return Book.create({ ...request.body })
    .then((book) => {
      if (!book) {
        response.statusCode = 404;
        return;
      }

      response.statusCode = 201;
      response.send(book);
    })
    .catch((error) => {
      response.statusCode = 500;
      response.send(error.message);
    });
};

const updateBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findByIdAndUpdate(book_id, { ...request.body })
    .then((book) => {
      if (!book) {
        response.statusCode = 404;
        return;
      }

      response.statusCode = 201;
      response.send("Информация о книге успешно изменена");
    })
    .catch((error) => {
      response.statusCode = 500;
      response.send(error.message);
    });
};

const deleteBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findByIdAndDelete(book_id)
    .then(() => {
      response.statusCode = 201;
      response.send("Книга удалена из списка");
    })
    .catch((error) => {
      response.statusCode = 500;
      response.send(error.message);
    });
};

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook };
