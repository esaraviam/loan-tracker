'use client'

import {login} from '@/lib/auth/actions'
import {useActionState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const [state, formAction] = useActionState(login, null)

  return (
    <div className="flex h-dvh items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4 max-w-sm mx-auto mt-10">
            <Input name="email" type="email" placeholder="enter your email" required className="w-full p-2 mb-2"/>
            <Input name="password" type="password" placeholder="Password" required className="w-full p-2"/>
            <div className="flex items-center justify-between">
              <Button type="submit" variant="outline">Login </Button>
              <Link href="/register" className="">Registrese</Link>

            </div>


            {state?.error && (
              <div className="bg-neutral-400 border-l-8 border-neutral-700 text-neutral-50 p-2" role="alert">
                <p>{state.error}</p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
