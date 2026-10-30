'use server'

import { loginSchema } from '@/features/auth/schemas/auth.schema'

export async function login(formData: FormData) {
  const data = Object.fromEntries(formData)
  const formated = loginSchema.safeParse({
    ...data,
    rememberMe: data.rememberMe === 'true' ? true : false,
  })

  if (!formated.success) {
    throw new Error(
      'Не удалось отправить форму. Пожалуйста, проверьте введенные данные и попробуйте снова',
    )
  }
}
