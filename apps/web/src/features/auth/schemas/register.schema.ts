import { z } from 'zod/mini'

const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/

export const registerSchema = z
  .object({
    email: z
      .string()
      .check(z.trim())
      .check(z.minLength(1, 'Введите email'))
      .check(z.email('Введите корректный адрес электронной почты')),

    password: z
      .string()
      .check(z.trim())
      .check(z.minLength(8, 'Пароль должен быть не менее 8 символов'))
      .check(
        z.regex(
          PASSWORD_REGEX,
          'Пароль должен содержать латинские буквы, цифры и хотя бы один спецсимвол',
        ),
      ),

    confirmPassword: z
      .string()
      .check(z.trim())
      .check(z.minLength(1, 'Пожалуйста, повторите пароль')),

    rememberMe: z.boolean(),
  })
  .check(
    z.refine(data => data.password === data.confirmPassword, {
      error: 'Пароли не совпадают',
      path: ['confirmPassword'],
    }),
  )

export type RegisterSchema = z.infer<typeof registerSchema>
