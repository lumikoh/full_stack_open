import { useState } from 'react'
import PropTypes from 'prop-types'
import { increaseLikes, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, currentUser }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const deleteVisible = blog.user.username === currentUser

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle} className="blog-container">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} className="visibleButton">
          {visible ? 'hide' : 'show'}
        </button>
      </div>
      {visible && (
        <div style={showWhenVisible}>
          {blog.url}
          <br></br>
          {'likes ' + blog.likes}
          <button
            onClick={() => dispatch(increaseLikes(blog))}
            style={{ background: 'green', color: 'white' }}
            className="like-button"
          >
            like
          </button>
          <br></br>
          {blog.user.name}
          <br></br>
          {deleteVisible && (
            <div>
              <button
                onClick={() => dispatch(deleteBlog(blog))}
                style={{ background: 'red', color: 'white' }}
                className="delete-button"
              >
                remove
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
}

export default Blog
