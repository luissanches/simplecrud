import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './index.sass'

const App = () => {
	return (
		<div className="app-main-container">
			<nav>
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
				<Link to="/login">Logout</Link>
			</nav>
			<Outlet />
		</div>
	)
}

export default App
