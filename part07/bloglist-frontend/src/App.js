import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initialBlogs } from './reducers/blogReducer'
import { initialUser } from './reducers/userReducer'
import { initialUsers } from './reducers/usersReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import styled from 'styled-components'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import Notification from './components/Notification'
import background from './img/background.jpg'

const Page = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
  width: 100%;
`

const Content = styled.div`
  background-color: #222831;
  height: 100%;
  max-width: 800px;
  color: white;
`

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
    <Page>
      <Content className="container">
        <Navigation />
        <h2>blog app</h2>
        <Notification />
        <Routes>
          <Route path="/users/:id" element={<User id={userId} />} />
          <Route path="/blogs/:id" element={<Blog id={blogId} />} />
          <Route path="/" element={<BlogList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Content>
    </Page>
  )
}

export default App
