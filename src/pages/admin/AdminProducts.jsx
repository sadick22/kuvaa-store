import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import AdminLayout from './AdminLayout'
import toast from 'react-hot-toast'

const EMPTY = { name:'', category:'Women', price:'', original_price:'', description:'', sizes:[], images:[], is_featured:false, is_new:true, is_active:true, discount_percent:0, stock:0 }
const ALL_SIZES = ['XS','S','M','L','XL','XXL','One Size']
const CATEGORIES = ['Women','Men','Kids']

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => { fetchProducts() }, [])

  async function fetchProducts() {
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending:false })
    setProducts(data||[])
    setLoading(false)
  }

  const openNew = () => { setForm(EMPTY); setEditing(null); setImageUrl(''); setModalOpen(true) }
  const openEdit = (p) => { setForm({...p, sizes:p.sizes||[], images:p.images||[]}); setEditing(p.id); setImageUrl(''); setModalOpen(true) }

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type==='checkbox' ? checked : value }))
  }

  const toggleSize = (s) => setForm(f => ({ ...f, sizes: f.sizes.includes(s) ? f.sizes.filter(x=>x!==s) : [...f.sizes, s] }))

  const addImage = () => {
    if (imageUrl.trim()) { setForm(f => ({ ...f, images: [...f.images, imageUrl.trim()] })); setImageUrl('') }
  }
  const removeImage = (i) => setForm(f => ({ ...f, images: f.images.filter((_,idx)=>idx!==i) }))

  const handleSave = async () => {
    if (!form.name || !form.price) { toast.error('Name and price are required'); return }
    setSaving(true)
    const payload = { ...form, price: parseFloat(form.price), original_price: form.original_price ? parseFloat(form.original_price) : null, stock: parseInt(form.stock)||0, discount_percent: parseInt(form.discount_percent)||0 }
    const { error } = editing
      ? await supabase.from('products').update(payload).eq('id', editing)
      : await supabase.from('products').insert(payload)
    if (error) { toast.error('Failed to save product') } else { toast.success(editing ? 'Product updated!' : 'Product added!'); setModalOpen(false); fetchProducts() }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    await supabase.from('products').delete().eq('id', id)
    toast.success('Product deleted')
    fetchProducts()
  }

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-sub">{products.length} total products</p>
        </div>
        <button className="admin-btn-primary" onClick={openNew}><Plus size={16}/> Add Product</button>
      </div>

      {loading ? <div className="admin-loading">Loading...</div> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td><img src={p.images?.[0]||'https://via.placeholder.com/60x80'} alt={p.name} style={{width:48,height:64,objectFit:'cover',borderRadius:2}}/></td>
                  <td><strong>{p.name}</strong>{p.is_new&&<span className="badge status-new" style={{marginLeft:8}}>New</span>}</td>
                  <td>{p.category}</td>
                  <td>KES {p.price?.toLocaleString()}</td>
                  <td>{p.stock}</td>
                  <td><span className={`badge ${p.is_active?'status-active':'status-inactive'}`}>{p.is_active?'Active':'Inactive'}</span></td>
                  <td>
                    <div style={{display:'flex',gap:8}}>
                      <button className="icon-btn" onClick={()=>openEdit(p)}><Pencil size={15}/></button>
                      <button className="icon-btn danger" onClick={()=>handleDelete(p.id)}><Trash2 size={15}/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length===0 && <tr><td colSpan={7} className="table-empty">No products yet. Add your first product!</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {modalOpen && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setModalOpen(false)}>
          <div className="admin-modal">
            <div className="modal-header">
              <h3>{editing?'Edit Product':'Add New Product'}</h3>
              <button className="modal-close" onClick={()=>setModalOpen(false)}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="admin-field">
                  <label>Product Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Classic Denim Jacket" />
                </div>
                <div className="admin-field">
                  <label>Category *</label>
                  <select name="category" value={form.category} onChange={handleChange}>
                    {CATEGORIES.map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="admin-field">
                  <label>Price (KES) *</label>
                  <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="2500" />
                </div>
                <div className="admin-field">
                  <label>Original Price (KES)</label>
                  <input name="original_price" type="number" value={form.original_price||''} onChange={handleChange} placeholder="3000" />
                </div>
              </div>
              <div className="form-row">
                <div className="admin-field">
                  <label>Stock Quantity</label>
                  <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="50" />
                </div>
                <div className="admin-field">
                  <label>Discount %</label>
                  <input name="discount_percent" type="number" value={form.discount_percent} onChange={handleChange} placeholder="0" />
                </div>
              </div>
              <div className="admin-field">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the product..." rows={3} />
              </div>

              {/* Sizes */}
              <div className="admin-field">
                <label>Available Sizes</label>
                <div className="size-picker">
                  {ALL_SIZES.map(s => (
                    <button key={s} type="button" className={`size-pick-btn${form.sizes.includes(s)?' selected':''}`} onClick={()=>toggleSize(s)}>{s}</button>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div className="admin-field">
                <label>Product Images (URLs)</label>
                <div className="image-input-row">
                  <input value={imageUrl} onChange={e=>setImageUrl(e.target.value)} placeholder="https://..." onKeyDown={e=>e.key==='Enter'&&addImage()} />
                  <button type="button" className="admin-btn-sm" onClick={addImage}>Add</button>
                </div>
                {form.images.length > 0 && (
                  <div className="image-previews">
                    {form.images.map((img,i) => (
                      <div key={i} className="image-preview">
                        <img src={img} alt="" />
                        <button onClick={()=>removeImage(i)}><X size={12}/></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="toggle-row">
                <label className="toggle-label"><input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange}/> Active (visible in shop)</label>
                <label className="toggle-label"><input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange}/> Featured on homepage</label>
                <label className="toggle-label"><input type="checkbox" name="is_new" checked={form.is_new} onChange={handleChange}/> Mark as New</label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="admin-btn-secondary" onClick={()=>setModalOpen(false)}>Cancel</button>
              <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>{saving?'Saving...':editing?'Update Product':'Add Product'}</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
