import './DeleteConfirmModal.css'

function DeleteConfirmModal({
  product,
  onConfirm,
  onCancel,
}) {
  if (!product) return null

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
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