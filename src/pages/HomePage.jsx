import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './HomePage.css'

// Star rating badge
const RatingBadge = () => (
  <span className="rating-badge">★ 4.95</span>
)

// Product card for homepage grids
function HomeProductCard({ product, index }) {
  const navigate = useNavigate()
  const img = product?.images?.[0] || `https://images.unsplash.com/photo-${['1558618666-fcd25c85cd64','1509631179647-0177331693ae','1487222477894-8943e31ef7b2','1551028719-00167b16eac5','1496747488-d8defce49f14'][index % 5]}?w=400&q=80`
  return (
    <div className="home-product-card" onClick={() => product && navigate(`/product/${product.id}`)}>
      <div className="home-product-img-wrap">
        <RatingBadge />
        <img src={img} alt={product?.name || 'Product'} />
      </div>
      <p className="home-product-cat">{product?.category || 'PRODUCT CATEGORY'}</p>
      <h4 className="home-product-name">{product?.name || 'Product Name'}</h4>
      <p className="home-product-price">{product ? `KES ${product.price?.toLocaleString()}` : 'KES XXX'}</p>
    </div>
  )
}

export default function HomePage() {
  const [womenProducts, setWomenProducts] = useState([])
  const [menProducts, setMenProducts] = useState([])
  const [kidsProducts, setKidsProducts] = useState([])
  const [videoSlide, setVideoSlide] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.from('products').select('*').eq('category','Women').eq('is_active',true).limit(5).then(({data}) => setWomenProducts(data||[]))
    supabase.from('products').select('*').eq('category','Men').eq('is_active',true).limit(4).then(({data}) => setMenProducts(data||[]))
    supabase.from('products').select('*').eq('category','Kids').eq('is_active',true).limit(3).then(({data}) => setKidsProducts(data||[]))
  }, [])

  const categories = [
    { label: 'Holiday Gifting', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&q=80' },
    { label: 'New Arrivals', img: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=300&q=80' },
    { label: 'Best Seller', img: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=300&q=80' },
    { label: 'Corporate', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80' },
    { label: 'Heritage Denim', img: 'https://images.unsplash.com/photo-1496747488-d8defce49f14?w=300&q=80' },
    { label: 'Y2K', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80' },
  ]

  const videos = [
    { title: 'Beautiful dress shown by top fashion models', desc: 'Vel non nibh vestibulum massa ullamcorper. Bibendum ultrices venenatis, id id sed mass commodo eros duis ut cras neque.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80' },
    { title: 'Why is makeup important for your confidence?', desc: 'Vel non nibh vestibulum massa ullamcorper. Bibendum ultrices venenatis, id id sed mass commodo eros duis ut cras neque.', img: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=700&q=80' },
    { title: 'Street style that defines the season', desc: 'Vel non nibh vestibulum massa ullamcorper. Bibendum ultrices venenatis, id id sed mass commodo eros duis ut cras neque.', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=80' },
  ]

  const shopItNow = [
    { name: 'Grey Shirt', price: 'KES 3,500', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80' },
    { name: 'Black Top Coat', price: 'KES 3,500', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&q=80' },
    { name: 'Check Jumpsuit', price: 'KES 3,500', img: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=300&q=80' },
    { name: 'Choco Leather Bag', price: 'KES 3,500', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80' },
    { name: 'Florish Onepiece', price: 'KES 3,500', img: 'https://images.unsplash.com/photo-1496747488-d8defce49f14?w=300&q=80' },
  ]

  // Placeholder arrays for empty state
  const womenPlaceholders = Array(5).fill(null)
  const menPlaceholders = Array(4).fill(null)
  const kidsPlaceholders = Array(3).fill(null)

  return (
    <div className="home-page">
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero">
        <img className="hero-img" src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80" alt="Kuvaa hero" />
        <div className="hero-gradient" />
        <div className="hero-content">
          <h1 className="hero-title">THE ESSENCE<br />OF TRUE SOPHISTICATION</h1>
          <p className="hero-sub">Each creation tells a story of elegance, for those who understand the finest details.</p>
          <Link to="/shop" className="hero-discover">Discover</Link>
        </div>
      </section>

      {/* ── SHOP BY CATEGORY ── */}
      <section className="shop-by-cat">
        <h2 className="sbc-title">Shop by Category</h2>
        <div className="sbc-row">
          {categories.map((cat) => (
            <Link key={cat.label} to={`/shop`} className="sbc-item">
              <div className="sbc-img-wrap">
                <img src={cat.img} alt={cat.label} />
              </div>
              <span className="sbc-label">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── STYLE GRID ── */}
      <section className="style-grid">
        <div className="style-grid-left">
          <Link to="/shop/women" className="style-card tall">
            <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80" alt="Formal Woman" />
            <div className="style-card-overlay" />
            <span className="style-card-label">FORMAL WOMAN</span>
          </Link>
          <Link to="/shop/men" className="style-card">
            <img src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&q=80" alt="Formal Men" />
            <div className="style-card-overlay" />
            <span className="style-card-label">FORMAL MEN</span>
          </Link>
        </div>
        <div className="style-grid-right">
          <Link to="/shop" className="style-card tall-right">
            <img src="https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80" alt="Casual Style" />
            <div className="style-card-overlay" />
            <span className="style-card-label">CASUAL STYLE</span>
          </Link>
        </div>
      </section>

      {/* ── BEST DRESS FOR BEST WOMAN ── */}
      <section className="product-section">
        <h2 className="ps-title">THE BEST DRESS FOR THE BEST WOMAN</h2>
        <div className="ps-grid five">
          {(womenProducts.length > 0 ? womenProducts : womenPlaceholders).map((p, i) => (
            <HomeProductCard key={i} product={p} index={i} />
          ))}
        </div>
        <Link to="/shop/women" className="see-more-btn">SEE MORE →</Link>
      </section>

      {/* ── BEST OUTFIT FOR HAPPINESS ── */}
      <section className="product-section">
        <h2 className="ps-title">BEST OUTFIT FOR YOUR HAPPINESS</h2>
        <div className="ps-grid four">
          {(menProducts.length > 0 ? menProducts : menPlaceholders).map((p, i) => (
            <HomeProductCard key={i} product={p} index={i} />
          ))}
        </div>
        <Link to="/shop/men" className="see-more-btn">SEE MORE →</Link>
      </section>

      {/* ── SMALL IN SIZE BIG IN STYLE ── */}
      <section className="product-section">
        <h2 className="ps-title">SMALL IN SIZE, BIG IN STYLE</h2>
        <div className="ps-grid three">
          {(kidsProducts.length > 0 ? kidsProducts : kidsPlaceholders).map((p, i) => (
            <HomeProductCard key={i} product={p} index={i} />
          ))}
        </div>
        <Link to="/shop/kids" className="see-more-btn">SEE MORE →</Link>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="trust-section">
        <div className="trust-grid">
          <div className="trust-card tall-trust">
            <div className="trust-icon">👍</div>
            <h4>100% Satisfaction Guaranteed</h4>
            <p>We stand behind every product we sell. Your satisfaction is our top priority, no questions asked.</p>
          </div>
          <div className="trust-right">
            <div className="trust-card">
              <div className="trust-icon">📞</div>
              <h4>24/7 Online Service</h4>
              <p>Our support team is always available to help you with any questions or concerns you may have.</p>
            </div>
            <div className="trust-card">
              <div className="trust-icon">🚀</div>
              <h4>Fast Delivery</h4>
              <p>Get your orders delivered quickly and safely to your doorstep anywhere in Kenya.</p>
            </div>
          </div>
          <div className="trust-card tall-trust">
            <div className="trust-icon">🔒</div>
            <h4>Payment With Secure System</h4>
            <p>Your payment information is always protected with our industry-leading security system.</p>
          </div>
        </div>
      </section>

      {/* ── TOP VIDEOS ── */}
      <section className="videos-section">
        <h2 className="videos-title">TOP<br />VIDEOS</h2>
        <div className="videos-slider">
          <button className="vid-arrow left" onClick={() => setVideoSlide(s => Math.max(0, s-1))}>←</button>
          <div className="videos-track">
            {videos.slice(videoSlide, videoSlide + 2).map((v, i) => (
              <div key={i} className="video-card">
                <div className="video-thumb">
                  <img src={v.img} alt={v.title} />
                  <div className="play-btn">▶</div>
                </div>
                <h3 className="video-title">{v.title}</h3>
                <p className="video-desc">{v.desc}</p>
              </div>
            ))}
          </div>
          <button className="vid-arrow right" onClick={() => setVideoSlide(s => Math.min(videos.length-2, s+1))}>→</button>
        </div>
        <div className="vid-dots">
          {videos.slice(0, videos.length-1).map((_,i) => (
            <button key={i} className={`vid-dot${videoSlide===i?' active':''}`} onClick={() => setVideoSlide(i)} />
          ))}
        </div>
      </section>

      {/* ── CURATED COLLECTIONS ── */}
      <section className="curated-section">
        <p className="curated-eyebrow">Urban Explorer & Adventure Seeker</p>
        <h2 className="curated-title">Explore our carefully<br />curated collections</h2>
        <div className="curated-body">
          <p className="curated-desc">Explore our collections, embrace quality craftsmanship, and make a statement with Kuvaa. Your perfect piece is just a click away.</p>
          <div className="curated-img-wrap">
            <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80" alt="Curated bag" />
          </div>
          <div className="curated-arrows">
            <button className="curated-arrow">←</button>
            <button className="curated-arrow">→</button>
          </div>
        </div>
      </section>

      {/* ── TRENDING NOW ── */}
      <section className="trending-section">
        <p className="trending-label">TRENDING NOW</p>
        <div className="trending-img-wrap">
          <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&q=80" alt="Trending" />
          <div className="trending-overlay" />
          <div className="trending-content">
            <p className="trending-cat">Wrist Watch</p>
            <h2 className="trending-name">OCEANIC<br />SYMPHONY</h2>
            <Link to="/shop" className="trending-shop-btn">Shop</Link>
          </div>
        </div>
      </section>

      {/* ── CELESTIAL AURORA ── */}
      <section className="aurora-section">
        <div className="aurora-img-wrap">
          <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80" alt="Aurora" />
        </div>
        <h2 className="aurora-title">CELESTIAL AURORA EARRINGS</h2>
        <p className="aurora-desc">Capture the beauty of the northern lights with these sapphire and diamond earrings, inspired by the celestial display.</p>
        <Link to="/shop" className="aurora-btn">Shop Now</Link>
      </section>

      {/* ── SHOP IT NOW ── */}
      <section className="shop-it-now">
        <div className="sin-header">
          <h2 className="sin-title">SHOP IT NOW</h2>
          <Link to="/shop" className="sin-view-all">VIEW ALL PRODUCTS</Link>
        </div>
        <div className="sin-row">
          {shopItNow.map((item, i) => (
            <Link key={i} to="/shop" className="sin-item">
              <div className="sin-img-wrap">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="sin-info">
                <span className="sin-name">{item.name}</span>
                <span className="sin-price">{item.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
