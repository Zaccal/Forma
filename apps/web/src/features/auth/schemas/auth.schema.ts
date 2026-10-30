import { z } from 'zod/mini'

export const loginSchema = z.object({
  email: z
    .string()
    .check(z.trim())
    .check(z.minLength(1, 'Введите email'))
    .check(z.email('Введите корректный адрес электронной почты')),

  password: z.string().check(z.trim()).check(z.minLength(1, 'Введите пароль')),

  rememberMe: z.boolean(),
})

export type LoginSchema = z.infer<typeof loginSchema>
