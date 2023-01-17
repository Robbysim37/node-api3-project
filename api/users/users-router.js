const express = require('express');
const customMiddleware = require("../middleware/middleware")
const userModel = require("./users-model")
const postModel = require("../posts/posts-model")

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

const validateUserId = customMiddleware.validateUserId
const validateUser = customMiddleware.validateUser

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  userModel.get().then(array => {
    res.status(200).send(array)
  })
});

router.get('/:id', validateUserId, (req, res) => {
   const id = req.params.id
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  userModel.getById(id).then(user => {
    res.status(200).json(user)
  })
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  userModel.insert(req.body).then( newUser => {
    res.status(201).json(newUser)
  })
});

router.put('/:id',validateUserId,validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  const id = req.params.id
  userModel.update(id,req.body).then(updatedUser => {
    res.status(200).json(updatedUser)
  })
});

router.delete('/:id',validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const id = req.params.id
  userModel.remove(id).then(deletedUser => {
    res.status(200).json(deletedUser)
  })
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router

module.exports = router
