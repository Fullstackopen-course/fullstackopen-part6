import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
	const evaluate = (type) => {
		store.dispatch({
			type: type
		})
	}

	return (
		<div>
			<button onClick={() => evaluate('GOOD')}>good</button>
			<button onClick={() => evaluate('OK')}>ok</button>
			<button onClick={() => evaluate('BAD')}>bad</button>
			<button onClick={() => evaluate('ZERO')}>reset stats</button>
			<div>good {store.getState().good}</div>
			<div>ok {store.getState().ok}</div>
			<div>bad {store.getState().bad}</div>
		</div>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
	root.render(<App />)
}

renderApp()
store.subscribe(renderApp)