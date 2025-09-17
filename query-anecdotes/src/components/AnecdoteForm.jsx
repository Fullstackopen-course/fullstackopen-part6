import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
	const notificationDispatch = useNotificationDispatch()
	const queryClient = useQueryClient()

	const newAnecdoteMutation = useMutation(
		{
			mutationFn: createAnecdote,
			onSuccess: (newAnecdote) => {
				const anecdotes = queryClient.getQueryData(['anecdotes'])

				const newAnecdotes = anecdotes.concat(newAnecdote)
				queryClient.setQueryData(['anecdotes'], newAnecdotes)
			},
			onError: (error) => {
				notificationDispatch({
					type: 'SET_NOTIFICATION',
					payload: error.response.data.error
				})
				setTimeout(() => {
					notificationDispatch({
						type: 'REMOVE_NOTIFICATION'
					})
				}, 5000)
			}
		}
	)
	const addAnecdote = (event) => {
			event.preventDefault()

			const content = event.target.anecdote.value
			event.target.anecdote.value = ''

			newAnecdoteMutation.mutate(
				{
					content: content,
					votes: 0,
					id: Math.round(Math.random() * 10000)
				}
			)
			notificationDispatch({
				type: 'SET_NOTIFICATION',
				payload: `you created '${content}'`
			})
			setTimeout(() => {
				notificationDispatch({
					type: 'REMOVE_NOTIFICATION'
				})
			}, 5000)
		}


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
