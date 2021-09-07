import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, deleteBlog, updateLikes, user }) => {
  const [viewFullBlog, setViewFullBlog] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleTitleClick = () => {
    setViewFullBlog(!viewFullBlog)
  }

  const handleLikeClick = (event) => {
    event.preventDefault()

    try {
      updateLikes(
        {
          user: blog.user._id,
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: likes + 1
        },
        blog.id
      )
      setLikes(likes + 1)
    } catch (exception) {
      console.log(exception.message)
    }
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    updateLikes: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
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
            {likes}{' '}
            <button onClick={handleLikeClick} className="likeButton">
              like
            </button>
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
                className="deleteButton"
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
