import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'

const AUTHOR_DATA = gql`
query {
  allAuthors {
    name
    bookCount
    born
  }
}`
const BOOK_DATA = gql`query {
  allBooks { 
    title 
    author {
      name
    }
    published 
    genres
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const authorData = useQuery(AUTHOR_DATA, {pollInterval: 2000})
  const bookData = useQuery(BOOK_DATA, {pollInterval: 2000})

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} query={authorData} />

      <Books show={page === 'books'} query={bookData} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
