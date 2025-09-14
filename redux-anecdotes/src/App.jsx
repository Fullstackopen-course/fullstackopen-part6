import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import anecdoteService from './services/anecdoteService'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
	const dispatch = useDispatch()

	useEffect(
		() => {
			async function fetchAnecdotes() {
				const anecdotes = await anecdoteService.getAll()
				dispatch(setAnecdotes(anecdotes))
			}
			fetchAnecdotes()
		},
		[dispatch]
	)
	return (
		<div>
			<Notification/>

			<h2>Anecdotes</h2>

			<Filter/>

			<AnecdoteList/>

			<AnecdoteForm/>
		</div>
	)
}

export default App