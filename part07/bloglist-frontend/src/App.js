import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs, newBlog } from './reducers/blogReducer'
import { initialUser, logoutUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initialUser())
  }, [dispatch])

  const postNewBlog = (blogpost) => {
    blogFormRef.current.toggleVisibility()
    dispatch(newBlog(blogpost, user))
  }

  if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          {user.name} logged in
          <button onClick={() => dispatch(logoutUser())}>logout</button>
        </div>
        <br></br>
        <Togglable buttonlabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={postNewBlog} />
        </Togglable>
        <br></br>
        <BlogList username={user.username} />
      </div>
    )
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <LoginForm />
    </div>
  )
}

export default App
