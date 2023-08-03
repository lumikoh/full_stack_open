import { newAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdoteinput.value
    event.target.anecdoteinput.value = ''
    dispatch(newAnecdote(content))
    dispatch(setNotification(`'${content}' created`))

    setTimeout(() => {
      dispatch(removeNotification())
    },5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdoteinput' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
