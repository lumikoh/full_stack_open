import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import utils from './services/utils'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(utils.sortBlogs(blogs)))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      dispatch(
        setNotification(
          {
            message: 'wrong username or password',
            type: 'error',
          },
          5
        )
      )
    }
  }

  const handleLogout = () => {
    blogService.setToken(null)
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
  }

  const postNewBlog = (blogpost) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogpost)
      .then((newBlog) => {
        newBlog.user = user
        const newBlogs = blogs.concat(newBlog)
        setBlogs(utils.sortBlogs(newBlogs))

        dispatch(
          setNotification(
            {
              message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
              type: 'notice',
            },
            5
          )
        )
      })
      .catch((error) => {
        dispatch(
          setNotification(
            {
              message: error.message,
              type: 'error',
            },
            5
          )
        )
      })
  }

  const increaseLikes = (id) => {
    const blog = blogs.find((b) => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }

    blogService
      .update(id, changedBlog)
      .then((returned) => {
        setBlogs(
          utils.sortBlogs(blogs.map((b) => (b.id !== id ? b : returned)))
        )
      })
      .catch((e) => {
        dispatch(
          setNotification(
            {
              message: e.message,
              type: 'error',
            },
            5
          )
        )
        setBlogs(blogs.filter((b) => b.id !== id))
      })
  }

  const removeBlog = (id) => {
    const blog = blogs.find((b) => b.id === id)

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .removeOne(id)
        .then(() => {
          setBlogs(blogs.filter((b) => b.id !== id))

          dispatch(
            setNotification(
              {
                message: `Blog ${blog.title} by ${blog.author} removed`,
                type: 'notice',
              },
              5
            )
          )
        })
        .catch((e) => {
          dispatch(
            setNotification(
              {
                message: e.message,
                type: 'error',
              },
              5
            )
          )
        })
    }
  }

  if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
        <br></br>
        <Togglable buttonlabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={postNewBlog} />
        </Togglable>
        <br></br>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            increaseLikes={() => increaseLikes(blog.id)}
            removeBlog={() => removeBlog(blog.id)}
            currentUser={user.username}
          />
        ))}
      </div>
    )
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username-input"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password-input"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  )
}

export default App
