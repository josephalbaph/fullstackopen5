import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Login = ({ doLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    await doLogin({
      username,
      password,
    })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  doLogin: PropTypes.func.isRequired,
}
export default Login
