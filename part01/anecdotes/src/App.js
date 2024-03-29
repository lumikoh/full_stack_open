import { useState } from 'react'


const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const Content = ({text, points}) => (
  <>
    {text}<br></br>
    has {points} votes<br></br>
  </>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint32Array(anecdotes.length))
  const [best, setBest] = useState(0)

  const generateRandom = () => {
    while(true) {
      const newValue = Math.floor(Math.random()*anecdotes.length)
      if(newValue != selected) {
        setSelected(newValue)
        break;
      }
    }
  }

  const setPointStats = () => {
    const copy = {...points}
    copy[selected] += 1
    setPoints(copy)
    if(copy[selected] > copy[best]) {
      setBest(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        <Content text={anecdotes[selected]} points={points[selected]} />
        <Button text='vote' handleClick={setPointStats} />
        <Button text='next anecdote' handleClick={generateRandom} />
      </p>
      <h1>Anecdote with most votes</h1>
      <p>
        <Content text={anecdotes[best]} points={points[best]} />
      </p>
    </div>
  )
}

export default App