import { BOOK_DATA } from '../queries'
import { useQuery } from '@apollo/client'

const Recommend = ({ show, user }) => {
  const books = useQuery(BOOK_DATA, {
    variables: { genre: user.data ? user.data.me.favoriteGenre : '' },
  })

  if (!show || !user.data || !books.data) {
    return null
  }
  const filter = user.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      in your favorite genre <b>{filter}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks
            .filter((b) => b.genres.find((g) => g === filter))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
