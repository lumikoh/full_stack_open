import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import { Button, Nav, Navbar } from 'react-bootstrap'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const styleSheet = {
    padding: 4,
    style: 'bold',
    color: 'white',
    fontFamily: 'cursive',
  }

  const barStyle = {
    borderBottom: '1px white solid',
    width: '100%',
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={barStyle}
    >
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
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => dispatch(logoutUser())}
                >
                  logout
                </Button>
              </em>
            ) : (
              <Link to="/login" style={styleSheet}>
                login
              </Link>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
