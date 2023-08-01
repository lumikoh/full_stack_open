const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const user = await helper.generateUser(helper.oneUser)

  await user.save()

  const blogObjects = helper.initialBlogs.map((blog) => {
    blog.user = user.id
    return new Blog(blog)
  })

  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('when there are some blogs initially', () => {
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

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })

  describe('creating a blog', () => {
    test('is successful with the correct parameters', async () => {
      const users = await helper.usersInDb()
      const blog = helper.oneBlog[0]

      blog.user = users[0].id

      const auth = await helper.getAuth(users[0])

      await api
        .post('/api/blogs')
        .send(blog)
        .set('Authorization', `Bearer ${auth}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

      const ids = blogs.map((blog) => blog.id)
      expect(ids).toContain(helper.oneBlog[0].id)
    })

    test('is successful without likes parameter', async () => {
      await Blog.deleteMany({})

      const noLikes = helper.oneBlog[0]
      delete noLikes.likes

      const users = await helper.usersInDb()

      noLikes.user = users[0].id

      const auth = await helper.getAuth(users[0])

      await api
        .post('/api/blogs')
        .send(noLikes)
        .set('Authorization', `Bearer ${auth}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      expect(blogs[0].likes).toBe(0)
    })

    test('fails with statuscode 400 if title is missing', async () => {
      const noTitle = helper.oneBlog[0]
      delete noTitle.title

      const users = await helper.usersInDb()

      noTitle.user = users[0].id

      const auth = await helper.getAuth(users[0])

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${auth}`)
        .send(noTitle)
        .expect(400)
    })

    test('fails with statuscode 400 if url is missing', async () => {
      const noUrl = helper.oneBlog[0]
      delete noUrl.url

      const users = await helper.usersInDb()

      noUrl.user = users[0].id

      const auth = await helper.getAuth(users[0])

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${auth}`)
        .send(noUrl)
        .expect(400)
    })

    test('fails with statuscode 401 if there is no authorization', async () => {
      const users = await helper.usersInDb()
      const blog = helper.oneBlog[0]

      blog.user = users[0].id

      await api
        .post('/api/blogs')
        .send(blog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })
  })
  describe('deleting a blog', () => {
    test('is successful with a valid id', async () => {
      const blogs = await helper.blogsInDb()
      const deletedBlog = blogs[1]

      const users = await helper.usersInDb()
      const auth = await helper.getAuth(users[0])

      await api
        .delete(`/api/blogs/${deletedBlog.id}`)
        .set('Authorization', `Bearer ${auth}`)
        .expect(204)

      const resultBlogs = await helper.blogsInDb()
      expect(resultBlogs).toHaveLength(blogs.length - 1)

      const ids = resultBlogs.map((blog) => blog.id)
      expect(ids).not.toContain(deletedBlog.id)
    })

    test('fails with statuscode 400 if blog doesn\'t exist', async () => {
      const users = await helper.usersInDb()
      const auth = await helper.getAuth(users[0])

      await api
        .delete(`/api/blogs/${helper.unknownId}`)
        .set('Authorization', `Bearer ${auth}`)
        .expect(400)
    })
  })

  describe('updating a blog', () => {
    test('is successful with a valid id', async () => {
      const blogs = await helper.blogsInDb()
      const changedLikes = blogs[2]
      changedLikes.likes += 13

      await api
        .put(`/api/blogs/${changedLikes.id}`)
        .send(changedLikes)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const resultBlogs = await helper.blogsInDb()
      const sameBlog = resultBlogs.find((blog) => blog.id === changedLikes.id)
      expect(sameBlog.likes).toBe(changedLikes.likes)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
