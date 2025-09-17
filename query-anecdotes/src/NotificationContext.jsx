import { useContext } from "react"
import { useReducer } from "react"
import { createContext } from "react"

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return action.payload
		case 'REMOVE_NOTIFICATION':
			return null
		default:
			return state
	}
}

const NotificationContext = createContext()

const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, null)

	return (
		<NotificationContext.Provider
			value={[notification, notificationDispatch]}
		>
			{props.children}
		</NotificationContext.Provider>
	)
}

export const useNotificationValue = () => {
	const notificationAndDispatch = useContext(NotificationContext)
	return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
	const notificationAndDispatch = useContext(NotificationContext)
	return notificationAndDispatch[1]
}

export default NotificationContextProvider