import React from 'react'

const Notification = ({ alert, attention }) => {
  if (alert === null && attention === null) {
    return null
  }

  if (alert !== null) {
    return <div className="alert">{alert}</div>
  } else if (attention !== null) {
    return <div claaName="attention">{attention}</div>
  }
}

export default Notification
