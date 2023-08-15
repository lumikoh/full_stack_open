import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import Notification from './Notification'

const Header = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  return (
    <>
      <h2>{user ? 'blogs' : 'log in to application'}</h2>
      <Notification />
      {user && (
        <div>
          {user.name} logged in
          <button onClick={() => dispatch(logoutUser())}>logout</button>
        </div>
      )}
      <br></br>
    </>
  )
}

export default Header
