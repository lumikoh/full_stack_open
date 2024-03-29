import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { newBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const styleSheet = {
    style: 'bold',
    color: 'white',
    fontFamily: 'cursive',
  }

  const blogFormRef = useRef()

  const postNewBlog = (blogpost) => {
    blogFormRef.current.toggleVisibility()
    dispatch(newBlog(blogpost, user))
  }

  return (
    <>
      <Togglable buttonlabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={postNewBlog} />
      </Togglable>
      <br></br>
      <Table striped variant="dark">
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id} style={blogStyle}>
              <td>
                <Link style={styleSheet} to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td
                style={{ ...styleSheet, textAlign: 'right', paddingRight: 30 }}
              >
                {blog.author}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default BlogList
