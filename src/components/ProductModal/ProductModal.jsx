
import './ProductModal.css'

function ProductModal({ onClose, onSubmit, product }) {
  return (
    <div className="modal-backdrop">
      <section className="modal">
        <div className="modal-header">
          <h2>{product ? 'Edit product' : 'Add product'}</h2>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form className="product-form" onSubmit={onSubmit}>
          <label>
            Product name
            <input
              type="text"
              name="name"
              placeholder="e.g. Office Chair"
              defaultValue={product?.name ?? ''}
              required
            />
          </label>

          <label>
            Category
            <select name="category" defaultValue={product?.category ?? 'Electronics'}>
              <option value="Electronics">Electronics</option>
              <option value="Home & Office">Home & Office</option>
              <option value="Stationery">Stationery</option>
            </select>
          </label>

          <label>
            Price ($)
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              placeholder="0.00"
              defaultValue={product?.price ?? ''}
              required
            />
          </label>

          <label>
            Stock quantity
            <input
              type="number"
              name="stock"
              min="0"
              step="1"
              placeholder="0"
              defaultValue={product?.stock ?? ''}
              required
            />
          </label>

          <button className="primary-button" type="submit">
            {product ? 'Save changes' : 'Add product'}
          </button>
        </form>
      </section>
    </div>
  )
}

export default ProductModal
