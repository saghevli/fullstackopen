import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'

const ResultCountry = ({country, index}) => {
  const [show, setShow] = useState([])

  const showAndHide = (index) => {
    const newShow = [...show]
    newShow[index] = !show[index]
    setShow(newShow)
  }

  const resultTitle = (
    <p key={country.numericCode}>
      {country.name}
      <button onClick={() => showAndHide(index)}>show</button>
    </p>
  )

  if (show[index] === true) {
    return [resultTitle ,
    <Country country={country} />]
  }
  return (
    resultTitle
  )
}

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      {country.languages.map((language, index) => <li key={index}>{language.name}</li>)}
      <img src={country.flag} alt="country flag" width="600" height="300"/>
    </div>
  )
}

const Results = ({countries, filter}) => {
  const results = countries.filter(
    country => country.name.toLowerCase().includes(filter.toLowerCase()))
  if (results.length > 10) {
    return (<p>too many matches, specify another filter</p>)
  } else if (results.length > 1) {
    return (
      <div>
       {results.map((country, index) => 
         <ResultCountry country={country} index={index} key={country.numericCode}/>)}
      </div>
    )
  } else if (results.length === 1) {
    return (
      <div>
       <Country country={results[0]} />
      </div>
      )
    } else {
      return (<p>no matching countries</p>)
    }
  }

function App() {
  console.log('app')
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      find countries
      <input
        value={filter}
        onChange={handleFilterChange} />
      <Results countries={countries} filter={filter}/>
    </>
  )
}

export default App;
