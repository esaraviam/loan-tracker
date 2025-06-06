import {ModeToggle} from "@/components/shared/ModeToggle";
import Link from "next/link";
import {getCurrentUser} from "@/infraestructure/features/auth/session";
import LogoutButton from "@/components/shared/LogoutButton";

export default async function Menubar() {
  const user = await getCurrentUser()
  return (
    <nav className="bg-gray-800 sticky top-0 z-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <picture>
                <img className="h-8 w-auto"
                     src="https://www.mobdev.cl/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.7a9e12a2.png&w=96&q=75"
                     alt="Mobdev"/>
              </picture>

            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link href="/dashboard" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white dark:">
                  Dashboard
                </Link>
                <Link href="/loan/create"
                      className="rounded-md px-3 py-2 text-sm font-medium  bg-green-900 text-gray-300 hover:bg-gray-700 hover:text-white">
                  Crear Préstamo
                </Link>

              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ModeToggle/>
            <div className="relative ml-3 ">
                {user?.email}
            </div>
            <LogoutButton/>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="grid place-content-center grid-cols-2  space-y-1 px-2 pt-2 pb-3">
          <Link href="/dashboard" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
            Dashboard
          </Link>
          <Link href="/loan"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            Loans
          </Link>
        </div>
      </div>
    </nav>

  )
}
