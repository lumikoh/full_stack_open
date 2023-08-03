import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useMessageDispatch } from '../MessageContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const dispatch = useMessageDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('anecdotes')
      console.log(response)

      dispatch({
        type: 'DISPLAY',
        payload: `anecdote '${response.content}' created`,
      })
      setTimeout(() => {
        dispatch({ type: 'REMOVE' })
      }, 5000)
    },
    onError: () => {
      dispatch({
        type: 'DISPLAY',
        payload: `too short anecdote, must have length 5 or more`,
      })
      setTimeout(() => {
        dispatch({ type: 'REMOVE' })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
