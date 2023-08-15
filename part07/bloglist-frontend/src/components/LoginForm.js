import { useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))

    setPassword('')
    setUsername('')
  }

  return (
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
  )
}

export default LoginForm
