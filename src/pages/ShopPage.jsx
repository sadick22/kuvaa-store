import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import './ShopPage.css'

const CATEGORIES = ['All', 'Women', 'Men', 'Kids']
const SORT_OPTIONS = [
  { label: 'Newest', value: 'created_at-desc' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
]

export default function ShopPage() {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All')
  const [sort, setSort] = useState('created_at-desc')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [activeCategory, sort])

  async function fetchProducts() {
    setLoading(true)
    let query = supabase.from('products').select('*').eq('is_active', true)
    if (activeCategory !== 'All') query = query.eq('category', activeCategory)
    const [col, dir] = sort.split('-')
    query = query.order(col, { ascending: dir === 'asc' })
    const { data } = await query
    setProducts(data || [])
    setLoading(false)
  }

  return (
    <div>
      <Navbar />
      <div className="shop-header">
        <h1 className="shop-title">{activeCategory === 'All' ? 'All Products' : activeCategory}</h1>
        <p className="shop-count">{products.length} items</p>
      </div>

      <div className="shop-layout container">
        {/* Filters Bar */}
        <div className="filters-bar">
          <div className="category-filters">
            {CATEGORIES.map(c => (
              <button key={c} className={`filter-btn${activeCategory===c?' active':''}`} onClick={() => setActiveCategory(c)}>{c}</button>
            ))}
          </div>
          <div className="sort-row">
            <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Products */}
        {loading ? (
          <div className="shop-loading">
            {[...Array(8)].map((_, i) => <div key={i} className="skeleton-card" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="shop-empty">
            <p>No products found. Check back soon!</p>
          </div>
        ) : (
          <div className="shop-grid">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
