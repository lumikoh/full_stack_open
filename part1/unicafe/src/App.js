import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Counter = (props) => {
  return (
    <p>{props.text}: {props.amount}</p>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {

  const feedbackText = 'give feedback'
  const statisticText = 'statistics'
  const goodText = 'good'
  const neutralText = 'neutral'
  const badText = 'bad'

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text = {feedbackText} />
      <Button text={goodText} handleClick={() => setGood(good + 1)} />
      <Button text={neutralText} handleClick={() => setNeutral(neutral + 1)} />
      <Button text={badText} handleClick={() => setBad(bad + 1)} />
      <Header text = {statisticText} />
      <Counter text={goodText} amount={good} />
      <Counter text={neutralText} amount={neutral} />
      <Counter text={badText} amount={bad} />

    </div>
  )
}

export default App