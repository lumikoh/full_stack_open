import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  let container

  beforeEach(() => {
    container = render(<BlogForm createBlog={mockHandler} />).container
  })

  test('the form submits the correct data to the event handler', async () => {
    const authorInput = container.querySelector('input[name="Author"]')
    const urlInput = container.querySelector('input[name="Url"]')
    const titleInput = container.querySelector('input[name="Title"]')
    const submitButton = screen.getByText('create')

    const author = 'testAuthor'
    const url = 'www.testdomain.org'
    const title = 'TestDomain\'s new blogpost'

    await user.type(authorInput, author)
    await user.type(urlInput, url)
    await user.type(titleInput, title)
    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].author).toBe(author)
    expect(mockHandler.mock.calls[0][0].url).toBe(url)
    expect(mockHandler.mock.calls[0][0].title).toBe(title)

  })
})
