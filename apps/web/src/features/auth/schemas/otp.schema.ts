import { z } from 'zod/mini'

const OTP_REGEX = /^\d+$/

export const otpSchema = z.object({
  otp: z
    .string()
    .check(
      z.trim(),
      z.length(6, { error: 'Длина кода должна составлять 6 символов ' }),
      z.regex(OTP_REGEX, 'Код должно содержать только числа'),
    ),

  email: z
    .string()
    .check(z.trim())
    .check(z.minLength(1, 'Введите email'))
    .check(z.email('Введите корректный адрес электронной почты')),
})

export type OtpSchema = z.infer<typeof otpSchema>
