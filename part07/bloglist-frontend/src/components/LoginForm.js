import { useEffect, useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))

    setPassword('')
    setUsername('')
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  return (
    <div>
      <h2>login to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <div>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              name="Username"
              id="username-input"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              name="Password"
              id="password-input"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button variant="primary" type="submit" id="login-button">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
