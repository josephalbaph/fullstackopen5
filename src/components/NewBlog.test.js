import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlog from './NewBlog'

test('5.16: NewBlog', async () => {
  const promise = Promise.resolve()
  const createBlog = jest.fn(() => promise)

  const component = render(<NewBlog createBlog={createBlog} />)

  const inputNewTitle = component.container.querySelector('#title')
  const inputNewAuthor = component.container.querySelector('#author')
  const inputNewUrl = component.container.querySelector('#url')
  const form = component.container.querySelector('#form')

  fireEvent.change(inputNewTitle, {
    target: { value: 'New Title' },
  })
  fireEvent.change(inputNewAuthor, {
    target: { value: 'New Author' },
  })
  fireEvent.change(inputNewUrl, {
    target: { value: 'http://www.newurl.com' },
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('New Title')
  expect(createBlog.mock.calls[0][0].author).toBe('New Author')
  expect(createBlog.mock.calls[0][0].url).toBe('http://www.newurl.com')
  await act(() => promise)
})
