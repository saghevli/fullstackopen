import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.findIndex(person => person.name === newName) === -1) {
      setPersons(persons.concat({name: newName, number:newNumber}))
      setNewName('')
      setNewNumber('')
      return
    }
    window.alert(`${newName} is already added to phonebook`)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with<input
        value={newFilter}
        onChange={handleFilterChange} 
      />
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
          <br></br>
          number: 
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons
          .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
          .map((person, index) => <p key={index}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App