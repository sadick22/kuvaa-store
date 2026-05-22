import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import './Admin.css'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) { toast.error('Please fill in all fields'); return }
    setLoading(true)
    const { error } = await signIn(email, password)
    if (error) { toast.error('Invalid credentials') } else { navigate('/admin') }
    setLoading(false)
  }

  return (
    <div className="admin-login">
      <div className="login-card">
        <div className="login-logo">Kuvaa</div>
        <p className="login-subtitle">Admin Dashboard</p>
        <div className="login-form">
          <div className="admin-field">
            <label>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@kuvaa.com" onKeyDown={e=>e.key==='Enter'&&handleLogin()} />
          </div>
          <div className="admin-field">
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==='Enter'&&handleLogin()} />
          </div>
          <button className="login-btn" onClick={handleLogin} disabled={loading}>{loading?'Signing in...':'Sign In'}</button>
        </div>
      </div>
    </div>
  )
}
