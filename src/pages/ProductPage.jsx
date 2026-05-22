import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingBag, ChevronLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'
import './ProductPage.css'

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('products').select('*').eq('id', id).single().then(({ data }) => {
      setProduct(data)
      setLoading(false)
    })
  }, [id])

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      toast.error('Please select a size')
      return
    }
    addToCart(product, selectedSize || 'One Size')
    toast.success('Added to cart!')
  }

  if (loading) return <div className="page-loading"><Navbar /><div className="loading-msg">Loading...</div></div>
  if (!product) return <div className="page-loading"><Navbar /><div className="loading-msg">Product not found.</div></div>

  const images = product.images || ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80']

  return (
    <div>
      <Navbar />
      <div className="product-page container">
        <button className="back-btn" onClick={() => navigate(-1)}><ChevronLeft size={16} /> Back</button>
        <div className="product-layout">
          {/* Images */}
          <div className="product-images">
            <div className="thumbnails">
              {images.map((img, i) => (
                <div key={i} className={`thumb${activeImage===i?' active':''}`} onClick={() => setActiveImage(i)}>
                  <img src={img} alt={`${product.name} ${i+1}`} />
                </div>
              ))}
            </div>
            <div className="main-image">
              <img src={images[activeImage]} alt={product.name} />
              {product.is_new && <span className="product-badge new">New</span>}
            </div>
          </div>

          {/* Details */}
          <div className="product-details">
            <p className="detail-category">{product.category}</p>
            <h1 className="detail-name">{product.name}</h1>
            <div className="detail-price-row">
              <span className="detail-price">KES {product.price?.toLocaleString()}</span>
              {product.original_price && <span className="detail-original">KES {product.original_price?.toLocaleString()}</span>}
            </div>
            <p className="detail-desc">{product.description}</p>

            {product.sizes?.length > 0 && (
              <div className="size-section">
                <div className="size-header">
                  <span className="size-label">Select Size</span>
                </div>
                <div className="size-grid">
                  {product.sizes.map(s => (
                    <button key={s} className={`size-btn${selectedSize===s?' selected':''}`} onClick={() => setSelectedSize(s)}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <ShoppingBag size={16} />
              Add to Cart
            </button>

            <div className="product-meta">
              <div className="meta-item"><span>✓</span> Free shipping over KES 5,000</div>
              <div className="meta-item"><span>✓</span> Easy 30-day returns</div>
              <div className="meta-item"><span>✓</span> Authentic quality guaranteed</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
