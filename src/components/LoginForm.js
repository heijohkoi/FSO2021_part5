import React from 'react'

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

export default LoginForm
