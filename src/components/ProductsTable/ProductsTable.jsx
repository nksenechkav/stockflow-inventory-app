
import ProductRow from '../ProductRow/ProductRow'
import './ProductsTable.css'

function ProductsTable({
  products,
  onDeleteProduct,
  onEditProduct,
  searchQuery,
  onSearchChange,
}) {
  return (
    <section className="products-section" id="products">
      <div className="section-header">
        <div>
          <h2>Recent products</h2>
          <p>Overview of your current inventory</p>
        </div>

        <button className="secondary-button" type="button">
          View all products →
        </button>
      </div>     
      <div className="products-search">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
     <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onDelete={onDeleteProduct}
                  onEdit={onEditProduct}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">
                  <div className="empty-state-content">
                    <p className="empty-state-title">No products found</p>
                    <p className="empty-state-text">
                      Try adjusting your search to find what you are looking for.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ProductsTable
