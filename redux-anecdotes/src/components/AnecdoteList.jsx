import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(state => state.anecdotes.anecdotes)
	const filterValue = useSelector(state => state.filter.filter)

	const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterValue.toLowerCase()))

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
							<button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
						</div>
					</div>
				)
			}
		</div>
	)
}

export default AnecdoteList