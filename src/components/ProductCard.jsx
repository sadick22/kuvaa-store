import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [hovered, setHovered] = useState(false)

  const handleQuickAdd = (e) => {
    e.preventDefault()
    const defaultSize = product.sizes?.[0] || 'One Size'
    addToCart(product, defaultSize)
    toast.success(`${product.name} added to cart`)
  }

  const imageUrl = product.images?.[0] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
  const hoverImage = product.images?.[1] || imageUrl

  return (
    <Link to={`/product/${product.id}`} className="product-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="product-image-wrap">
        <img src={hovered && product.images?.[1] ? hoverImage : imageUrl} alt={product.name} className="product-img" loading="lazy" />
        {product.is_new && <span className="product-badge new">New</span>}
        {product.discount_percent > 0 && <span className="product-badge sale">-{product.discount_percent}%</span>}
        <button className="quick-add" onClick={handleQuickAdd}>
          <ShoppingBag size={14} />
          Quick Add
        </button>
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price-row">
          <span className="product-price">KES {product.price?.toLocaleString()}</span>
          {product.original_price && <span className="product-original">KES {product.original_price?.toLocaleString()}</span>}
        </div>
        {product.sizes?.length > 0 && (
          <div className="product-sizes">
            {product.sizes.slice(0, 5).map(s => <span key={s} className="size-dot">{s}</span>)}
          </div>
        )}
      </div>
    </Link>
  )
}
