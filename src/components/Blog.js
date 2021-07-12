import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setAlertMessage, deleteBlog, user }) => {
  const [viewFullBlog, setViewFullBlog] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleTitleClick = () => {
    setViewFullBlog(!viewFullBlog)
  }

  const handleLikeClick = async () => {
    const blogObject = {
      user: blog.user._id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1
    }

    try {
      await blogService.like(blogObject, blog.id)
      setLikes(likes + 1)
    } catch (exception) {
      console.log(exception.message)
      setAlertMessage('updating likes failed')
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {viewFullBlog ? (
        <div>
          <button onClick={handleTitleClick} className="collapsible">
            <strong>{blog.title}</strong> by {blog.author}
          </button>
          <div className="blogContent">
            <a href={blog.url}>{blog.url}</a>
            <br />
            {likes} <button onClick={handleLikeClick}>like</button>
            <br />
            {blog.user.name}
            <br />
            {user.username === blog.user.username ? (
              <button
                onClick={() => {
                  window.confirm(
                    `Remove blog ${blog.title} by ${blog.author}?`
                  )
                    ? deleteBlog(blog.id)
                    : null
                }}
              >
                remove
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <button onClick={handleTitleClick} className="collapsible">
          <strong>{blog.title}</strong> by {blog.author}
        </button>
      )}
    </div>
  )
}

export default Blog
