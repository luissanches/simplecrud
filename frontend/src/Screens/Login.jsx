import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [login, setLogin] = useState('pedro')
	const [password, setPassword] = useState('pedro')
	const navigate = useNavigate()

	const onLogin = async () => {
		try {
			const url = `http://localhost:3000/users/auth/${login}/${password}`
			const response = await fetch(url)
			if (response.ok) {
				const responseData = await response.json()
				if (responseData.success && responseData.content) {
					navigate('/', { replace: true })
				} else {
					alert('Invalid Login')
				}
			}
		} catch (err) {
			console.error(err)
		}
	}

	function onLoginChange(event) {
		setLogin(event.target.value)
	}

	function onPasswordChange(event) {
		setPassword(event.target.value)
	}

	return (
		<div>
			<input type="text" value={login} onChange={onLoginChange} />
			<input type="password" value={password} onChange={onPasswordChange} />
			<button onClick={onLogin}>Login</button>
		</div>
	)
}

export default Login
