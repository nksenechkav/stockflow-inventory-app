
import { useEffect, useState } from 'react'
import initialProducts from './data/initialProducts'
import Sidebar from './components/Sidebar/Sidebar'
import DashboardHeader from './components/DashboardHeader/DashboardHeader'
import WelcomeSection from './components/WelcomeSection/WelcomeSection'
import StatsGrid from './components/StatsGrid/StatsGrid'
import ProductsTable from './components/ProductsTable/ProductsTable'
import ProductModal from './components/ProductModal/ProductModal'
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


const filteredProducts = products
  .filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .filter((product) =>
    selectedCategory === 'All'
      ? true
      : product.category === selectedCategory
  )
  .sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price
    }

    return b.price - a.price
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
  }

  form.reset()
  setIsFormOpen(false)
  setEditingProduct(null)
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
          products={filteredProducts}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={handleEditProduct}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortOrder={sortOrder}
          onSortChange={() =>
            setSortOrder((current) => (current === 'asc' ? 'desc' : 'asc'))
          }
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
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
      </main>
    </div>
  )
}

export default App
