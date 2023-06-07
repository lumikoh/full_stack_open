import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>


const Counter = ({text, amount}) => <p>{text}: {amount}</p>


const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


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
      <Counter text={'average'} amount={(good-bad)/(good+bad+neutral)} />
      <p>positive: {good/(good+bad+neutral)} %</p>
    </div>
  )
}

export default App