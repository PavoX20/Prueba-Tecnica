'use client'

import { Product } from '@/types'
import { Edit2, Trash2, Package } from 'lucide-react'

interface Props {
  products: Product[]
  selectedId: string | null
  onSelect: (product: Product) => void
  onDelete: (id: string) => void
}

export function ProductList({
  products,
  selectedId,
  onSelect,
  onDelete,
}: Props) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-white rounded-xl border-2 border-dashed border-blue-100">
        <Package size={48} className="mb-4 text-blue-200" />
        <p className="font-medium">No hay productos aún.</p>
        <p className="text-sm">¡Agrega el primero desde el formulario!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-220px)] pr-2 custom-scrollbar">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => onSelect(product)}
          className={`group relative flex cursor-pointer flex-col justify-between rounded-xl border p-5 transition-all duration-200
            ${
              selectedId === product.id
                ? 'bg-blue-50 border-blue-500 shadow-md ring-1 ring-blue-500' 

                : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm' 

            }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className={`font-bold text-lg ${
                  selectedId === product.id ? 'text-blue-700' : 'text-slate-800'
              }`}>
                {product.name}
              </h4>
              <p className="text-base font-bold text-blue-600 mt-1">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                if(confirm('¿Estás seguro de eliminar este producto?')) onDelete(product.id)
              }}
              className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              title="Eliminar producto"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <p className="mt-3 text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {product.description || <span className="italic text-slate-400">Sin descripción</span>}
          </p>

        </div>
      ))}
    </div>
  )
}