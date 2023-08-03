import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdoteinput.value
    event.target.anecdoteinput.value = ''

    const newAnecdote = await anecdoteService.createNew(content)

    dispatch(createAnecdote(newAnecdote))
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
