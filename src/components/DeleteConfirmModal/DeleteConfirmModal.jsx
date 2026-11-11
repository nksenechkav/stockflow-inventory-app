import './DeleteConfirmModal.css'
import { useEffect } from 'react'

function DeleteConfirmModal({
  product,
  onConfirm,
  onCancel,
}) {
    useEffect(() => {
    if (!product) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onCancel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [product, onCancel])

  if (!product) return null

  return (
    <div className="delete-modal-overlay" onClick={onCancel}>
      <div
        className="delete-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <h2>Delete product?</h2>

        <p>
          Are you sure you want to delete
          <strong> {product.name}</strong>?
        </p>

        <p>This action cannot be undone.</p>

        <div className="delete-modal-actions">
          <button
            type="button"
            className="cancel-delete-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="confirm-delete-button"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal