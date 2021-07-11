import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [viewFullBlog, setViewFullBlog] = useState(false)

  const handleClick = () => {
    setViewFullBlog(!viewFullBlog)
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
            {blog.likes} <button>like</button>
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
