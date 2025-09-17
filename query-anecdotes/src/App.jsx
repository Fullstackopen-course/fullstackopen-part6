import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
	const notificationDispatch = useNotificationDispatch()
	const queryClient = useQueryClient()

	const updateAnecdoteMutation = useMutation(
		{
			mutationFn: updateAnecdote,
			onSuccess: (updatedAnecdote) => {
				const anecdotes = queryClient.getQueryData(['anecdotes'])

				const newAnecdotes = anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
				queryClient.setQueryData(['anecdotes'], newAnecdotes)
			}
		}
	)

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
		...anecdote,
		votes: anecdote.votes + 1
	})
	notificationDispatch({
		type: 'SET_NOTIFICATION',
		payload: `you voted '${anecdote.content}'`
	})
	setTimeout(() => {
		notificationDispatch({
			type: 'REMOVE_NOTIFICATION'
		})
	}, 5000)
  }

  const res = useQuery({
	queryKey: ['anecdotes'],
	queryFn: getAnecdotes,
	retry: 1,
	refetchOnWindowFocus: false
  })

  if (res.isLoading) {
	return <div>loading data...</div>
  }

  const anecdotes = res.data

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
