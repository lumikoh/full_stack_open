import { useState } from 'react'
import { BOOK_DATA } from '../queries'
import { useQuery } from '@apollo/client'

const Books = ({ show, query }) => {
  const [filter, setFilter] = useState('')
  const books = useQuery(BOOK_DATA, {
    variables: { genre: filter },
    fetchPolicy: 'no-cache',
  })

  if (!show || !query.data || !books.data) {
    return null
  }

  const genres = [
    ...new Set(
      query.data.allBooks.reduce((result, b) => {
        return result.concat(b.genres)
      }, [])
    ),
  ]

  return (
    <div>
      <h2>books</h2>
      {filter === '' ? (
        <></>
      ) : (
        <>
          in genre <b>{filter}</b>
        </>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => setFilter(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setFilter('')}>all genres</button>
    </div>
  )
}

export default Books
