import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      console.log(e)
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    blogService.setToken(null)
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
  }

  const postNewBlog = (event) => {
    event.preventDefault()

    const blogpost = {
      title,
      author,
      url
    }
    
    blogService.create(blogpost).then( newBlog => {
      const newBlogs = blogs.concat(newBlog)
      setBlogs(newBlogs)

    }).catch( error => {
      console.log(error)
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          {user.name} has logged in
          <button onClick={handleLogout}>logout</button>
        </div>
        <h2>create new</h2>
        <form onSubmit={postNewBlog}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="Title" 
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="Author" 
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="Url" 
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <div>
            <button type='submit'>create</button>
          </div>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>log in to application</h2>
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