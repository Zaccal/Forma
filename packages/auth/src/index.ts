import type { Database } from '@Forma/db'
import { ENV } from '@Forma/db/env'
import { i18n, locales } from '@better-auth/i18n'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

export type AuthConfig = {
  BETTER_AUTH_URL: string
  BETTER_AUTH_SECRET: string
  CORS_ORIGIN: string
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
}

const IS_PROD = ENV.NODE_ENV === 'production'

export function createAuth(
  env: AuthConfig,
  database: Database,
  desktopOrigins: readonly string[] = [],
) {
  return betterAuth({
    database: prismaAdapter(database, {
      provider: 'postgresql',
    }),
    trustedOrigins: [env.CORS_ORIGIN, ...desktopOrigins],
    emailAndPassword: { enabled: true, autoSignIn: true },
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
      i18n({
        translations: { ru: locales.ru },
        defaultLocale: 'ru',
      }),
    ],
  })
}

export type Session = ReturnType<typeof createAuth>['$Infer']['Session']
