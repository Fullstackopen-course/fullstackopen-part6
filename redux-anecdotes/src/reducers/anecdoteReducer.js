import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

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
				return state.concat(action.payload)
			},
			setAnecdotes: (state, action) => {
				return action.payload
			}
		}
	}
)

export const {vote, newAnecdote, setAnecdotes} = anecdotesSlice.actions

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = (content) => {
	return async dispatch => {
		const createdAnecdote = await anecdoteService.createAnecdote(asObject(content))
		dispatch(newAnecdote(createdAnecdote))
	}
}

export const voteAnecdote = (id) => {
	return async dispatch => {
		const votedAnecdote = await anecdoteService.voteAnecdote(id)
		dispatch(vote(votedAnecdote.id))
	}
}

export default anecdotesSlice.reducer