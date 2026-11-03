import { z } from 'zod/mini'
import { loginSchema } from './login.schema'
import { registerSchema } from './register.schema'

export const forgotPasswordSchema = z.object({
  email: loginSchema.shape.email,
})

export const resetPasswordSchema = z
  .object({
    password: registerSchema.shape.password.check(
      z.maxLength(128, 'Пароль должен содержать не более 128 символов'),
    ),
    confirmPassword: registerSchema.shape.confirmPassword,
  })
  .check(
    z.refine(data => data.password === data.confirmPassword, {
      error: 'Пароли не совпадают',
      path: ['confirmPassword'],
    }),
  )

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
