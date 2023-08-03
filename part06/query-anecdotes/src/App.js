import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useMessageDispatch } from './MessageContext'

const App = () => {

  const queryClient = useQueryClient()

  const voteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    } 
  })

  const dispatch = useMessageDispatch()

  const handleVote = (anecdote) => {
    voteMutation.mutate({...anecdote, votes: anecdote.votes+1})

    dispatch({ type: 'DISPLAY', payload: `anecdote '${anecdote.content}' voted` })
    setTimeout(() => {
      dispatch({ type: 'REMOVE'})
    },5000)
  }

  const result = useQuery('anecdotes', getAnecdotes, { retry: 1 })
  console.log(result)

  if(result.isLoading) {
    return <div>loading data...</div>
  }

  if(result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
