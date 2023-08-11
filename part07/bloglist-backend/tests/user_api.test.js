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

describe('when there is one user with some blogs', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('the correct amount of users are returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(1)
  }, 100000)

  test('each user has an id parameter', async () => {
    const response = await api.get('/api/users')

    response.body.forEach((user) => {
      expect(user.id).toBeDefined()
    })
  })

  describe('creating a user', () => {
    test('is successful with the correct parameters', async () => {
      await api
        .post('/api/users')
        .send(helper.newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const users = await helper.usersInDb()
      expect(users).toHaveLength(2)

      const ids = users.map((blog) => blog.id)
      expect(ids).toContain(helper.newUser.id)
    })

    test('fails with statuscode 400 if username is missing', async () => {
      const noUsername = helper.newUser
      delete noUsername.username

      await api.post('/api/users').send(noUsername).expect(400)
    })

    test('fails with statuscode 400 if password is missing', async () => {
      const noPassword = helper.newUser
      delete noPassword.password

      await api.post('/api/users').send(noPassword).expect(400)
    })

    test('fails with statuscode 400 if name is missing', async () => {
      const noName = helper.newUser
      delete noName.name

      await api.post('/api/users').send(noName).expect(400)
    })

    test('fails with statuscode 400 if password is too short', async () => {
      const shortPw = helper.newUser
      shortPw.password = 'sh'

      await api.post('/api/users').send(shortPw).expect(400)
    })

    test('fails with statuscode 400 if username is too short', async () => {
      const shortUser = helper.newUser
      shortUser.username = 'lu'

      await api.post('/api/users').send(shortUser).expect(400)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
