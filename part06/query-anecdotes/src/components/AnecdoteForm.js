import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useMessageDispatch } from "../MessageContext"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const dispatch = useMessageDispatch()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})

    dispatch({ type: 'DISPLAY', payload: `anecdote '${content}' created` })
    setTimeout(() => {
      dispatch({ type: 'REMOVE'})
    },5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
