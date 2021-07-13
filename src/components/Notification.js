import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ alert, attention }) => {
  if (alert === null && attention === null) {
    return null
  }

  if (alert !== null) {
    return (
      <div className="overlay">
        <div className="popup">
          <div className="alertContent">{alert}</div>
        </div>
      </div>
    )
  } else if (attention !== null) {
    return (
      <div className="overlay">
        <div className="popup">
          <div className="attentionContent">{attention}</div>
        </div>
      </div>
    )
  }
}

/* if (alert !== null) {
    return <div className="alert">{alert}</div>
  } else if (attention !== null) {
    return <div className="attention">{attention}</div>
  }*/

Notification.propTypes = {
  alert: PropTypes.string,
  attention: PropTypes.string
}

export default Notification
