'use server'

import { prisma } from '@/infraestructure/database/prisma'
import {hashPassword, verifyPassword} from './hash'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export async function login(_prevState: never, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return { error: 'credenciales incorrectas' }

  const valid = await verifyPassword(password, user.passwordHash)
  if (!valid) {
    return { error: 'credenciales incorrectas' }
  }

  (await cookies()).set('userId', user.id, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })

  redirect('/dashboard')
}

export async function register(_prevState: never, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const passwordConfirmation = formData.get('passwordConfirmation') as string

  const user = await prisma.user.findUnique({ where: { email } })
  if (user) return { error: 'ese correo ya esta registrado' }

  if(password !== passwordConfirmation) return {error: 'las password no coinciden'}

  await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      email: email,
      passwordHash: await hashPassword(password),
      updatedAt: new Date(),
    },
  })



  redirect('/')

}

export async function logout() {
  (await cookies()).delete('userId')
  redirect('/')
}
