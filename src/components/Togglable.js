import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  return (
    <div>
      <p style={hideWhenVisible}>
        <button onClick={toggleVisibility} className="button">
          {props.buttonLabel}
        </button>
      </p>
      <p style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility} className="button">
          cancel
        </button>
      </p>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
