import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <input
            name="title"
            placeholder="title"
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <input
            name="author"
            placeholder="author"
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <input
            name="url"
            placeholder="url"
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit" className="button">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
