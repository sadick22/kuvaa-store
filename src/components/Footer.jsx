import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top container">
        <div className="footer-brand">
          <div className="footer-logo">Kuvaa</div>
          <p className="footer-tagline">The Essence of True Sophistication</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/kuvaashop_ke" target="_blank" rel="noreferrer" className="social-btn">Instagram</a>
            <a href="https://www.tiktok.com/@kuvaa.ke" target="_blank" rel="noreferrer" className="social-btn">TikTok</a>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Shop</h4>
            <Link to="/shop/women">Women</Link>
            <Link to="/shop/men">Men</Link>
            <Link to="/shop/kids">Kids</Link>
            <Link to="/shop">New Arrivals</Link>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <Link to="/shipping">Shipping & Returns</Link>
            <Link to="/sizing">Size Guide</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About Kuvaa</Link>
            <Link to="/stories">Kuvaa Stories</Link>
            <Link to="/sustainability">Sustainability</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© 2025 Kuvaa. All rights reserved.</span>
        <span>Made with love in Kenya 🇰🇪</span>
      </div>
    </footer>
  )
}
