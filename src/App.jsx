
import { useCallback, useEffect, useState } from 'react'
import initialProducts from './data/initialProducts'
import Sidebar from './components/Sidebar/Sidebar'
import DashboardHeader from './components/DashboardHeader/DashboardHeader'
import WelcomeSection from './components/WelcomeSection/WelcomeSection'
import StatsGrid from './components/StatsGrid/StatsGrid'
import ProductsTable from './components/ProductsTable/ProductsTable'
import ProductModal from './components/ProductModal/ProductModal'
import DeleteConfirmModal from './components/DeleteConfirmModal/DeleteConfirmModal'
import Toast from './components/Toast/Toast'
import './App.css'

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [products, setProducts] = useState(() => {
  const savedProducts = localStorage.getItem('stockflow-products')

  return savedProducts
    ? JSON.parse(savedProducts)
    : initialProducts
})

const [searchQuery, setSearchQuery] = useState('')
const [sortOrder, setSortOrder] = useState('asc')
const [selectedCategory, setSelectedCategory] = useState('All')
const [selectedStatus, setSelectedStatus] = useState('All')
const [currentPage, setCurrentPage] = useState(1)
const [productsPerPage, setProductsPerPage] = useState(5)
const [productToDelete, setProductToDelete] = useState(null)
const [toasts, setToasts] = useState([])

function showToast(message, type = 'success') {
  const newToast = {
    id: Date.now(),
    message,
    type,
  }

  setToasts((currentToasts) => [
    ...currentToasts,
    newToast,
  ].slice(-3))
}

const handleCloseToast = useCallback((id) => {
  setToasts((currentToasts) =>
    currentToasts.filter((toast) => toast.id !== id)
  )
}, [])

function handleResetFilters() {
  setSearchQuery('')
  setSelectedCategory('All')
  setSelectedStatus('All')
}

function handleNextPage() {
  setCurrentPage((currentPage) =>
    Math.min(currentPage + 1, totalPages)
  )
}

function handlePreviousPage() {
  setCurrentPage((currentPage) =>
    Math.max(currentPage - 1, 1)
  )
}

const filteredProducts = products
  .filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .filter((product) =>
    selectedCategory === 'All'
      ? true
      : product.category === selectedCategory
  )
  .filter((product) =>
    selectedStatus === 'All'
      ? true
      : product.status === selectedStatus
  )
  .sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price
    }

    return b.price - a.price
  })

  const totalPages = Math.ceil(
  filteredProducts.length / productsPerPage
)

const startIndex = (currentPage - 1) * productsPerPage

const currentProducts = filteredProducts.slice(
  startIndex,
  startIndex + productsPerPage
)

const startProduct = filteredProducts.length === 0
  ? 0
  : startIndex + 1

const endProduct = Math.min(
  startIndex + productsPerPage,
  filteredProducts.length
)

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

  const productDataToSave = {
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

  if (editingProduct) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === editingProduct.id
          ? { ...product, ...productDataToSave }
          : product
      )
    )
    showToast('Product updated successfully!')
  } else {
    const newProduct = {
  id:
    products.reduce(
      (maxId, product) => Math.max(maxId, Number(product.id) || 0),
      0
    ) + 1,
  ...productDataToSave,
}

    setProducts((currentProducts) => [
      ...currentProducts,
      newProduct,
    ])
    showToast('Product added successfully!')
  }

  form.reset()
  setIsFormOpen(false)
  setEditingProduct(null)
}

function handleDeleteClick(product) {
  setProductToDelete(product)
}

function handleDeleteProduct(productId) {
  setProducts((currentProducts) =>
    currentProducts.filter(
      (product) => product.id !== productId
    )
  )
}

const [editingProduct, setEditingProduct] = useState(null)

function handleEditProduct(product) {
  setEditingProduct(product)
  setIsFormOpen(true)
}

function handleConfirmDelete() {
  if (!productToDelete) return

  handleDeleteProduct(productToDelete.id)
  showToast('Product deleted successfully!')
  setProductToDelete(null)
}

function handleCancelDelete() {
  setProductToDelete(null)
}
  return (
    <div className="app">
    <Sidebar />
      <main className="main-content" id="dashboard">
        <DashboardHeader
            onAddProduct={() => setIsFormOpen(true)}
          />
        <WelcomeSection />
        <StatsGrid
            totalProducts={totalProducts}
            inventoryValue={inventoryValue}
            lowStockProducts={lowStockProducts}
            outOfStockProducts={outOfStockProducts}
        />
        <ProductsTable
          products={currentProducts}
          onDeleteProduct={handleDeleteClick}
          onEditProduct={handleEditProduct}
          searchQuery={searchQuery}
          onSearchChange={(value) => {
            setSearchQuery(value)
            setCurrentPage(1)
          }}
          sortOrder={sortOrder}
          onSortChange={() =>
            setSortOrder((current) => (current === 'asc' ? 'desc' : 'asc'))
          }
          selectedCategory={selectedCategory}
          onCategoryChange={(value) => {
            setSelectedCategory(value)
            setCurrentPage(1)
          }}
          selectedStatus={selectedStatus}
          onStatusChange={(value) => {
            setSelectedStatus(value)
            setCurrentPage(1)
          }}
          onResetFilters={handleResetFilters}
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          productsPerPage={productsPerPage}
          onProductsPerPageChange={(value) => {
          setProductsPerPage(value)
          setCurrentPage(1)
        }}
          startProduct={startProduct}
          endProduct={endProduct}
          totalProducts={filteredProducts.length}
          totalInventoryProducts={products.length}
        />
        {isFormOpen && (
            <ProductModal
              onClose={() => {
                setIsFormOpen(false)
                setEditingProduct(null)
              }}
              onSubmit={handleSubmit}
              product={editingProduct}
            />
      )}
            <DeleteConfirmModal
              product={productToDelete}
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
           <div className="toast-container">
              {toasts.map((toast) => (
                <Toast
                  key={toast.id}
                  message={toast.message}
                  type={toast.type}
                  onClose={handleCloseToast}
                />
              ))}
            </div>
      </main>
    </div>
  )
}

export default App
