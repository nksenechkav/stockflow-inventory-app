

import './ProductRow.css'

function ProductRow({ product, onDelete, onEdit }) {
  return (
    <tr>
      <td className="product-name">{product.name}</td>
      <td>{product.category}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>{product.stock}</td>
      <td>
        <span
          className={`status status-${product.status
            .toLowerCase()
            .replaceAll(' ', '-')}`}
        >
          {product.status}
        </span>
      </td>
      <td className="product-actions">
        <button
          className="edit-button"
          type="button"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          type="button"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default ProductRow
