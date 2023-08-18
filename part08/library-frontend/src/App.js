import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'

import { AUTHOR_DATA, BOOK_DATA, USER_DATA, BOOK_ADDED } from './queries'

import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

export const updateCache = (cache, query, addedBook) => {
  const unique = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return { allBooks: unique(allBooks.concat(addedBook)) }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const authorData = useQuery(AUTHOR_DATA, { pollInterval: 2000 })
  const bookData = useQuery(BOOK_DATA)
  const userData = useQuery(USER_DATA, { pollInterval: 2000 })

  useEffect(() => {
    const savedToken = localStorage.getItem('library-user-token')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`New book ${addedBook.title} by ${addedBook.author.name}!`)
      // This isn't working the way it should but it is an attempt to refresh all filters.
      // In an actual program this isn't really smart and currently causes an error if
      // the query with one of the new genres is not yet in the cache. However I left it
      // as some sort of proof of concept.
      for (const genre of addedBook.genres) {
        updateCache(
          client.cache,
          {
            query: BOOK_DATA,
            variables: { genre: genre },
          },
          addedBook
        )
      }
      updateCache(client.cache, { query: BOOK_DATA }, addedBook)
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
