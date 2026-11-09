
import ProductRow from '../ProductRow/ProductRow'
import './ProductsTable.css'

function ProductsTable({
  products,
  onDeleteProduct,
  onEditProduct,
  searchQuery,
  onSearchChange,
  sortOrder,
  onSortChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  onResetFilters,
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
  productsPerPage,
  onProductsPerPageChange,
  startProduct,
  endProduct,
  totalProducts,
  totalInventoryProducts, 
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
        <select
          className="category-filter"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="All">All categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Home & Office">Home & Office</option>
          <option value="Stationery">Stationery</option>
        </select>
        <select
          className="category-filter"
          value={selectedStatus}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="All">All statuses</option>
          <option value="In stock">In stock</option>
          <option value="Low stock">Low stock</option>
          <option value="Out of stock">Out of stock</option>
        </select>
        <button
          type="button"
          className="reset-filters-button"
          onClick={onResetFilters}
        >
          Reset filters
        </button>
      </div>
     <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>
                <button
                  type="button"
                  className="sort-button"
                  onClick={onSortChange}
                  aria-label={`Sort by price ${
                    sortOrder === 'asc' ? 'descending' : 'ascending'
                  }`}
                >
                  <span>Price</span>
                  <span className="sort-arrow">
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </span>
                </button>
              </th>
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
                    <p className="empty-state-title">
                      {totalInventoryProducts === 0
                        ? 'Your inventory is empty'
                        : searchQuery.trim() !== ''
                          ? 'No products found'
                          : selectedCategory !== 'All'
                            ? 'No products in this category'
                            : selectedStatus !== 'All'
                              ? 'No matching products'
                              : 'No products found'}
                    </p>

                    <p className="empty-state-text">
                      {totalInventoryProducts === 0
                        ? 'Start by adding your first product to the inventory.'
                        : 'Try adjusting your search or filters to find what you are looking for.'}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="products-info">
          Showing {startProduct}–{endProduct} of {totalProducts} products
        </div>
        <div className="pagination">
          <label className="items-per-page">
            <span>Show:</span>

            <select
              value={productsPerPage}
              onChange={(event) =>
                onProductsPerPageChange(Number(event.target.value))
              }
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </label>
          <button
            type="button"
            onClick={onPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={onNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductsTable
