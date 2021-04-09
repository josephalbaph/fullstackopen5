import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlog = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleNewTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleNewUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form id='form' onSubmit={addBlog}>
        <div>
          title
          <input id='title' value={newTitle} onChange={handleNewTitleChange} />
        </div>
        <div>
          author
          <input id='author' value={newAuthor} onChange={handleNewAuthorChange} />
        </div>
        <div>
          url
          <input id='url' value={newUrl} onChange={handleNewUrlChange} />
        </div>

        <button type='submit'>create</button>
      </form>
    </div>
  )
}

NewBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default NewBlog
