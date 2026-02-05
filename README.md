# Sumak Product Manager - Technical Test

Product management system (CRUD) developed with **Next.js** and **Supabase**. Focused on security, user experience, and clean architecture.

## Try Me

You can explore the live application deployed on Vercel here:

 **[https://prueba-tecnica-six-phi.vercel.app](https://prueba-tecnica-six-phi.vercel.app)**

## Technologies

* **Core:** Next.js 14 (App Router), React, TypeScript.
* **Backend:** Supabase (PostgreSQL, Auth, Row Level Security).
* **Styles:** Tailwind CSS (Responsive design and custom theming).
* **UI/UX:** Sonner (Notifications), Lucide React (Iconography).

## Installation and Setup

1.  **Clone repository and install dependencies:**
    ```bash
    git clone [https://github.com/PavoX20/Prueba-Tecnica](https://github.com/PavoX20/Prueba-Tecnica)
    cd prueba-sumak
    pnpm install
    ```

2.  **Configure Environment Variables:**
    Rename `.env.example` to `.env` and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=[https://udzkebem.supabase.co](https://udzkebem.supabase.co)
    NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable...
    ```

3.  **Database:**
    Run the provided SQL script in the Supabase SQL Editor to create the `products` table and enable Row Level Security (RLS) policies.

4.  **Run:**
    ```bash
    pnpm dev
    ```

## Architectural Decisions

### 1. Data Fetching: Client-Side Rendering (CSR)
**CSR** was chosen using Custom Hooks (`useProducts`) instead of Server Components for the main view.
* **Justification:** Since this is an administrative Dashboard (SPA), **immediate interactivity** was prioritized. This allows creating, editing, and deleting items without page reloads (Server Roundtrips).

### 2. State Management: `useState`
Local `useState` encapsulated in hooks was used.
* **Justification:** The **KISS (Keep It Simple)** principle was applied. The list and form state is local to the main view. Implementing *Context API* or *Zustand* would have introduced unnecessary complexity.

### 3. Security: Row Level Security (RLS)
Beyond frontend route protection, security was implemented at the database level.
* **Justification:** This ensures business rules are immutable. Even if the client is compromised, the database rejects any operation (DELETE/UPDATE) that does not come from the record owner.

### 4. Testing
* **Status:** Not included in this delivery.
* **Justification:** Priority was given to delivering complete functionality (Full CRUD) and ensuring a timely project delivery. In a production environment, adding unit tests for the hooks logic is recommended.