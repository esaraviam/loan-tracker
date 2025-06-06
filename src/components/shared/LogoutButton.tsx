'use client'
import {Button} from "@/components/ui/button";
import {logout} from "@/infraestructure/features/auth/actions";

export default function LogoutButton() {
  return (
    <Button onClick={async () => await logout()}>Cerrar Sesión</Button>

  )
}
