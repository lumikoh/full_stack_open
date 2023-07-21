const blogRouter = require('express').Router()
const Blog = require('../models/blog')



blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

  const blog = new Blog({
    _id: request.body._id,
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    __v: request.body.__v,
  })

  const result = await blog.save()

  response.status(201).json(result)

})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter