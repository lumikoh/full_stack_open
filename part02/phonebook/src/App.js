import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  function isNameKnown(person) {
    return person.name === newName
  }

  const addName = (event) => {
    event.preventDefault()
    if(persons.find(isNameKnown) !== undefined) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({name: newName}))
    setNewName('')

  }

  const handleFieldChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleFieldChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
        {persons.map(person => <tr key={person.name}><td>{person.name}</td></tr>)}
        </tbody>  
      </table>
    </div>
  )
}

export default App