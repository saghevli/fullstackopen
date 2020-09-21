import axios from 'axios'
import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

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

const Persons = ({persons, newFilter, deletePersonHandler, style}) => {
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map((person, index) => 
          <p key={index}>
            {person.name} {person.number}
            <button onClick={() => deletePersonHandler(index, style)}>delete</button>
          </p>)}
    </div>
)}

const Notification = ({notification}) => {
  if (notification.message === null) {
    return null
  }
  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationData, setNotificationData] = useState({message: null, type: null})
  useEffect(() => {
    axios
      .get('/api/persons')
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
          setNotificationData({message:`Added ${returnedPerson.name}`, type:'confirm'})
          setTimeout(() => setNotificationData({...notificationData, message: null}), 4000)
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
          setNotificationData({message:`Modified ${returnedPerson.name}`, type:'confirm'})
          setTimeout(() => setNotificationData({...notificationData, message:null}), 4000)
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
        .catch(error => {
          setNotificationData({message:`Information of ${persons[index].name} has already been removed from the server`, type:'error'})
          setPersons(persons.filter((person, i) => index !== i))
          setTimeout(() => setNotificationData({...notificationData, message:null}), 4000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notificationData} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} deletePersonHandler={deletePersonHandler} />
    </div>
  )
}

export default App