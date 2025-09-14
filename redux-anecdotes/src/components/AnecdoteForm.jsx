import { useDispatch } from 'react-redux'
import { asObject, newAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
	const dispatch = useDispatch()
	const addAnecdote = async (event) => {
		event.preventDefault()

		const content = event.target.anecdote.value
		event.target.anecdote.value = ''

		const createdAnecdote = await anecdoteService.createAnecdote(asObject(content))

		dispatch(newAnecdote(createdAnecdote))
		dispatch(setNotification(`you've submitted the following anecdote '${content}'`))
		setTimeout(() => dispatch(removeNotification()), 5000)
	}

	return (
		<div>
			<h2>create new</h2>

			<form onSubmit={addAnecdote}>
				<div><input name="anecdote" /></div>

				<button>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm