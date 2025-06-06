import Link from "next/link";
import {getCurrentUser} from "@/infraestructure/features/auth/session";
import {redirect} from "next/navigation";

export default async function Home() {
  const currentUser = await getCurrentUser();
  if (currentUser) redirect("/dashboard")


  return (
    <div className="relative min-h-screen font-[family-name:var(--font-geist-sans)]">

      <div
        className="absolute inset-0 bg-[url('https://plus.unsplash.com/premium_photo-1661763036649-2c4c70e8a97b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-30 z-0"
        aria-hidden="true"
      />

      <div
        className="relative z-10 grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 backdrop-blur-sm">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center sm:text-left">
          <header>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-300">
              Bienvenido al Servicio de Préstamos
            </h1>
            <p className="text-gray-200">
              Gestiona libros y préstamos de forma fácil y rápida.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition"
            >
              Ya tengo cuenta
            </Link>
            <Link
              href="/register"
              className="bg-green-600 text-white px-6 py-3 rounded-lg text-center hover:bg-green-700 transition"
            >
              Crear cuenta
            </Link>
          </div>
        </main>

        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Servicio de Préstamos
        </footer>
      </div>
    </div>
  );
}
