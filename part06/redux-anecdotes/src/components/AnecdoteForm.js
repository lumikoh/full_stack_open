import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdoteinput.value
    event.target.anecdoteinput.value = ''

    dispatch(createAnecdote(content))
    dispatch(setNotification(`'${content}' created`, 5))
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
