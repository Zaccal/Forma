import type { Database } from '@Forma/db'
import { ENV } from '@Forma/db/env'
import { i18n, locales } from '@better-auth/i18n'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { emailOTP } from 'better-auth/plugins/email-otp'
import { resend } from '../lib/resend'

const IS_PROD = ENV.NODE_ENV === 'production'

export type AuthConfig = {
  BETTER_AUTH_URL: string
  BETTER_AUTH_SECRET: string
  CORS_ORIGIN: string
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  RESEND_API_KEY: string
  RESEND_FROM_EMAIL: string
}

export function createAuth(
  env: AuthConfig,
  database: Database,
  desktopOrigins: readonly string[] = [],
) {
  const sendAuthEmail = resend(env)

  return betterAuth({
    database: prismaAdapter(database, {
      provider: 'postgresql',
      transaction: true,
    }),
    trustedOrigins: [env.CORS_ORIGIN, ...desktopOrigins],
    emailAndPassword: {
      enabled: true,
      autoSignIn: false,
      resetPasswordTokenExpiresIn: 60 * 60,
      revokeSessionsOnPasswordReset: true,
      sendResetPassword: async ({ user, url }) => {
        void sendAuthEmail(
          user.email,
          'Сброс пароля Forma',
          `Чтобы задать новый пароль, перейдите по ссылке:\n\n${url}\n\nСсылка действительна 1 час и может быть использована только один раз.\n\nЕсли вы не запрашивали сброс пароля, просто проигнорируйте это письмо.`,
        ).catch(error => {
          console.error('Password reset email delivery failed', error)
        })
      },
      requireEmailVerification: true,
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
    },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      },
    },
    advanced: {
      defaultCookieAttributes: {
        sameSite: IS_PROD ? 'none' : 'Lax',
        secure: IS_PROD,
        httpOnly: IS_PROD,
      },
    },
    plugins: [
      emailOTP({
        otpLength: 6,
        expiresIn: 10 * 60,
        sendVerificationOnSignUp: true,
        overrideDefaultEmailVerification: true,
        sendVerificationOTP: async ({ email, otp, type }) => {
          const subject =
            type === 'email-verification' ? 'Verify your Forma account' : 'Your Forma code'
          const text = `Your verification code is ${otp}. It expires in 10 minutes.`
          await sendAuthEmail(email, subject, text)
        },
      }),
      i18n({
        translations: { ru: locales.ru },
        defaultLocale: 'ru',
      }),
    ],
  })
}

export type Session = ReturnType<typeof createAuth>['$Infer']['Session']
