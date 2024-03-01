const { request, response } = require("express");
const User = require("../models/user");

const getUsers = (request, response) => {
  return User.find({})
    .then((users) => {
      if (!users) {
        response.statusCode = 404;
        return;
      }

      response.statusCode = 200;
      response.send(users);
    })
    .catch((error) => {
      response.statusCode = 500;
      response.send(error.message);
    });
};

const getUser = (request, response) => {
  const { user_id } = request.params;
  return User.findById(user_id)
    .then((user) => {
      if (!user) {
        response.statusCode = 404;
        return;
      }

      response.statusCode = 200;
      response.send(user);
    })
    .catch((error) => {
      response.statusCode = 500;
      response.send(error.message);
    });
};

const createUser = (request, response) => {
  return User.create({ ...request.body })
    .then((user) => {
      if (!user) {
        response.statusCode = 404;
        return;
      }

      response.statusCode = 201;
      response.send(user);
    })
    .catch((error) => {
      response.statusCode = 500;
      response.send(error.message);
    });
};

const updateUser = (request, response) => {
  const { user_id } = request.params;
  return User.findByIdAndUpdate(user_id, { ...request.body })
    .then((user) => {
      if (!user) {
        response.statusCode = 404;
        return;
      }

      response.statusCode = 201;
      response.send("Информация о пользователе успешно изменена");
    })
    .catch((error) => {
      response.statusCode = 500;
      response.send(error.message);
    });
};

const deleteUser = (request, response) => {
  const { user_id } = request.params;
  return User.findByIdAndDelete(user_id)
    .then(() => {
      response.statusCode = 201;
      response.send("Пользователь удален из списка");
    })
    .catch((error) => {
      response.statusCode = 500;
      response.send(error.message);
    });
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
