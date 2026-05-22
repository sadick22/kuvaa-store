import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import './HomePage.css'

export default function HomePage() {
  const [featured, setFeatured] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    supabase.from('products').select('*').eq('is_featured', true).limit(4).then(({ data }) => {
      if (data) setFeatured(data)
    })
  }, [])

  return (
    <div className="home">
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-center">
          <p className="hero-eyebrow">New Collection — 2025</p>
          <h1 className="hero-headline">Join the Waiting<br />List Today</h1>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navigate('/shop/women')}>Shop Women</button>
            <button className="btn-outline" onClick={() => navigate('/shop/men')}>Shop Men</button>
          </div>
        </div>
        <div className="hero-bottom">
          <div className="hero-tagline">
            <span>The Essence</span>
            <span className="italic"> of True Sophistication</span>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories container">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <div className="category-grid">
          {[
            { label: 'Women', slug: 'women', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80' },
            { label: 'Men', slug: 'men', img: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&q=80' },
            { label: 'Kids', slug: 'kids', img: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80' },
          ].map(cat => (
            <Link key={cat.slug} to={`/shop/${cat.slug}`} className="category-card">
              <img src={cat.img} alt={cat.label} />
              <div className="category-overlay">
                <span className="category-label">{cat.label}</span>
                <span className="category-cta">Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="featured container">
          <div className="section-header">
            <h2 className="section-title">Featured Pieces</h2>
            <Link to="/shop" className="section-link">View All →</Link>
          </div>
          <div className="products-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* BRAND STRIP */}
      <section className="brand-strip">
        <div className="brand-strip-inner">
          {['Free Shipping Over KES 5,000', 'Authentic Quality', 'Easy Returns', 'Made for Africa', 'Free Shipping Over KES 5,000', 'Authentic Quality', 'Easy Returns', 'Made for Africa'].map((t, i) => (
            <span key={i} className="strip-item">{t} <span className="strip-dot">·</span></span>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
