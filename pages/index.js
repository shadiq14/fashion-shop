import { useState, useEffect } from 'react'
import { ShoppingBag, User, Heart, Package, LogOut, UserCircle, Menu, X } from 'lucide-react'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      if (data.success) {
        setProducts(data.data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-pink-600" />
            <h1 className="text-2xl font-bold text-gray-800">Fashion Store</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Koleksi Terbaru</h2>
        
        {loading ? (
          <p className="text-center py-12">Loading...</p>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Belum ada produk</p>
            <p className="text-sm text-gray-400">Silakan tambahkan produk dari admin dashboard</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <span className="text-xs text-pink-600 font-semibold">{product.category}</span>
                  <h3 className="font-bold text-lg mt-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  <div className="mt-4">
                    <span className="text-xl font-bold text-pink-600">
                      Rp {product.price?.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Stok: {product.stock}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
