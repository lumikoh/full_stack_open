import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initialBlogs } from './reducers/blogReducer'
import { initialUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import UserList from './components/UserList'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initialUser())
  }, [dispatch])

  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
