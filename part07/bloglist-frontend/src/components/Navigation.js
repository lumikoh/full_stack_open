import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import { Nav, Navbar } from 'react-bootstrap'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const styleSheet = {
    padding: 4,
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link style={styleSheet} to="/">
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={styleSheet} to="/users">
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user ? (
              <em>
                {user.name} logged in{' '}
                <button onClick={() => dispatch(logoutUser())}>logout</button>
              </em>
            ) : (
              <Link to="/login">login</Link>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
