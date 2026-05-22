import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top container">
        <div className="footer-brand">
          <div className="footer-logo">KUVAA</div>
          <p className="footer-desc">Vel non nibh vestibulum massa ullamcorper. Bibendum ultrices venenatis, id id sed mass commodo eros duis ut cras neque.</p>
          <div className="footer-socials">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="social-icon-link">f</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-link">t</a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="social-icon-link">p</a>
            <a href="https://www.instagram.com/kuvaashop_ke" target="_blank" rel="noreferrer" className="social-icon-link">ig</a>
            <a href="https://www.tiktok.com/@kuvaa.ke" target="_blank" rel="noreferrer" className="social-icon-link">tt</a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">QUICK LINKS</h4>
          <Link to="/about">About</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/shop">Subscribe</Link>
          <Link to="/terms">Term & Condition</Link>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">CATEGORIES</h4>
          <Link to="/shop/women">Fashion</Link>
          <Link to="/shop">Entertainment</Link>
          <Link to="/shop/women">Beauty</Link>
          <Link to="/shop">Lifestyle</Link>
          <Link to="/shop">Travel</Link>
        </div>
      </div>

      <div className="footer-bottom container">
        <span>© Kuvaa. All rights reserved.</span>
        <span>Made with love in Kenya 🇰🇪</span>
      </div>
    </footer>
  )
}
