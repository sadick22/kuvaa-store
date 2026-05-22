import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import './Navbar.css'

const T = {
  en: { women:'Women', men:'Men', kids:'Kids', stories:'Kuvaa Stories', gifting:'Holiday Gifting', arrivals:'New Arrivals', sellers:'Best-Sellers', corporate:'Corporate', y2k:'Y2K', denim:'Heritage Denim', oversize:'Oversize T-Shirt', branded:'Branded Clothes', announce:'Get early access on launches and offers.', signUp:'Sign Up For Texts →' },
  sw: { women:'Wanawake', men:'Wanaume', kids:'Watoto', stories:'Hadithi za Kuvaa', gifting:'Zawadi za Likizo', arrivals:'Mpya', sellers:'Inayouzwa Zaidi', corporate:'Kampuni', y2k:'Y2K', denim:'Denim ya Urithi', oversize:'T-Shirt Kubwa', branded:'Nguo za Brand', announce:'Pata ufikiaji wa mapema wa uzinduzi na orodha.', signUp:'Jisajili kwa Maandishi →' }
}

export default function Navbar() {
  const { itemCount } = useCart()
  const [lang, setLang] = useState('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const t = T[lang]

  return (
    <>
      {/* Announcement bar */}
      <div className="announcement-bar">
        <span>{t.announce} <span className="ann-link" onClick={() => navigate('/shop')}>{t.signUp}</span></span>
        <div className="ann-right">
          <span className="ann-flag">🇺🇸</span>
          <span className="ann-currency">USD</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/shop/women" className="nav-link">{t.women}</Link>
          <Link to="/shop/men" className="nav-link active">{t.men}</Link>
          <Link to="/shop/kids" className="nav-link">{t.kids}</Link>
          <Link to="/stories" className="nav-link">{t.stories}</Link>
        </div>

        <Link to="/" className="nav-logo">Kuvaa</Link>

        <div className="nav-right">
          <div className="lang-toggle">
            <button className={`lang-btn${lang==='en'?' active':''}`} onClick={()=>setLang('en')}>EN</button>
            <button className={`lang-btn${lang==='sw'?' active':''}`} onClick={()=>setLang('sw')}>SW</button>
          </div>
          <button className="nav-icon" onClick={()=>navigate('/shop')} aria-label="Search"><Search size={18}/></button>
          <button className="nav-icon" aria-label="Account"><User size={18}/></button>
          <button className="nav-icon cart-btn" onClick={()=>navigate('/cart')} aria-label="Cart">
            <ShoppingBag size={18}/>
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </button>
          <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={20}/>:<Menu size={20}/>}</button>
        </div>
      </nav>

      {/* Secondary nav */}
      <div className="nav-secondary">
        <Link to="/shop" className="nav-sec-link">{t.gifting}</Link>
        <Link to="/shop" className="nav-sec-link">{t.arrivals}</Link>
        <Link to="/shop" className="nav-sec-link">{t.sellers}</Link>
        <Link to="/shop" className="nav-sec-link">{t.corporate}</Link>
        <Link to="/shop" className="nav-sec-link">{t.y2k}</Link>
        <Link to="/shop" className="nav-sec-link">{t.denim}</Link>
        <Link to="/shop" className="nav-sec-link">{t.oversize}</Link>
        <Link to="/shop" className="nav-sec-link">{t.branded}</Link>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/shop/women" className="mobile-link" onClick={()=>setMenuOpen(false)}>{t.women}</Link>
          <Link to="/shop/men" className="mobile-link" onClick={()=>setMenuOpen(false)}>{t.men}</Link>
          <Link to="/shop/kids" className="mobile-link" onClick={()=>setMenuOpen(false)}>{t.kids}</Link>
          <Link to="/stories" className="mobile-link" onClick={()=>setMenuOpen(false)}>{t.stories}</Link>
          <div className="lang-toggle" style={{marginTop:24}}>
            <button className={`lang-btn${lang==='en'?' active':''}`} onClick={()=>setLang('en')}>EN</button>
            <button className={`lang-btn${lang==='sw'?' active':''}`} onClick={()=>setLang('sw')}>SW</button>
          </div>
        </div>
      )}
    </>
  )
}
