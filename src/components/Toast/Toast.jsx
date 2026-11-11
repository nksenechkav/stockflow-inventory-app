import { useEffect, useState } from 'react'
import './Toast.css'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

function Toast({ toastId, message, type, onClose }) {
    const [isClosing, setIsClosing] = useState(false)
    useEffect(() => {
    let closeTimer

    const timer = setTimeout(() => {
        setIsClosing(true)

        closeTimer = setTimeout(() => {
        onClose(toastId)
        }, 300)
    }, 3000)

    return () => {
        clearTimeout(timer)
        clearTimeout(closeTimer)
    }
    }, [message, toastId, onClose])

  const icons = {
    success: <CheckCircle />,
    error: <XCircle />,
    warning: <AlertCircle />,
  }

  return (
    <div
        className={`toast toast-${type} ${isClosing ? 'toast-closing' : ''}`}
    >
      <div className="toast-icon">
        {icons[type]}
      </div>

      <p className="toast-message">{message}</p>

      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </div>
  )
}

export default Toast