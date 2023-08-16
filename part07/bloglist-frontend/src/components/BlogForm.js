import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const stylesheet = {
    width: '80%',
  }

  return (
    <div style={{ paddingBottom: 5 }}>
      <h3>create new</h3>
      <Form onSubmit={addBlog} style={stylesheet}>
        <Form.Group>
          <Row style={{ paddingBottom: 5 }}>
            <Form.Label column sm={2}>
              title:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={title}
                name="Title"
                className="title-input"
                onChange={({ target }) => setTitle(target.value)}
              />
            </Col>
          </Row>
          <Row style={{ paddingBottom: 5 }}>
            <Form.Label column sm={2}>
              author:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={author}
                name="Author"
                className="author-input"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </Col>
          </Row>
          <Row style={{ paddingBottom: 5 }}>
            <Form.Label column sm={2}>
              url:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={url}
                name="Url"
                className="url-input"
                onChange={({ target }) => setUrl(target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 10 }}>
              <Button variant="primary" type="submit" className="create-button">
                create
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
