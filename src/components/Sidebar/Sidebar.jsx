import './Sidebar.css'

function Sidebar() {
  return (
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
  )
}

export default Sidebar