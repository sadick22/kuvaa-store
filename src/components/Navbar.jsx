import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import './Navbar.css'

export default function Navbar() {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState('en')
  const navigate = useNavigate()

  const T = {
    en: { women: 'Women', men: 'Men', kids: 'Kids', stories: 'Kuvaa Stories' },
    sw: { women: 'Wanawake', men: 'Wanaume', kids: 'Watoto', stories: 'Hadithi za Kuvaa' }
  }
  const t = T[lang]

  return (
    <>
      <div className="announcement-bar">
        Free shipping on orders over KES 5,000 &nbsp;·&nbsp; <span onClick={() => navigate('/shop')}>Shop Now →</span>
      </div>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/shop/women" className="nav-link">{t.women}</Link>
          <Link to="/shop/men" className="nav-link">{t.men}</Link>
          <Link to="/shop/kids" className="nav-link">{t.kids}</Link>
          <Link to="/stories" className="nav-link">{t.stories}</Link>
        </div>

        <Link to="/" className="nav-logo">Kuvaa</Link>

        <div className="nav-right">
          <div className="lang-toggle">
            <button className={`lang-btn${lang==='en'?' active':''}`} onClick={()=>setLang('en')}>EN</button>
            <button className={`lang-btn${lang==='sw'?' active':''}`} onClick={()=>setLang('sw')}>SW</button>
          </div>
          <button className="nav-icon" onClick={() => navigate('/shop')} aria-label="Search">
            <Search size={18} />
          </button>
          <button className="nav-icon cart-btn" onClick={() => navigate('/cart')} aria-label="Cart">
            <ShoppingBag size={18} />
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/shop/women" className="mobile-link" onClick={() => setMenuOpen(false)}>{t.women}</Link>
          <Link to="/shop/men" className="mobile-link" onClick={() => setMenuOpen(false)}>{t.men}</Link>
          <Link to="/shop/kids" className="mobile-link" onClick={() => setMenuOpen(false)}>{t.kids}</Link>
          <Link to="/stories" className="mobile-link" onClick={() => setMenuOpen(false)}>{t.stories}</Link>
          <div className="lang-toggle" style={{marginTop:'24px'}}>
            <button className={`lang-btn${lang==='en'?' active':''}`} onClick={()=>setLang('en')}>EN</button>
            <button className={`lang-btn${lang==='sw'?' active':''}`} onClick={()=>setLang('sw')}>SW</button>
          </div>
        </div>
      )}
    </>
  )
}
