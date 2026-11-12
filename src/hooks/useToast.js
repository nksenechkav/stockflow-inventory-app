import { useCallback, useState } from 'react'

function useToast() {
  const [toasts, setToasts] = useState([])

  function showToast(message, type = 'success') {
  const newToast = {
    id: Date.now(),
    message,
    type,
  }

  setToasts((currentToasts) => [
    ...currentToasts,
    newToast,
  ].slice(-3))
}
const handleCloseToast = useCallback((id) => {
  setToasts((currentToasts) =>
    currentToasts.filter((toast) => toast.id !== id)
  )
}, [])

return {
  toasts,
  showToast,
  handleCloseToast,
}
}

export default useToast