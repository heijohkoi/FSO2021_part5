import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [alertMessage, setAlertMessage] = useState(null)
  const [attentionMessage, setAttentionMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedNoteappUser'
    )
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setAttentionMessage(`logged in as ${user.name}`)
      setTimeout(() => {
        setAttentionMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('wrong credentials')
      setAlertMessage('Wrong credentials')
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    setAttentionMessage('you have been successfully logged out')
    setTimeout(() => {
      setAttentionMessage(null)
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setAttentionMessage(
        `a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`
      )
      setTimeout(() => {
        setAttentionMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception.message)
      setAlertMessage('creating new failed')
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          <Notification
            alert={alertMessage}
            attention={attentionMessage}
          />
          <LoginForm
            username={username}
            password={password}
            loginHandler={handleLogin}
            nameHandler={handleNameChange}
            passwordHandler={handlePasswordChange}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification
            alert={alertMessage}
            attention={attentionMessage}
          />
          <p>
            {user.name} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
