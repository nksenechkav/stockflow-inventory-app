
import './StatsGrid.css'

function StatsGrid({
  totalProducts,
  inventoryValue,
  lowStockProducts,
  outOfStockProducts,
}) {
  return (
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
        <p className="stat-value warning-value">
          {lowStockProducts}
        </p>
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
  )
}

export default StatsGrid
