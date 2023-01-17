const express = require('express');
const customMiddleware = require("./middleware/middleware")
const server = express();
const bodyParser = require("body-parser")
const userRouter = require("./users/users-router")

// remember express by default cannot parse JSON in request bodies

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

// global middlewares and the user's router need to be connected here

server.use("/api/users",userRouter)

server.use(customMiddleware.logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
