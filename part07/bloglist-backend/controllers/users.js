const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  if (!request.body.password) {
    return response.status(400).json({
      error:
        'User validation failed: password: Path `password` does not exist.',
    })
  }

  if (request.body.password.length < 3) {
    return response.status(400).json({
      error:
        'User validation failed: password: Path `password` is shorter than the minimum allowed length (3).',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

  const user = new User({
    _id: request.body.id,
    username: request.body.username,
    name: request.body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')

  response.json(users)
})

module.exports = usersRouter
