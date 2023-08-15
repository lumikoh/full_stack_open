import { useEffect, useState } from 'react'
import { increaseLikes, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ id }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const blog = useSelector((state) => state.blogs).find((b) => b.id === id)

  const user = useSelector((state) => state.user)

  const deleteVisible =
    user && blog ? blog.user.username === user.username : null

  useEffect

  const addComment = (event) => {
    event.preventDefault()

    dispatch(
      commentBlog({
        content: comment,
        blog: blog.id,
      })
    )

    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog-info">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
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
        added by {blog.user.name}
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
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          name="Comment"
          className="comment-input"
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
