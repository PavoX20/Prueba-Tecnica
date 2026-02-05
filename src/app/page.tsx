'use client'

import { useState } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { ProductList } from '@/components/ProductList'
import { ProductForm } from '@/components/ProductForm'
import { Product, ProductInput } from '@/types'
import { Plus, LogOut } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { products, loading, upsertProduct, deleteProduct } = useProducts()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleFormSubmit = async (data: ProductInput) => {
    const success = await upsertProduct(data, selectedProduct?.id)
    if (success) {
      if (!selectedProduct) setSelectedProduct(null)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200/50 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold text-blue-900 flex items-center gap-2">
          Sumak Prueba Técnica
        </h1>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:border-red-200 shadow-sm"
        >
          <LogOut size={16} />
          Cerrar Sesión
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Gestión de Productos</h2>
          
          {/* BOTÓN CORREGIDO: 
             Siempre fondo blanco (bg-white), texto azul (text-blue-600) y borde azul (border-blue-600).
          */}
          <button
            onClick={() => setSelectedProduct(null)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all shadow-sm border-2
              bg-white text-blue-600 border-blue-600 hover:bg-blue-50
              ${
                selectedProduct === null
                ? 'ring-2 ring-blue-300 ring-offset-2 shadow-md' // Estilo extra solo para indicar que está activo, pero manteniendo blanco
                : ''
              }`}
          >
            <Plus size={20} />
            Add New Product
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7">
            <div className="mb-3 flex justify-between items-end px-1">
              <span className="text-sm font-bold text-blue-900/70 uppercase tracking-wider">
                Lista de Productos
              </span>
              <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {products.length} items
              </span>
            </div>
            
            <ProductList
              products={products}
              selectedId={selectedProduct?.id || null}
              onSelect={setSelectedProduct}
              onDelete={deleteProduct}
            />
          </div>

          <div className="lg:col-span-5 sticky top-24">
             <div className="mb-3 px-1">
              <span className="text-sm font-bold text-blue-900/70 uppercase tracking-wider">
                {selectedProduct ? 'Editando Producto' : 'Nuevo Producto'}
              </span>
            </div>
            <ProductForm
              selectedProduct={selectedProduct}
              onSubmit={handleFormSubmit}
              isSaving={loading}
            />
          </div>

        </div>
      </main>
    </div>
  )
}