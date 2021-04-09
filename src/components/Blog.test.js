import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let blog = {
    title: 'Title 1',
    author: 'Author 1',
    url: 'https://www.url.com',
    likes: 1000000,
    user: { username: 'josephalbaph' },
  }
  let username = 'josephalbaph'
  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()
  const likeClick = jest.fn()
  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        username={username}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
      />
    )
  })

  test('5.13: by default title and author are visible', () => {
    expect(component.container.querySelector('.blog-hide')).toBeVisible
  })

  test('5.13: by default url and number of likes are not visible', () => {
    expect(component.container.querySelector('.blog-show')).not.toBeVisible()
  })

  test('5.14: url and number of likes are shown when view button is clicked.', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container.querySelector('.blog-show')).toBeVisible()
  })

  test('5.15: url and number of likes are shown when view button is clicked.', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(updateBlog.mock.calls).toHaveLength(2)
  })

  test('renders Blog row', () => {
    expect(component.container.querySelector('.blog-row')).toBeDefined()
  })

  test('after clicking the view button, blog details are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container.querySelector('.blog-show')).toBeVisible()
  })

  test('blog details can be closed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const closeButton = component.getByText('hide')
    fireEvent.click(closeButton)
    expect(component.container.querySelector('.blog-show')).not.toBeVisible()
  })
})
