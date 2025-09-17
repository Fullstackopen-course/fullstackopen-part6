import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {
	const queryClient = useQueryClient()

	const newAnecdoteMutation = useMutation(
		{
			mutationFn: createAnecdote,
			onSuccess: (newAnecdote) => {
				const anecdotes = queryClient.getQueryData(['anecdotes'])

				const newAnecdotes = anecdotes.concat(newAnecdote)
				queryClient.setQueryData(['anecdotes'], newAnecdotes)
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
