import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ username }) => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} currentUser={username} />
      ))}
    </>
  )
}

export default BlogList
