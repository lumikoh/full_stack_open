import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  function isNameKnown(person) {
    return person.name === newName
  }

  const addNumber = (event) => {
    event.preventDefault()
    if(newName === '') return
    
    if(persons.find(isNameKnown) !== undefined) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div> name: 
          <input 
          value={newName}
          onChange={handleNameChange} />
        </div>
        <div>number: 
          <input 
          value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
        {persons.map(person => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>)}
        </tbody>  
      </table>
    </div>
  )
}

export default App