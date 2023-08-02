import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login( {
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (e) {
      setMessage('wrong username or password')
      setTimeout( () => {
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

    blogService.create(blogpost).then( newBlog => {
      newBlog.user = user
      const newBlogs = blogs.concat(newBlog)
      setBlogs(newBlogs)
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout( () => {
        setMessage(null)
      }, 3000)

    }).catch( error => {
      setMessage(error.message)
      setTimeout( () => {
        setMessage(null)
      }, 3000)
    })

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
        <Togglable buttonlabel="new note" ref={blogFormRef}>
          <BlogForm createBlog={postNewBlog}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification message={message}/>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default App