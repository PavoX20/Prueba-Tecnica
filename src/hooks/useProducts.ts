import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Product, ProductInput } from '@/types'
import { toast } from 'sonner'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  // Cargar productos
  const fetchProducts = useCallback(async () => {
    // Sin loading general para no parpadear toda la pantalla al recargar,
    // solo al inicio si quisieras.
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Error al cargar productos')
    } else {
      setProducts(data || [])
    }
  }, [supabase])

  // Crear o Actualizar
  const upsertProduct = async (
    product: ProductInput,
    id?: string
  ): Promise<boolean> => {
    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error('No usuario')

      let error
      if (id) {
        // Actualizar
        const { error: updateError } = await supabase
          .from('products')
          .update(product)
          .eq('id', id)
        error = updateError
      } else {
        // Crear
        const { error: insertError } = await supabase
          .from('products')
          .insert([{ ...product, user_id: user.id }])
        error = insertError
      }

      if (error) throw error

      toast.success(id ? 'Producto actualizado' : 'Producto creado')
      await fetchProducts() // Recargamos la lista para que salga el nuevo arriba
      return true
    } catch (e) {
      toast.error('Error al guardar el producto')
      return false
    } finally {
      setLoading(false)
    }
  }

  // Eliminar
  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
      toast.error('Error al eliminar')
    } else {
      toast.success('Producto eliminado')
      // Actualización optimista o recarga
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  // Cargar al montar
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return {
    products,
    loading,
    fetchProducts,
    upsertProduct,
    deleteProduct,
  }
}