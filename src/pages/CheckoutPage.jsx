import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'
import './CheckoutPage.css'

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('mpesa')
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', address:'', city:'', county:'', mpesaPhone:'' })

  const shipping = total >= 5000 ? 0 : 300
  const orderTotal = total + shipping

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      const { data: order, error } = await supabase.from('orders').insert({
        customer_name: `${form.firstName} ${form.lastName}`,
        customer_email: form.email,
        customer_phone: form.phone,
        shipping_address: `${form.address}, ${form.city}, ${form.county}`,
        items: cart,
        subtotal: total,
        shipping_cost: shipping,
        total: orderTotal,
        payment_method: paymentMethod,
        payment_status: 'pending',
        order_status: 'processing',
      }).select().single()

      if (error) throw error

      if (paymentMethod === 'mpesa') {
        toast.success('Order placed! You will receive an M-Pesa prompt shortly.')
      } else {
        toast.success('Order placed successfully!')
      }

      clearCart()
      navigate('/order-success', { state: { order } })
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="checkout-page container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          <div className="checkout-form">
            {/* Step 1: Shipping */}
            <div className="checkout-section">
              <h2 className="checkout-section-title">1. Shipping Information</h2>
              <div className="form-row">
                <div className="form-field">
                  <label>First Name</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" />
                </div>
                <div className="form-field">
                  <label>Last Name</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" />
                </div>
              </div>
              <div className="form-field">
                <label>Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@email.com" />
              </div>
              <div className="form-field">
                <label>Phone Number</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+254 7XX XXX XXX" />
              </div>
              <div className="form-field">
                <label>Street Address</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="123 Kenyatta Avenue" />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>City</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="Nairobi" />
                </div>
                <div className="form-field">
                  <label>County</label>
                  <input name="county" value={form.county} onChange={handleChange} placeholder="Nairobi County" />
                </div>
              </div>
            </div>

            {/* Step 2: Payment */}
            <div className="checkout-section">
              <h2 className="checkout-section-title">2. Payment Method</h2>
              <div className="payment-options">
                <label className={`payment-option${paymentMethod==='mpesa'?' selected':''}`}>
                  <input type="radio" name="payment" value="mpesa" checked={paymentMethod==='mpesa'} onChange={() => setPaymentMethod('mpesa')} />
                  <div className="payment-content">
                    <span className="payment-icon">📱</span>
                    <div>
                      <strong>M-Pesa</strong>
                      <p>Pay via M-Pesa STK Push</p>
                    </div>
                  </div>
                </label>
                <label className={`payment-option${paymentMethod==='card'?' selected':''}`}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod==='card'} onChange={() => setPaymentMethod('card')} />
                  <div className="payment-content">
                    <span className="payment-icon">💳</span>
                    <div>
                      <strong>Card Payment</strong>
                      <p>Visa, Mastercard (via Stripe)</p>
                    </div>
                  </div>
                </label>
              </div>

              {paymentMethod === 'mpesa' && (
                <div className="form-field" style={{marginTop:'16px'}}>
                  <label>M-Pesa Phone Number</label>
                  <input name="mpesaPhone" type="tel" value={form.mpesaPhone} onChange={handleChange} placeholder="0712 345 678" />
                  <p className="field-hint">You will receive an M-Pesa prompt on this number</p>
                </div>
              )}
            </div>

            <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
              {loading ? 'Placing Order...' : `Place Order — KES ${orderTotal.toLocaleString()}`}
            </button>
          </div>

          {/* Summary */}
          <div className="checkout-summary">
            <h3 className="summary-title">Your Order</h3>
            {cart.map(item => (
              <div key={`${item.id}-${item.size}`} className="summary-item">
                <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&q=80'} alt={item.name} />
                <div className="summary-item-info">
                  <p className="summary-item-name">{item.name}</p>
                  <p className="summary-item-meta">Size: {item.size} · Qty: {item.quantity}</p>
                </div>
                <span className="summary-item-price">KES {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="summary-divider" />
            <div className="summary-row"><span>Subtotal</span><span>KES {total.toLocaleString()}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `KES ${shipping}`}</span></div>
            <div className="summary-divider" />
            <div className="summary-row total"><span>Total</span><span>KES {orderTotal.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
