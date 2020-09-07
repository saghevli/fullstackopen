import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({text, value, unit}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
    <td>{unit}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table> 
          <tbody>
            <Statistic text="good" value = {good} />
            <Statistic text="neutral" value = {neutral} />
            <Statistic text="bad" value = {bad} />
            <Statistic text="all" value = {all} />
            <Statistic text="average" value = {(good-bad)/all} />
            <Statistic text="positive" value = {good*100/all} unit="%" />
          </tbody>
        </table>
      </div>
    )
  }
  return (
      <div>
        <h1>statistics</h1>
        <p>No statistics given</p>
      </div>
    )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)