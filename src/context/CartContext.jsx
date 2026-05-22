import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kuvaa_cart')) || [] } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('kuvaa_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, size, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === size)
      if (existing) {
        return prev.map(i => i.id === product.id && i.size === size
          ? { ...i, quantity: i.quantity + quantity } : i)
      }
      return [...prev, { ...product, size, quantity }]
    })
  }

  const removeFromCart = (id, size) => setCart(prev => prev.filter(i => !(i.id === id && i.size === size)))

  const updateQuantity = (id, size, quantity) => {
    if (quantity <= 0) return removeFromCart(id, size)
    setCart(prev => prev.map(i => i.id === id && i.size === size ? { ...i, quantity } : i))
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
