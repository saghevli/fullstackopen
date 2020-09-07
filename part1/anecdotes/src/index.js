import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Favorite = ({anecdotes, votes}) => {
  const mostIndex = votes.indexOf(Math.max(...votes))
  return (
    <div>
      {anecdotes[mostIndex]}
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint32Array(anecdotes.length))

  const getRandom = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <>
      <h1>Anecdotes of the day</h1>
      {props.anecdotes[selected]}<br/>
      has {votes[selected]} votes<br/>
      <button onClick = {() => addVote()}>vote</button>
      <button onClick = {() => getRandom()}>next anecdote</button>
      <h1>Anecdotes with most votes</h1>
      <Favorite anecdotes={anecdotes} votes={votes}/>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)