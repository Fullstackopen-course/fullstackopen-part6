import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const res = await axios.get(baseUrl)
	return res.data
}

const createAnecdote = async (anecdote) => {
	const res = await axios.post(
		baseUrl,
		anecdote
	)
	return res.data
}

const voteAnecdote = async (id) => {
	const  anecdoteToVote = (await axios.get(`${baseUrl}/${id}`)).data

	const anecdoteUpdated = {
		...anecdoteToVote,
		votes: anecdoteToVote.votes + 1
	}
	const res = await axios.put(
		`${baseUrl}/${id}`,
		anecdoteUpdated
	)
	return res.data
}

export default { getAll, createAnecdote, voteAnecdote }