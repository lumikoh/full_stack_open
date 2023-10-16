const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {

  const userId = request.user

  if(!userId) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(userId)

  const blog = new Blog({
    _id: request.body.id,
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    __v: request.body.__v,
    user: user.id
  })

  const result = await blog.save()

  user.blogs = user.blogs.concat(result.id)
  await user.save()

  response.status(201).json(result)

})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const user = request.user

  if(!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const deleted = await Blog.findById(request.params.id)

  if(deleted.user.toString() !== user.toString()) {
    return response.status(401).json({ error: 'invalid user' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {

  const blog = new Blog({
    _id: request.params.id,
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
  })

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog)

})

module.exports = blogRouter