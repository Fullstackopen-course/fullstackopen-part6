const filterReducer = (state={ filter:'' }, action) => {
	switch (action.type) {
		case 'SET_FILTER':
			return {...state, filter: action.payload}
		default:
			return state
	}
}

export const newFilter = (filter) => {
	return {
		type: 'SET_FILTER',
		payload: filter
	}
}

export default filterReducer