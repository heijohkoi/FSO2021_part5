import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const titleInput = component.container.querySelector(
    'input[name=title]'
  )
  const authorInput = component.container.querySelector(
    'input[name=author]'
  )
  const urlInput =
    component.container.querySelector('input[name=url]')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: {
      value: 'testing forms'
    }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Jack Writer' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'https://www.thisisnotawebsite.org' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing forms')
  expect(createBlog.mock.calls[0][0].author).toBe('Jack Writer')
  expect(createBlog.mock.calls[0][0].url).toBe(
    'https://www.thisisnotawebsite.org'
  )
})
