'use client'

import { login, signup } from './actions'
import { useState } from 'react'
import { toast } from 'sonner'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  const handleAction = async (formData: FormData, action: typeof login) => {
    setLoading(true)
    try {
      const result = await action(formData)
      if (result?.error) {
        toast.error(result.error)
      }
    } catch (e) {
      toast.error('Ocurrió un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm space-y-8 rounded-xl bg-white p-8 shadow-xl border border-slate-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Sumak Product Manager
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <form className="mt-8 space-y-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-lg border-slate-200 py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent sm:text-sm sm:leading-6 border"
                placeholder="usuario@sumak.tech"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-lg border-slate-200 py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent sm:text-sm sm:leading-6 border"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              formAction={(data) => handleAction(data, login)}
              disabled={loading}
              className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Procesando...' : 'Iniciar Sesión'}
            </button>
            <button
              formAction={(data) => handleAction(data, signup)}
              disabled={loading}
              className="flex w-full justify-center rounded-lg bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-70 transition-all"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}