import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		setNotification: (state, action) => action.payload,
		removeNotification: () => null
	}
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const setNotificationWithTimeout = (message, timeout=null) => {
	return async dispatch => {
		dispatch(setNotification(message))
		if (timeout && timeout > 0)
			setTimeout(() => {
				dispatch(removeNotification())
			}, timeout * 1000)
	}
}

export default notificationSlice.reducer