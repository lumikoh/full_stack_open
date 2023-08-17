const Recommend = ({ show, books, user }) => {
  if (!show || !user.data || !books.data) {
    return null
  }

  const bookList = books.data.allBooks

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
          {bookList
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
