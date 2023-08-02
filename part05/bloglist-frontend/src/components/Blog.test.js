import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  author: 'testAuthor',
  url: 'www.test.fi',
  likes: 3,
  title: 'testblog',
  user: {
    username: 'testUser',
  },
}

describe('<Blog />', () => {
  test('renders only title and author', async () => {
    render(
      <Blog
        blog={blog}
        currentUser='testUser'
        removeBlog={() => {}}
        increaseLikes={() => {}}
      />
    )

    const author = screen.getByText('testblog testAuthor', { exact: false })
    expect(author).toBeDefined()

    const url = screen.queryByText(blog.url, { exact: false })
    expect(url).toBeNull()

    const likes = screen.queryByText(`likes ${blog.likes}`, { exact: false })
    expect(likes).toBeNull()
  })

  test('shows the url and likes when the button is clicked', async () => {
    let container = render(
      <Blog
        blog={blog}
        currentUser='testUser'
        removeBlog={() => {}}
        increaseLikes={() => {}}
      />
    ).container

    const user = userEvent.setup()
    const showButton = container.querySelector('.visibleButton')
    await user.click(showButton)

    const url = screen.queryByText(blog.url, { exact: false })
    expect(url).not.toBeNull()

    const likes = screen.queryByText(`likes ${blog.likes}`, { exact: false })
    expect(likes).not.toBeNull()
  })

})
