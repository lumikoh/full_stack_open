import { useEffect, useState } from 'react'
import { increaseLikes, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'

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
        <Button
          size="sm"
          variant="outline-success"
          style={{ marginLeft: 15, paddingBottom: 5 }}
          onClick={() => dispatch(increaseLikes(blog))}
          className="like-button"
        >
          like
        </Button>
        <br></br>
        added by {blog.user.name}
        <br></br>
        {deleteVisible && (
          <div>
            <Button
              size="sm"
              variant="outline-danger"
              style={{ marginTop: 5 }}
              onClick={() => dispatch(deleteBlog(blog))}
              className="delete-button"
            >
              remove
            </Button>
          </div>
        )}
      </div>
      <h3>comments</h3>
      <Form onSubmit={addComment}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                value={comment}
                name="Comment"
                className="comment-input"
                onChange={({ target }) => setComment(target.value)}
              />
            </Col>
            <Col>
              <Button type="submit" variant="outline-primary">
                add comment
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
