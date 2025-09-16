import { useDispatch, useSelector } from "react-redux"
import { setNotificationWithTimeout } from "../reducers/notificationReducer"
import { voteAnecdote } from "../reducers/anecdoteReducer"


const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(state => state.anecdotes)
	const filterValue = useSelector(state => state.filter)

	const filteredAnecdotes = anecdotes
		.filter(anecdote => anecdote.content.toLowerCase().includes(filterValue.toLowerCase()))
		.sort((a, b) => b.votes - a.votes)

	const vote = async (anecdote) => {
		dispatch(voteAnecdote(anecdote.id))
		dispatch(
			setNotificationWithTimeout(
				`you voted '${anecdote.content}'`,
				5
			)
		)
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
								onClick={() => vote(anecdote)}
							>vote</button>
						</div>
					</div>
				)
			}
		</div>
	)
}

export default AnecdoteList