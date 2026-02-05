# Sumak Product Manager - Prueba Técnica

Sistema de gestión de productos (CRUD) desarrollado con **Next.js** y **Supabase**. Enfocado en la seguridad, la experiencia de usuario y una arquitectura limpia.

## Tecnologías

* **Core:** Next.js 14 (App Router), React, TypeScript.
* **Backend:** Supabase (PostgreSQL, Auth, Row Level Security).
* **Estilos:** Tailwind CSS (Diseño responsivo y custom theming).
* **UI/UX:** Sonner (Notificaciones), Lucide React (Iconografía).

## Instalación y Configuración

1.  **Clonar repositorio e instalar dependencias:**
    ```bash
    git clone https://github.com/PavoX20/Prueba-Tecnica
    cd prueba-sumak
    pnpm install
    ```

2.  **Configurar Variables de Entorno:**
    Renombrar `.env.example` a `.env` y añadir las credenciales de Supabase:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=https://udzkebem.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable...
    ```

3.  **Base de Datos:**
    Ejecutar el script SQL proporcionado en el editor de Supabase para crear la tabla `products` y habilitar las políticas de seguridad (RLS).

4.  **Ejecutar:**
    ```bash
    pnpm dev
    ```

## Decisiones de Arquitectura

### 1. Fetching de Datos: Client-Side Rendering (CSR)
Se optó por **CSR** mediante Custom Hooks (`useProducts`) en lugar de Server Components para la vista principal.
* **Justificación:** Al ser un Dashboard administrativo (SPA), se priorizó la **interactividad inmediata**. Esto permite crear, editar y eliminar ítems sin recargas de página (Server Roundtrips).

### 2. Gestión de Estado: `useState`
Se utilizó `useState` local encapsulado en hooks.
* **Justificación:** Se aplicó el principio **KISS (Keep It Simple)**. El estado de la lista y los formularios es local a la vista principal. Implementar *Context API* o *Zustand* habría introducido complejidad.

### 3. Seguridad: Row Level Security (RLS)
Más allá de la protección de rutas en el Frontend, se implementó seguridad a nivel de base de datos.
* **Justificación:** Garantiza que las reglas de negocio sean inmutables. Incluso si el cliente es vulnerado, la base de datos rechaza cualquier operación (DELETE/UPDATE) que no provenga del propietario del registro.

### 4. Testing
* **Estado:** No incluido en esta entrega.
* **Justificación:** Se priorizó la entrega de una funcionalidad completa (Full CRUD), se intentó priorizar la entrega pronta del proyecto. En un entorno productivo, se recomienda añadir tests unitarios para la lógica de los hooks.