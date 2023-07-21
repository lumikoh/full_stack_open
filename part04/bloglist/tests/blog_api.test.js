const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('the correct amount of blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('each blog has an id parameter', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('a new blog is created successfully', async () => {
  await api
    .post('/api/blogs')
    .send(helper.oneBlog[0])
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length+1)

  const ids = blogs.map( blog => blog.id)
  expect(ids).toContain(helper.oneBlog[0]._id)
})

test('a blog without likes is created successfully', async () => {
  await Blog.deleteMany({})

  const noLikes = helper.oneBlog[0]
  delete noLikes.likes

  await api
    .post('/api/blogs')
    .send(noLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  expect(blogs[0].likes).toBe(0)
})

test('missing title results in bad request', async () => {
  const noTitle = helper.oneBlog[0]
  delete noTitle.title

  await api
    .post('/api/blogs')
    .send(noTitle)
    .expect(400)
})

test('missing url results in bad request', async () => {
  const noUrl = helper.oneBlog[0]
  delete noUrl.url

  await api
    .post('/api/blogs')
    .send(noUrl)
    .expect(400)
})

test('deletion of a blog is successful', async () => {
  const blogs = await helper.blogsInDb()
  const deletedBlog = blogs[1]

  await api
    .delete(`/api/blogs/${deletedBlog.id}`)
    .expect(204)

  const resultBlogs = await helper.blogsInDb()
  expect(resultBlogs).toHaveLength(blogs.length-1)

  const ids = resultBlogs.map(blog => blog.id)
  expect(ids).not.toContain(deletedBlog.id)
})


afterAll(async () => {
  await mongoose.connection.close()
})