import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'

import { AUTHOR_DATA, BOOK_DATA, USER_DATA, BOOK_ADDED } from './queries'

import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const authorData = useQuery(AUTHOR_DATA, { pollInterval: 2000 })
  const bookData = useQuery(BOOK_DATA, { pollInterval: 2000 })
  const userData = useQuery(USER_DATA, { pollInterval: 2000 })

  useEffect(() => {
    const savedToken = localStorage.getItem('library-user-token')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data)
      window.alert(
        `New book ${data.data.bookAdded.title} by ${data.data.bookAdded.author.name}!`
      )
    },
  })

  const client = useApolloClient()

  const removeToken = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={removeToken}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} query={authorData} token={token} />

      <Books show={page === 'books'} query={bookData} />

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} setToken={setToken} setPage={setPage} />

      <Recommend show={page === 'recommend'} books={bookData} user={userData} />
    </div>
  )
}

export default App
