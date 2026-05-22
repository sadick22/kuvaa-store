import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './OrderSuccessPage.css'

export default function OrderSuccessPage() {
  const navigate = useNavigate()
  const { state } = useLocation()

  return (
    <div>
      <Navbar />
      <div className="success-page">
        <div className="success-icon">✓</div>
        <h1 className="success-title">Order Placed!</h1>
        <p className="success-msg">Thank you for shopping with Kuvaa. We'll send a confirmation to your email shortly.</p>
        {state?.order?.payment_method === 'mpesa' && (
          <div className="mpesa-notice">📱 Check your phone for an M-Pesa payment prompt</div>
        )}
        <div className="success-actions">
          <button className="btn-dark" onClick={() => navigate('/shop')}>Continue Shopping</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
