import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [viewFullBlog, setViewFullBlog] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {viewFullBlog ? (
        <div>
          {blog.title} by {blog.author}{' '}
          <button onClick={() => setViewFullBlog(!viewFullBlog)}>
            hide
          </button>
          <br />
          {blog.url}
          <br />
          likes {blog.likes} <button>like</button>
          <br />
          {blog.user.name}
        </div>
      ) : (
        <div>
          {blog.title} by {blog.author}{' '}
          <button onClick={() => setViewFullBlog(!viewFullBlog)}>
            show
          </button>
        </div>
      )}
    </div>
  )
}

export default Blog
