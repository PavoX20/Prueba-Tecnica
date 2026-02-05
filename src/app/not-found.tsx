import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function NotFound() {
  const supabase = await createClient()

  // Verificamos si hay sesión activa en el servidor
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    // Si está logueado -> Dashboard
    redirect('/')
  } else {
    // Si NO está logueado -> Login
    redirect('/login')
  }
}