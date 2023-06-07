import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>


const Counter = ({text, amount, mark}) => <p>{text}: {amount}{mark}</p>


const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral
  const goodText = 'good'
  const badText = 'bad'
  const neutralText = 'neutral'
  const averageText = 'average'
  const positiveText = 'positive'
  
  
  if(total > 0) {
    return (
      <>
        <Counter text={goodText} amount={props.good} mark="" />
        <Counter text={neutralText} amount={props.neutral} mark="" />
        <Counter text={badText} amount={props.bad} mark="" />
        <Counter text={averageText} amount={(props.good-props.bad)/total} mark="" />
        <Counter text={positiveText} amount={props.good/total*100} mark=" %" />
      </>
    )
  }
  else {
    return <p>No feedback given</p>
  }

}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App