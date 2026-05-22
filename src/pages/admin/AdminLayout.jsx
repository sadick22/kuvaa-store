import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingBag, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function AdminLayout({ children }) {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => { await signOut(); navigate('/admin/login') }

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/products', icon: Package, label: 'Products' },
    { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
  ]

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-logo">Kuvaa</div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({isActive}) => `sidebar-link${isActive?' active':''}`}>
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="sidebar-logout" onClick={handleSignOut}><LogOut size={16}/> Sign Out</button>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  )
}
