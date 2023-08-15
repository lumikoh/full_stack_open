import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import { useRef } from 'react'
import { newBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default BlogList
