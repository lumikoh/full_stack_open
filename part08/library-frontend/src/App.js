import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

import { gql, useApolloClient, useQuery } from '@apollo/client'

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
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const authorData = useQuery(AUTHOR_DATA, {pollInterval: 2000})
  const bookData = useQuery(BOOK_DATA, {pollInterval: 2000})

  const client = useApolloClient()

  const removeToken = () => {
    setToken(null)    
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token 
        ? (<>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={removeToken}>logout</button>
          </>) 
        : (<button onClick={() => setPage('login')}>login</button>)}
      </div>

      <Authors show={page === 'authors'} query={authorData} token={token} />

      <Books show={page === 'books'} query={bookData} />

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} setToken={setToken} setPage={setPage}/>
    </div>
  )
}

export default App
