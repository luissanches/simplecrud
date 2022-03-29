import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './Screens/Home'
import About from './Screens/About'
import Login from './Screens/Login'

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				{/* <Route path="/" element={<Login />} /> */}
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
			</Route>

			<Route path="/login" element={<Login />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById('root')
)
