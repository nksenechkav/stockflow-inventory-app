
import { useEffect, useState } from 'react'
import './App.css'

const initialProducts = [
  {
    id: 1,
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 24.99,
    stock: 42,
    status: 'In stock',
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 79.99,
    stock: 8,
    status: 'Low stock',
  },
  {
    id: 3,
    name: 'Desk Lamp',
    category: 'Home & Office',
    price: 34.5,
    stock: 0,
    status: 'Out of stock',
  },
  {
    id: 4,
    name: 'Notebook Set',
    category: 'Stationery',
    price: 12.99,
    stock: 25,
    status: 'In stock',
  },
]

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [products, setProducts] = useState(() => {
  const savedProducts = localStorage.getItem('stockflow-products')

  return savedProducts
    ? JSON.parse(savedProducts)
    : initialProducts
})

    useEffect(() => {
      localStorage.setItem(
        'stockflow-products',
        JSON.stringify(products)
      )
    }, [products])

  const totalProducts = products.length

  const lowStockProducts = products.filter(
    (product) => product.stock > 0 && product.stock < 10
  ).length

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0
  ).length

  const inventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0
  )
function handleSubmit(event) {
  event.preventDefault()

  const form = event.currentTarget
  const formData = new FormData(form)

  const productData = Object.fromEntries(formData.entries())

  const price = Number(productData.price)
  const stock = Number(productData.stock)

  const newProduct = {
    id: Date.now(),
    name: productData.name.trim(),
    category: productData.category,
    price,
    stock,
    status:
      stock === 0
        ? 'Out of stock'
        : stock < 10
          ? 'Low stock'
          : 'In stock',
  }

  setProducts((currentProducts) => [
    ...currentProducts,
    newProduct,
  ])

  form.reset()
  setIsFormOpen(false)
}
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">S</div>
          <span>StockFlow</span>
        </div>

        <p className="nav-label">WORKSPACE</p>

        <nav className="navigation">
          <a href="#dashboard" className="nav-link active">
            <span className="nav-icon">▦</span>
            Dashboard
          </a>
          <a href="#products" className="nav-link">
            <span className="nav-icon">□</span>
            Products
          </a>
          <a href="#orders" className="nav-link">
            <span className="nav-icon">⇄</span>
            Orders
          </a>
          <a href="#reports" className="nav-link">
            <span className="nav-icon">▤</span>
            Reports
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="avatar">ON</div>
          <div>
            <p className="user-name">Oksana Nesteruk</p>
            <p className="user-role">Store administrator</p>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Workspace / Overview</p>
            <h1>Dashboard</h1>
          </div>

          <div className="topbar-right">
            <span className="today-label">Inventory overview</span>
            <button
                className="primary-button"
                type="button"
                onClick={() => setIsFormOpen(true)}
              >
                + Add product
              </button>
          </div>
        </header>

        <section className="welcome">
          <div>
            <h2>Good morning, Oksana 👋</h2>
            <p>Here is what's happening with your inventory today.</p>
          </div>
          <span className="date-label">Stock overview</span>
        </section>

        <section className="stats-grid">
          <article className="stat-card">
            <p className="stat-label">Total products</p>
            <p className="stat-value">{totalProducts}</p>
            <p className="stat-note">Products in catalogue</p>
          </article>

          <article className="stat-card">
            <p className="stat-label">Inventory value</p>
            <p className="stat-value">
              ${inventoryValue.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="stat-note">Value of current stock</p>
          </article>

          <article className="stat-card">
            <p className="stat-label">Low stock</p>
            <p className="stat-value warning-value">{lowStockProducts}</p>
            <p className="stat-note">Products need attention</p>
          </article>

          <article className="stat-card">
            <p className="stat-label">Out of stock</p>
            <p className="stat-value danger-value">
              {outOfStockProducts}
            </p>
            <p className="stat-note">Products unavailable</p>
          </article>
        </section>

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

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {isFormOpen && (
  <div className="modal-backdrop">
    <section className="modal">
      <div className="modal-header">
        <h2>Add product</h2>

        <button
          type="button"
          className="close-button"
          onClick={() => setIsFormOpen(false)}
        >
          ×
        </button>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
  <label>
    Product name
    <input
      type="text"
      name="name"
      placeholder="e.g. Office Chair"
    />
  </label>

  <label>
    Category
    <select name="category" defaultValue="Electronics">
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
    />
  </label>

  <button className="primary-button" type="submit">
    Save product
  </button>
</form>
    </section>
  </div>
)}
      </main>
    </div>
  )
}

export default App
