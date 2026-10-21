import './DashboardHeader.css'

function DashboardHeader({ onAddProduct }) {
  return (
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
          onClick={onAddProduct}
        >
          + Add product
        </button>
      </div>
    </header>
  )
}

export default DashboardHeader