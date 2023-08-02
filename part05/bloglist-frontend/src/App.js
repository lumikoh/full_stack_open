import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import utils from './services/utils'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

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
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
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
        setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      .catch((error) => {
        setMessage(error.message)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
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
        setMessage(e.message)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
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
        })
        .catch((e) => {
          setMessage(e.message)

          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} />
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
        <br></br>
        <Togglable buttonlabel='new blog' ref={blogFormRef}>
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
      <Notification message={message} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default App
