import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { removeNotification, setNotification } from "../reducers/notificationReducer"


const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(state => state.anecdotes)
	const filterValue = useSelector(state => state.filter)

	const filteredAnecdotes = anecdotes
		.filter(anecdote => anecdote.content.toLowerCase().includes(filterValue.toLowerCase()))
		.sort((a, b) => b.votes - a.votes)

	const createAnecdote = (anecdote) => {
		dispatch(vote(anecdote.id))
		dispatch(setNotification(`you voted '${anecdote.content}'`))
		setTimeout(() => dispatch(removeNotification(null)), 5000)
	}

	return (
		<div>
			{
				filteredAnecdotes.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>

						<div>
							has {anecdote.votes}
							<button
								onClick={() => createAnecdote(anecdote)}
							>vote</button>
						</div>
					</div>
				)
			}
		</div>
	)
}

export default AnecdoteList