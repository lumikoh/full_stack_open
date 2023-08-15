import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initialBlogs } from './reducers/blogReducer'
import { initialUser } from './reducers/userReducer'
import { initialUsers } from './reducers/usersReducer'
import { Routes, Route, useMatch } from 'react-router-dom'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initialUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initialUsers())
  }, [dispatch])

  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  const userId = userMatch ? userMatch.params.id : null
  const blogId = blogMatch ? blogMatch.params.id : null

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/users/:id" element={<User id={userId} />} />
        <Route path="/blogs/:id" element={<Blog id={blogId} />} />
        <Route path="/" element={<BlogList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  )
}

export default App
