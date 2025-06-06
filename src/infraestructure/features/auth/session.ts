import { cookies } from 'next/headers'
import { prisma } from '@/infraestructure/database/prisma'

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId')?.value
  if (!userId) return null

  return await prisma.user.findUnique({ where: { id: userId } })
}
