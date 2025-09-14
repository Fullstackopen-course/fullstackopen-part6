import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
	return {
			content: anecdote,
			id: getId(),
			votes: 0
	}
}

const anecdotesSlice = createSlice(
	{
		name: 'anecdotes',
		initialState: [],
		reducers: {
			vote: (state, action) => {
				const id = action.payload
				const anecdoteToVote = state.find(a => a.id === id)
				const votedAnecdote = {
					...anecdoteToVote,
					votes: anecdoteToVote.votes + 1
				}
				return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
			},
			newAnecdote: (state, action) => {
				return state.concat(asObject(action.payload))
			},
			setAnecdotes: (state, action) => {
				return action.payload
			}
		}
	}
)

export const {vote, newAnecdote, setAnecdotes} = anecdotesSlice.actions
export default anecdotesSlice.reducer