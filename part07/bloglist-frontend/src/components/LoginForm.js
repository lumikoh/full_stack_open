import { useEffect, useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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

export default LoginForm
