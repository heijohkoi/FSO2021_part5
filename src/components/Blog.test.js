import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('viewing a blog', () => {
  test('renders only title and author', () => {
    const blog = {
      title: 'Introducing the New React DevTools',
      author: 'Brian Vaughn',
      url: 'https://reactjs.org/blog/2019/08/15/new-react-devtools.html',
      likes: 6,
      user: {
        name: 'Jarkko Kanttila',
        username: 'morko'
      }
    }

    const component = render(<Blog blog={blog} />)

    // component.debug()

    expect(component.container).toHaveTextContent(
      'Introducing the New React DevTools by Brian Vaughn'
    )

    expect(component.container).not.toHaveTextContent(
      'https://reactjs.org/blog/2019/08/15/new-react-devtools.html'
    )

    expect(component.container).not.toHaveTextContent('6')
  })

  test('clicking title show full info of a blog', async () => {
    const blog = {
      title: 'Introducing the New React DevTools',
      author: 'Brian Vaughn',
      url: 'https://reactjs.org/blog/2019/08/15/new-react-devtools.html',
      likes: 6,
      user: {
        name: 'Jarkko Kanttila',
        username: 'morko'
      }
    }

    const user = {
      username: 'morko',
      name: 'Jarkko Kanttila'
    }

    const deleteMockHandler = jest.fn()
    const likeMockHandler = jest.fn()

    const component = render(
      <Blog
        blog={blog}
        deleteBlog={deleteMockHandler}
        updateLikes={likeMockHandler}
        user={user}
      />
    )

    const button = component.container.querySelector('.collapsible')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'Introducing the New React DevTools by Brian Vaughn'
    )

    expect(component.container).toHaveTextContent(
      'https://reactjs.org/blog/2019/08/15/new-react-devtools.html'
    )

    expect(component.container).toHaveTextContent('6')
  })

  test('clicking like-button twice will call handler twice', () => {
    const blog = {
      title: 'Introducing the New React DevTools',
      author: 'Brian Vaughn',
      url: 'https://reactjs.org/blog/2019/08/15/new-react-devtools.html',
      likes: 6,
      user: {
        name: 'Jarkko Kanttila',
        username: 'morko'
      }
    }

    const user = {
      username: 'morko',
      name: 'Jarkko Kanttila'
    }

    const deleteMockHandler = jest.fn()
    const likeMockHandler = jest.fn()

    const component = render(
      <Blog
        blog={blog}
        deleteBlog={deleteMockHandler}
        updateLikes={likeMockHandler}
        user={user}
      />
    )

    const collapseButton =
      component.container.querySelector('.collapsible')
    fireEvent.click(collapseButton)

    const likeButton =
      component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })
})
