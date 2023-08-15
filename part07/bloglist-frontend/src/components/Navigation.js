import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const styleSheet = {
    padding: 4,
  }

  return (
    <div>
      <Link style={styleSheet} to="/">
        blogs
      </Link>
      <Link style={styleSheet} to="/users">
        users
      </Link>
      {user ? (
        <em>
          {user.name} logged in{' '}
          <button onClick={() => dispatch(logoutUser())}>logout</button>
        </em>
      ) : (
        <Link to="/login">login</Link>
      )}
    </div>
  )
}

export default Navigation
