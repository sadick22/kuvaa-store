import { useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './CartPage.css'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total } = useCart()
  const navigate = useNavigate()

  if (cart.length === 0) return (
    <div>
      <Navbar />
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Discover our latest collection</p>
        <button className="btn-dark" onClick={() => navigate('/shop')}>Shop Now</button>
      </div>
      <Footer />
    </div>
  )

  return (
    <div>
      <Navbar />
      <div className="cart-page container">
        <h1 className="cart-title">Your Cart ({cart.length})</h1>
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80'} alt={item.name} className="cart-img" />
                <div className="cart-item-info">
                  <p className="cart-item-cat">{item.category}</p>
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-size">Size: {item.size}</p>
                  <div className="cart-qty">
                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}><Minus size={14}/></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}><Plus size={14}/></button>
                  </div>
                </div>
                <div className="cart-item-right">
                  <span className="cart-item-price">KES {(item.price * item.quantity).toLocaleString()}</span>
                  <button className="cart-remove" onClick={() => removeFromCart(item.id, item.size)}><Trash2 size={15}/></button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-row"><span>Subtotal</span><span>KES {total.toLocaleString()}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{total >= 5000 ? 'Free' : 'KES 300'}</span></div>
            <div className="summary-divider"/>
            <div className="summary-row total"><span>Total</span><span>KES {(total >= 5000 ? total : total + 300).toLocaleString()}</span></div>
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
            <button className="continue-btn" onClick={() => navigate('/shop')}>Continue Shopping</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
