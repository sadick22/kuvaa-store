import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import AdminLayout from './AdminLayout'
import toast from 'react-hot-toast'
import { ChevronDown } from 'lucide-react'

const STATUS_OPTIONS = ['processing','shipped','delivered','cancelled']

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => { fetchOrders() }, [])

  async function fetchOrders() {
    setLoading(true)
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending:false })
    setOrders(data||[])
    setLoading(false)
  }

  const updateStatus = async (id, status) => {
    const { error } = await supabase.from('orders').update({ order_status:status }).eq('id', id)
    if (error) { toast.error('Failed to update') } else { toast.success('Order updated!'); fetchOrders() }
  }

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Orders</h1>
          <p className="admin-page-sub">{orders.length} total orders</p>
        </div>
      </div>

      {loading ? <div className="admin-loading">Loading...</div> : (
        <div className="orders-list">
          {orders.length === 0 && <div className="table-empty" style={{padding:60,textAlign:'center'}}>No orders yet</div>}
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-card-header" onClick={() => setExpanded(expanded===order.id?null:order.id)}>
                <div className="order-card-left">
                  <span className="order-id">#{order.id?.slice(0,8)}</span>
                  <span className="order-name">{order.customer_name}</span>
                  <span className="order-email">{order.customer_email}</span>
                </div>
                <div className="order-card-right">
                  <span className="order-total">KES {order.total?.toLocaleString()}</span>
                  <span className={`badge pay-${order.payment_method}`}>{order.payment_method==='mpesa'?'M-Pesa':'Card'}</span>
                  <select className="status-select" value={order.order_status} onChange={e=>updateStatus(order.id, e.target.value)} onClick={e=>e.stopPropagation()}>
                    {STATUS_OPTIONS.map(s=><option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={16} style={{transform:expanded===order.id?'rotate(180deg)':'none',transition:'0.2s'}}/>
                </div>
              </div>
              {expanded===order.id && (
                <div className="order-card-body">
                  <div className="order-detail-grid">
                    <div><strong>Phone</strong><p>{order.customer_phone}</p></div>
                    <div><strong>Address</strong><p>{order.shipping_address}</p></div>
                    <div><strong>Date</strong><p>{new Date(order.created_at).toLocaleString()}</p></div>
                    <div><strong>Payment Status</strong><p>{order.payment_status}</p></div>
                  </div>
                  <h4 style={{marginBottom:12,fontSize:12,letterSpacing:'0.08em',textTransform:'uppercase'}}>Items</h4>
                  {order.items?.map((item,i) => (
                    <div key={i} className="order-item">
                      <img src={item.images?.[0]||'https://via.placeholder.com/48x64'} alt={item.name} />
                      <div><p><strong>{item.name}</strong></p><p style={{fontSize:12,color:'#666'}}>Size: {item.size} · Qty: {item.quantity}</p></div>
                      <span>KES {(item.price*item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
