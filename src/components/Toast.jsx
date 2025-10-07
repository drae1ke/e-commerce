import React, { useEffect } from 'react'
import './Toast.css'

const Toast = ({ message, type = 'error', visible, onClose, duration = 10000 }) => {
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => {
      onClose && onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [visible, duration, onClose])

  return (
    <div className={`toast-container ${visible ? 'show' : ''} ${type}`} role="alert" aria-live="assertive">
      <div className="toast-content">
        <span className="toast-message">{message}</span>
        <button className="toast-close" onClick={onClose} aria-label="Close">×</button>
      </div>
    </div>
  )
}

export default Toast





