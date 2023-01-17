const userModel = require("../users/users-model")

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`)
  next()
}

function validateUserId(req, res, next) {
  const id = req.params.id
  // DO YOUR MAGIC
  userModel.getById(id).then(user => {
    if(!user){
      res.status(404).json({ message: "user not found" })
    }else{
      next() 
    }
    
  })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.name){
    res.status(400).json({ message: "missing required name field" })
  }else{
    next()
  }
  
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.text){
    console.log("should hit this")
    res.status(400).json({ message: "missing required text field" })
  }else{
    next()
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  validatePost,
  validateUser,
  validateUserId,
  logger
}
