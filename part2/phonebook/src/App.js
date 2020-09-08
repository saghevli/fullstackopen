import React, { useState } from 'react'

const Filter = ({newFilter, handleFilterChange}) => (
  <div>
    <h2>Phonebook</h2>
    filter shown with<input
      value={newFilter}
      onChange={handleFilterChange} 
    />
  </div>
)

const PersonForm = ({addName, newName, newNumber, handleNameChange, handleNumberChange}) => (
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
)

const Persons = ({persons, newFilter}) => {
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map((person, index) => <p key={index}>{person.name} {person.number}</p>)}
    </div>
)}

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
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App