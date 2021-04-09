import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, username, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenUser = { display: username === blog.user.username ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const handleLikeClick = async () => {
    await updateBlog({ ...blog, likes: blog.likes + 1 })
  }
  const handleRemoveClick = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await deleteBlog(blog)
    }
  }
  return (
    <div style={blogStyle} className='blog-row'>
      <div style={hideWhenVisible} className='blog-hide'>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='blog-show'>
        <div>
          {blog.title}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button className='like-button' onClick={handleLikeClick}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <button style={showWhenUser} onClick={handleRemoveClick}>
          remove
        </button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
}

export default Blog
