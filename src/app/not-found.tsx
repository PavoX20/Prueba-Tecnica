import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function NotFound() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {

    redirect('/')
  } else {

    redirect('/login')
  }
}