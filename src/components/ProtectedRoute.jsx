import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'Montserrat,sans-serif', fontSize:'13px', color:'#888' }}>Loading...</div>
  if (!user) return <Navigate to="/admin/login" replace />
  return children
}
