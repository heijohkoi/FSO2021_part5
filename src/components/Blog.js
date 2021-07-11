import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setAlertMessage }) => {
  const [viewFullBlog, setViewFullBlog] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleClick = () => {
    setViewFullBlog(!viewFullBlog)
  }

  const updateLikes = async () => {
    const blogObject = {
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
          <button onClick={handleClick} className="collapsible">
            <strong>{blog.title}</strong> by {blog.author}
          </button>
          <div className="blogContent">
            <a href={blog.url}>{blog.url}</a>
            <br />
            {likes} <button onClick={updateLikes}>like</button>
            <br />
            {blog.user.name}
          </div>
        </div>
      ) : (
        <button onClick={handleClick} className="collapsible">
          <strong>{blog.title}</strong> by {blog.author}
        </button>
      )}
    </div>
  )
}

export default Blog
