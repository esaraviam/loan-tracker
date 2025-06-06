'use client'

import {register} from '@/infraestructure/features/auth/actions'
import {useActionState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export default function RegisterPage() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const [state, formAction] = useActionState(register, null)

  return (
    <div className="flex h-dvh items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Registrate y crea tu cuenta</CardTitle>
          <CardDescription>
            Ingresa tus datos para crear tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
        <form action={formAction} className="max-w-sm mx-auto mt-10 space-y-4">
          <Input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="border p-2 w-full"
          />

          <Input
            name="password"
            type="password"
            required
            placeholder="Contraseña"
            className="border p-2 w-full"
          />

          <Input
            name="passwordConfirmation"
            type="password"
            required
            placeholder="Confirmacion Contraseña"
            className="border p-2 w-full"
          />

          <Button type="submit" className="bg-green-600 text-white px-4 py-2">
            Registrarse
          </Button>

          {state?.error && <p className="text-red-500">{state.error}</p>}
        </form>
        </CardContent>
      </Card>
    </div>
  )
}
