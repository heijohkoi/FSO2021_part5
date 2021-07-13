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
        username:{' '}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={nameHandler}
        />
      </div>
      <div>
        password:{' '}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={passwordHandler}
        />
      </div>
      <button type="submit">login</button>
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
