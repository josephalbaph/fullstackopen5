import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(
    () =>
      (async () => {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      })(),
    []
  )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message }) =>
    message ? <div className='notification'>{message}</div> : null

  const ErrorNotification = ({ errorMessage }) =>
    errorMessage ? <div className='error'>{errorMessage}</div> : null

  const doLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <ErrorNotification errorMessage={errorMessage} />
      <Login doLogin={doLogin} />
    </div>
  )

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.create(blogObject)
      setMessage(`a new blog ${savedBlog.title} by ${savedBlog.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setBlogs(blogs.concat(savedBlog))
    } catch (error) {
      const errMsg = error.response.data.error
      console.log(errMsg)
      setErrorMessage(errMsg)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      const savedBlog = await blogService.update(blogObject.id, blogObject)
      setBlogs(
        blogs.map((blog) =>
          blog.id === savedBlog.id ? { ...savedBlog } : blog
        )
      )
    } catch (error) {
      const errMsg = error.response.data.error
      console.log(errMsg)
      setErrorMessage(errMsg)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.del(blogObject.id)
      setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
      setMessage(`Deleted blog ${blogObject.title} by ${blogObject.author}`)
    } catch (error) {
      const errMsg = error.response.data
      console.log(errMsg)
      setErrorMessage(errMsg)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} />
        <ErrorNotification errorMessage={errorMessage} />
        <p>{user.name} logged-in</p>
        <Togglable buttonLabel='new note' ref={blogFormRef}>
          <NewBlog createBlog={addBlog} />
        </Togglable>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              username={user.username}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
      </div>
    )
  }

  return user === null ? loginForm() : blogForm()
}

export default App
