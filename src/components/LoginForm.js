import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  loginHandler,
  nameHandler,
  passwordHandler
}) => {
  return (
    <form onSubmit={loginHandler}>
      <div>
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          placeholder="Username"
          onChange={nameHandler}
        />
      </div>
      <div>
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          placeholder="Password"
          onChange={passwordHandler}
        />
      </div>
      <button id="login-button" type="submit" className="button">
        login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loginHandler: PropTypes.func.isRequired,
  nameHandler: PropTypes.func.isRequired,
  passwordHandler: PropTypes.func.isRequired
}

export default LoginForm
