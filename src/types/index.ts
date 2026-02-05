export interface Product {
  id: string
  created_at: string
  name: string
  description: string | null
  price: number
  user_id: string
}

export type ProductInput = Omit<Product, 'id' | 'created_at' | 'user_id'>