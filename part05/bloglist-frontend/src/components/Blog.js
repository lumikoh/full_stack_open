import { useState } from "react"

const Blog = ({blog, increaseLikes, removeBlog, currentUser}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none'}

  const showDeleteButton = { display: blog.user.username === currentUser ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      <div style={showWhenVisible}>
       {blog.url}
       <br></br>
       {"likes " + blog.likes}
       <button onClick={increaseLikes} style={{ background: 'green', color: 'white' }}>like</button>
       <br></br>
       {blog.user.name}
       <br></br>
       <div style={showDeleteButton}>
        <button onClick={removeBlog} style={{ background: 'red', color: 'white' }}>remove</button>
       </div>
      </div>
    </div>  
  )
}

export default Blog