import { gql, useMutation } from "@apollo/client"
import { useState } from "react"

const UPDATE_BIRTHYEAR = gql`
mutation updateBirth($name: String!, $setBornTo: Int!){
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
`

const Authors = ({show, query}) => {
  const [name, setName] = useState('')
  const [birth, setBirth] =useState('')

  const [ updateBirth ] = useMutation(UPDATE_BIRTHYEAR)

  if (!show || !query.data) {
    return null
  }
 
  const authors = query.data.allAuthors

  const submit = event => {
    event.preventDefault()

    updateBirth({ variables: {name, setBornTo: Number(birth)}})

    setName('')
    setBirth('')

  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        name
        <input value={name} onChange={ ({target}) => setName(target.value)}/>
        <br />
        born
        <input value={birth} onChange={ ({target}) => setBirth(target.value)}/>
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
