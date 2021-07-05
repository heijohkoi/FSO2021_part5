import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [alertMessage, setAlertMessage] = useState(null)
  const [attentionMessage, setAttentionMessage] = useState(null)

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

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
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
      setAttentionMessage(`logges in as ${user.name}`)
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logoutForm = () => (
    <>
      <button onClick={handleLogout}>logout</button>
    </>
  )

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
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
    <form onSubmit={addBlog}>
      <div>
        title: <input value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        author:{' '}
        <input value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        url: <input value={newUrl} onChange={handleUrlChange} />
      </div>
      <button type="submit">create</button>
    </form>
  )

  return (
    <div>
      <Notification
        alert={alertMessage}
        attention={attentionMessage}
      />
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>blogs</h2>

          <p>
            {user.name} logged in {logoutForm()}
          </p>
          <h2>create new</h2>
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
