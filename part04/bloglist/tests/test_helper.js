const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
]

const oneBlog = [
  {
    id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  }
]

const oneUser = {
  name: 'root',
  username: 'SuperUser',
  password: 'keepSecret',
  id: '64c91cb552dede2c10935599'
}

const newUser = {
  name: 'lumi',
  username: 'Lumi',
  password: 'anotherpw',
  id: '64c93402d4bb50cc33f33eec'
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const unknownId = '234823848dfklsfafasfaf--'

const generateUser = async user => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(user.password, saltRounds)

  return new User({
    username: user.username,
    name: user.name,
    passwordHash,
    id: user.id
  })
}

module.exports = {
  initialBlogs, oneBlog, unknownId, oneUser, newUser, blogsInDb, usersInDb, generateUser
}