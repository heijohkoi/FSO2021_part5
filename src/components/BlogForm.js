import React from 'react'

const BlogForm = ({
  addBlog,
  newTitle,
  titleHandler,
  newAuthor,
  authorHandler,
  newUrl,
  urlHandler
}) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        title: <input value={newTitle} onChange={titleHandler} />
      </div>
      <div>
        author: <input value={newAuthor} onChange={authorHandler} />
      </div>
      <div>
        url: <input value={newUrl} onChange={urlHandler} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
