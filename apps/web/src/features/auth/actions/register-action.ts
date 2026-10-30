'use server'

import { registerSchema } from '../schemas/register.schema'

export async function register(formData: FormData) {
  const data = Object.fromEntries(formData)
  const formated = registerSchema.safeParse({
    ...data,
    rememberMe: data.rememberMe === 'true' ? true : false,
  })

  if (!formated.success) {
    throw new Error(
      'Не удалось отправить форму. Пожалуйста, проверьте введенные данные и попробуйте снова',
    )
  }

  // const { } = await authClient.signUp.email({
  //
  // })
}
