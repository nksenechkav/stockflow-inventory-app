
import './StatsGrid.css'
import {
  Package,
  Wallet,
  AlertTriangle,
  PackageX,
} from 'lucide-react'

function StatsGrid({
  totalProducts,
  inventoryValue,
  lowStockProducts,
  outOfStockProducts,
}) {
  return (
    <section className="stats-grid">
      <article className="stat-card stat-card-total">
          <div className="stat-heading">
            <p className="stat-label">Total products</p>
            <Package className="stat-icon" size={22} />
          </div>

          <p className="stat-value">{totalProducts}</p>
          <p className="stat-note">Products in catalogue</p>
      </article>

      <article className="stat-card stat-card-value">
        <div className="stat-heading">
          <p className="stat-label">Inventory value</p>
          <Wallet className="stat-icon" size={22} />
        </div>
        <p className="stat-value">
          ${inventoryValue.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className="stat-note">Value of current stock</p>
      </article>

      <article className="stat-card stat-card-low">
        <div className="stat-heading">
          <p className="stat-label">Low stock</p>
          <AlertTriangle className="stat-icon" size={22} />
        </div>
        <p className="stat-value warning-value">
          {lowStockProducts}
        </p>
        <p className="stat-note">Products need attention</p>
      </article>

      <article className="stat-card stat-card-out">
        <div className="stat-heading">
          <p className="stat-label">Out of stock</p>
          <PackageX className="stat-icon" size={22} />
        </div>
        <p className="stat-value danger-value">
          {outOfStockProducts}
        </p>
        <p className="stat-note">Products unavailable</p>
      </article>
    </section>
  )
}

export default StatsGrid
