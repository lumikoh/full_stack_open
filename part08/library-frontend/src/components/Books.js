import { useState } from 'react'

const Books = ({ show, query }) => {
  const [filter, setFilter] = useState('')

  if (!show || !query.data) {
    return null
  }

  const books = query.data.allBooks

  const genres = [
    ...new Set(
      books.reduce((result, b) => {
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
          {books
            .filter((b) => b.genres.find((g) => g === filter) || filter === '')
            .map((a) => (
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
