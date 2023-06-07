import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>


const StatisticsLine = ({text, value, mark}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

)


const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral
  const goodText = 'good'
  const badText = 'bad'
  const neutralText = 'neutral'
  const averageText = 'average'
  const positiveText = 'positive'
  const allText = 'all'
  
  
  if(total > 0) {
    return (
      <table>
        <tbody>
          <StatisticsLine text={goodText} value={props.good} />
          <StatisticsLine text={neutralText} value={props.neutral} />
          <StatisticsLine text={badText} value={props.bad} />
          <StatisticsLine text={allText} value={total} />
          <StatisticsLine text={averageText} value={((props.good-props.bad)/total).toFixed(1)}/>
          <StatisticsLine text={positiveText} value={(props.good/total*100).toFixed(1) + " %"} />
        </tbody>
      </table>
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