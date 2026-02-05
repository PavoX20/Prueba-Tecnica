'use client'

import { useEffect, useState } from 'react'
import { Product, ProductInput } from '@/types'
import { Loader2, Save } from 'lucide-react'

interface Props {
  selectedProduct: Product | null
  onSubmit: (data: ProductInput) => Promise<void>
  isSaving: boolean
}

export function ProductForm({ selectedProduct, onSubmit, isSaving }: Props) {

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '' as string | number, 
  })

  useEffect(() => {
    if (selectedProduct) {
      setForm({
        name: selectedProduct.name,
        description: selectedProduct.description || '',
        price: selectedProduct.price,
      })
    } else {

      setForm({ name: '', description: '', price: '' })
    }
  }, [selectedProduct])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit({
      name: form.name,
      description: form.description,
      price: Number(form.price) || 0, 

    })
  }

  const inputClass = "w-full rounded-lg border-slate-300 border px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 bg-slate-50 focus:bg-white"

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg shadow-blue-900/5 border border-blue-100">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Nombre del Producto
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            placeholder="Ej: Teclado Mecánico RGB"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Descripción
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputClass}
            rows={4}
            placeholder="Detalles técnicos, características, garantía..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Precio
          </label>
          <div className="relative">
            <span className="absolute left-4 top-2.5 text-slate-500 font-medium">$</span>
            <input
              type="number" 
              required
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className={`${inputClass} pl-8`}
              placeholder="0.00"
            />
          </div>
        </div>

        {}
        <button
          type="submit"
          disabled={isSaving}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all mt-8"
        >
          {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save size={18} />}
          {selectedProduct ? 'Actualizar Producto' : 'Guardar Producto'}
        </button>
      </form>
    </div>
  )
}