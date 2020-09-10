import axios from 'axios'
import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({newFilter, handleFilterChange}) => (
  <div>
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

const Persons = ({persons, newFilter, deletePersonHandler}) => {
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map((person, index) => 
          <p key={index}>
            {person.name} {person.number}
            <button onClick={() => deletePersonHandler(index)}>delete</button>
          </p>)}
    </div>
)}

const Confirmation = ({message}) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null) {
    return null
  }
  return (
    <div className="confirmation" style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [confirmMessage, setConfirmMessage] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const foundIndex = persons.findIndex(person => person.name === newName)
    if (foundIndex === -1) {
      personService
        .create({name: newName, number:newNumber})
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setConfirmMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => setConfirmMessage(null), 4000)
        })
        return
    }
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(persons[foundIndex].id, {name: newName, number:newNumber})
        .then(returnedPerson => {
          setPersons([...persons].map(person => (
            person.name === newName ?
              {...person, number: newNumber} :
              person)))
          setNewName('')
          setNewNumber('')
          setConfirmMessage(`Modified ${returnedPerson.name}`)
          setTimeout(() => setConfirmMessage(null), 4000)
        })
    }
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

  const deletePersonHandler = (index) => {
    if(window.confirm(`Delete ${persons[index].name}?`)) {
      personService
        .remove(persons[index].id)
        .then(x => {
          setPersons(persons.filter((person, i) => index !== i))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Confirmation message={confirmMessage}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} deletePersonHandler={deletePersonHandler}/>
    </div>
  )
}

export default App