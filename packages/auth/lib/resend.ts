import { ENV } from '@Forma/db/env'
import type { AuthConfig } from '../src'
import { Resend } from 'resend'

export function resend(env: AuthConfig) {
  const IS_PROD = ENV.NODE_ENV === 'production'

  if (IS_PROD && env.RESEND_FROM_EMAIL.includes('@resend.dev')) {
    throw new Error('Production email must use a verified sender domain')
  }

  const resend = new Resend(env.RESEND_API_KEY)

  return async function (to: string, subject: string, text: string) {
    const { data, error } = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to,
      subject,
      text,
    })

    if (error) {
      throw new Error(`Failed to send ${subject} email`)
    }

    return data
  }
}
