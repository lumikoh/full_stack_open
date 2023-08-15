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

  const match = useMatch('/users/:id')
  const userId = match ? match.params.id : null

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/users/:id" element={<User id={userId} />} />
        <Route path="/" element={<BlogList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  )
}

export default App
