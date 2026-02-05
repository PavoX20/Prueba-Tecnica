'use client'

import { login, signup } from './actions'
import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    try {
      if (isRegistering) {
        // --- LÓGICA DE REGISTRO (SIN ALERTA VISIBLE SI FALLA) ---
        if (password !== confirmPassword) {
          toast.error('Las contraseñas no coinciden')
          setLoading(false)
          return
        }
        
        const result = await signup(formData)
        // Mantenemos comentado el toast aquí para que NO salga la tarjeta roja al registrar
        // if (result?.error) toast.error(result.error) 
        
      } else {
        // --- LÓGICA DE LOGIN (CON ALERTA VISIBLE) ---
        const result = await login(formData)
        
        // AQUÍ SÍ MOSTRAMOS EL ERROR (Usuario no existe / Contraseña mal)
        if (result?.error) {
          toast.error(result.error) 
        }
      }
    } catch (err) {
      toast.error('Ocurrió un error inesperado')
    } finally {
      setLoading(false) 
    }
  }

  // Estilos del tema Azul
  const inputClass = "block w-full rounded-lg border-slate-300 py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm sm:leading-6 border bg-slate-50 focus:bg-white outline-none transition-all"

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#dee8f1] p-4">
      <div className="w-full max-w-sm space-y-8 rounded-xl bg-white p-8 shadow-xl shadow-blue-900/10 border border-blue-100">

        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-blue-900">
            Sumak Prueba Técnica
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {isRegistering ? 'Crea tu cuenta nueva' : 'Bienvenido'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={inputClass}
                placeholder="usuario@sumak.tech"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isRegistering ? "new-password" : "current-password"}
                required
                className={inputClass}
                placeholder="Contraseña"
              />
            </div>

            {/* Confirmar contraseña solo en registro */}
            {isRegistering && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label htmlFor="confirmPassword" className="sr-only">Confirmar Contraseña</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={inputClass}
                  placeholder="Confirmar Contraseña"
                />
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isRegistering ? 'Confirmar Registro' : 'Iniciar Sesión'}
            </button>
          </div>

          {/* Links de texto para cambiar modo */}
          <div className="text-center text-sm mt-4">
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering)
                setLoading(false)
              }}
              className="text-slate-600 hover:text-blue-700 transition-colors"
            >
              {isRegistering ? (
                <span>¿Ya tienes cuenta? <span className="text-blue-600 underline font-bold decoration-2 underline-offset-2">Inicia sesión</span></span>
              ) : (
                <span>¿No tienes cuenta? <span className="text-blue-600 font-bold decoration-2">haga click para registrarse</span></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}