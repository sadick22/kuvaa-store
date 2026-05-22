import { useEffect, useState } from 'react'
import { ShoppingBag, Package, TrendingUp, Clock } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import AdminLayout from './AdminLayout'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders:0, products:0, revenue:0, pending:0 })
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    async function fetchStats() {
      const [{ count: orders }, { count: products }, { data: orderData }] = await Promise.all([
        supabase.from('orders').select('*', { count:'exact', head:true }),
        supabase.from('products').select('*', { count:'exact', head:true }),
        supabase.from('orders').select('*').order('created_at', { ascending:false }).limit(5)
      ])
      const revenue = orderData?.reduce((s,o) => s+(o.total||0), 0) || 0
      const pending = orderData?.filter(o => o.order_status==='processing').length || 0
      setStats({ orders:orders||0, products:products||0, revenue, pending })
      setRecentOrders(orderData||[])
    }
    fetchStats()
  }, [])

  const statCards = [
    { label:'Total Orders', value:stats.orders, icon:ShoppingBag, color:'#0a0a0a' },
    { label:'Total Products', value:stats.products, icon:Package, color:'#8b1a1a' },
    { label:'Revenue (KES)', value:stats.revenue.toLocaleString(), icon:TrendingUp, color:'#1a5276' },
    { label:'Pending Orders', value:stats.pending, icon:Clock, color:'#7d6608' },
  ]

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-sub">Welcome back to Kuvaa Admin</p>
      </div>
      <div className="stats-grid">
        {statCards.map(card => (
          <div key={card.label} className="stat-card">
            <div className="stat-icon" style={{background:card.color}}><card.icon size={20} color="white"/></div>
            <div><p className="stat-label">{card.label}</p><p className="stat-value">{card.value}</p></div>
          </div>
        ))}
      </div>
      <div className="admin-section">
        <h2 className="admin-section-title">Recent Orders</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.customer_name}</td>
                  <td>{order.items?.length||0} item(s)</td>
                  <td>KES {order.total?.toLocaleString()}</td>
                  <td><span className={`badge pay-${order.payment_method}`}>{order.payment_method==='mpesa'?'M-Pesa':'Card'}</span></td>
                  <td><span className={`badge status-${order.order_status}`}>{order.order_status}</span></td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {recentOrders.length===0 && <tr><td colSpan={6} className="table-empty">No orders yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
